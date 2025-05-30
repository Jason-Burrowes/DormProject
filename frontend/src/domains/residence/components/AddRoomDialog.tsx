
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Gender, RoomStatus } from '@/types';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const roomFormSchema = z.object({
  roomNumber: z.string().min(1, { message: 'Room number is required' }),
  building: z.string().min(1, { message: 'Building is required' }),
  floor: z.string().min(1, { message: 'Floor is required' }),
  type: z.string().min(1, { message: 'Room type is required' }),
  maxOccupancy: z.coerce.number().min(1, { message: 'Max occupancy must be at least 1' }),
  gender: z.nativeEnum(Gender),
  status: z.nativeEnum(RoomStatus),
  notes: z.string().optional(),
});

type RoomFormValues = z.infer<typeof roomFormSchema>;

interface AddRoomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddRoom: (data: RoomFormValues) => void;
}

const AddRoomDialog: React.FC<AddRoomDialogProps> = ({ 
  open, 
  onOpenChange,
  onAddRoom,
}) => {
  const form = useForm<RoomFormValues>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: {
      roomNumber: '',
      building: '',
      floor: '',
      type: 'Dormitory',
      maxOccupancy: 4,
      gender: Gender.MALE,
      status: RoomStatus.VACANT,
      notes: '',
    },
  });

  function onSubmit(data: RoomFormValues) {
    onAddRoom(data);
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add New Room</DialogTitle>
          <DialogDescription>
            Create a new room in the dormitory system.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="roomNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Number</FormLabel>
                    <FormControl>
                      <Input placeholder="101" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="building"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Building</FormLabel>
                    <FormControl>
                      <Input placeholder="Building A" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="floor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Floor</FormLabel>
                    <FormControl>
                      <Input placeholder="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Type</FormLabel>
                    <FormControl>
                      <Input placeholder="Dormitory" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="maxOccupancy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Occupancy</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={Gender.MALE}>Male</SelectItem>
                        <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={RoomStatus.VACANT}>Vacant</SelectItem>
                        <SelectItem value={RoomStatus.OCCUPIED}>Occupied</SelectItem>
                        <SelectItem value={RoomStatus.MAINTENANCE}>Maintenance</SelectItem>
                        <SelectItem value={RoomStatus.RESERVED}>Reserved</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Additional information about the room..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Room</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRoomDialog;
