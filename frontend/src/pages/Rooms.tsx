
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { mockRooms, getUserById } from '@/lib/mock-data';
import { Room, Gender } from '@/types';
import { Search, PlusCircle, Users, Edit, Trash2 } from 'lucide-react';
import AddRoomDialog from '@/domains/residence/components/AddRoomDialog';
import EditRoomDialog from '@/domains/residence/components/EditRoomDialog';
import ConfirmActionDialog from '@/components/ConfirmActionDialog';
import { toast } from '@/hooks/use-toast';

const Rooms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState<Gender | 'all'>('all');
  const [addRoomDialogOpen, setAddRoomDialogOpen] = useState(false);
  const [editRoomDialogOpen, setEditRoomDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  
  // Fetch rooms data
  const { data: rooms, isLoading, refetch } = useQuery({
    queryKey: ['rooms'],
    queryFn: () => mockRooms,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  // Filter rooms based on search term and gender
  const filteredRooms = rooms?.filter((room: Room) => {
    const roomNumber = room.roomNumber || room.number || '';
    const matchesSearch = roomNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = genderFilter === 'all' || room.gender === genderFilter;
    
    return matchesSearch && matchesGender;
  });

  const handleAddRoom = (data: any) => {
    // In a real app, this would make an API call to add the room
    console.log('Adding room:', data);
    toast({
      title: "Room Added",
      description: `Room ${data.roomNumber} has been added successfully.`,
    });
    refetch();
  };

  const handleEditRoom = (id: string, data: any) => {
    // In a real app, this would make an API call to update the room
    console.log('Editing room:', id, data);
    toast({
      title: "Room Updated",
      description: `Room ${data.roomNumber} has been updated successfully.`,
    });
    refetch();
  };

  const handleDeleteRoom = () => {
    // In a real app, this would make an API call to delete the room
    if (selectedRoom) {
      console.log('Deleting room:', selectedRoom.id);
      toast({
        title: "Room Deleted",
        description: `Room ${selectedRoom.roomNumber || selectedRoom.number} has been deleted successfully.`,
      });
      setDeleteConfirmOpen(false);
      refetch();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Rooms</h1>
        <Button onClick={() => setAddRoomDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Room
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Total Rooms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{rooms?.length || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Total Capacity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {rooms?.reduce((total, room) => total + (room.maxOccupancy || room.capacity || 0), 0) || 0}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Occupancy Rate</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-bold">
              {rooms?.reduce((total, room) => total + (room.currentOccupancy || 0), 0) || 0}/
              {rooms?.reduce((total, room) => total + (room.maxOccupancy || room.capacity || 0), 0) || 0}
            </div>
            <Progress 
              value={
                rooms?.reduce((total, room) => total + (room.currentOccupancy || 0), 0) / 
                rooms?.reduce((total, room) => total + (room.maxOccupancy || room.capacity || 0), 0) * 100 || 0
              } 
              className="h-2"
            />
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Room Management</CardTitle>
          <CardDescription>
            View and manage dormitory rooms and occupancy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6 space-x-4">
            <div className="flex items-center space-x-2">
              <Button 
                variant={genderFilter === 'all' ? 'default' : 'outline'} 
                onClick={() => setGenderFilter('all')}
              >
                All
              </Button>
              <Button 
                variant={genderFilter === Gender.MALE ? 'default' : 'outline'} 
                onClick={() => setGenderFilter(Gender.MALE)}
              >
                Male
              </Button>
              <Button 
                variant={genderFilter === Gender.FEMALE ? 'default' : 'outline'} 
                onClick={() => setGenderFilter(Gender.FEMALE)}
              >
                Female
              </Button>
            </div>
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search rooms..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-pulse space-y-2">
                <div className="h-4 w-48 bg-muted rounded"></div>
                <div className="h-4 w-64 bg-muted rounded"></div>
              </div>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Room Number</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Occupants</TableHead>
                    <TableHead>Occupancy</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRooms && filteredRooms.length > 0 ? (
                    filteredRooms.map((room) => (
                      <TableRow key={room.id}>
                        <TableCell className="font-medium">{room.roomNumber || room.number}</TableCell>
                        <TableCell>{room.gender}</TableCell>
                        <TableCell>{room.maxOccupancy || room.capacity}</TableCell>
                        <TableCell>{room.currentOccupancy}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress 
                              value={(room.currentOccupancy / (room.maxOccupancy || room.capacity || 1)) * 100} 
                              className="h-2" 
                            />
                            <span className="text-sm text-muted-foreground w-10">
                              {Math.round((room.currentOccupancy / (room.maxOccupancy || room.capacity || 1)) * 100)}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 px-2"
                              onClick={() => {
                                setSelectedRoom(room);
                                setEditRoomDialogOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 px-2"
                              onClick={() => {
                                setSelectedRoom(room);
                                setDeleteConfirmOpen(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <Users className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center h-24">
                        No rooms found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Room Dialog */}
      <AddRoomDialog 
        open={addRoomDialogOpen}
        onOpenChange={setAddRoomDialogOpen}
        onAddRoom={handleAddRoom}
      />

      {/* Edit Room Dialog */}
      <EditRoomDialog 
        open={editRoomDialogOpen}
        onOpenChange={setEditRoomDialogOpen}
        onEditRoom={handleEditRoom}
        room={selectedRoom}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmActionDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        onConfirm={handleDeleteRoom}
        title="Delete Room"
        description={`Are you sure you want to delete room ${selectedRoom?.roomNumber || selectedRoom?.number}? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
      />
    </div>
  );
};

export default Rooms;
