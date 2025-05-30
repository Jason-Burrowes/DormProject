
import React, { useState } from 'react';
import { format } from 'date-fns';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, Plus, X } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { User, Gender, CampusStatus, ResidentialStatus, ProgrammeStatus } from '@/types';

const profileFormSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phoneNumber: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  dateOfBirth: z.date({ required_error: 'Please select a date of birth.' }),
  gender: z.nativeEnum(Gender, { required_error: 'Please select a gender.' }),
  campusStatus: z.nativeEnum(CampusStatus, { required_error: 'Please select campus status.' }),
  residentialStatus: z.nativeEnum(ResidentialStatus, { required_error: 'Please select residential status.' }),
  programmeName: z.string().optional(),
  programmeStatus: z.nativeEnum(ProgrammeStatus).optional(),
  extracurricularActivities: z.array(z.string()).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface TraineeProfileProps {
  user: User;
  onUpdate?: (data: Partial<User>) => void;
}

const TraineeProfile: React.FC<TraineeProfileProps> = ({ user, onUpdate }) => {
  const [newActivity, setNewActivity] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  // Parse the dateOfBirth string to a Date object for the form
  const parseDateOfBirth = (dateString?: string): Date => {
    if (!dateString) return new Date();
    try {
      return new Date(dateString);
    } catch (e) {
      return new Date();
    }
  };
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber || '',
      dateOfBirth: parseDateOfBirth(user.dateOfBirth),
      gender: user.gender,
      campusStatus: user.campusStatus,
      residentialStatus: user.residentialStatus || ResidentialStatus.NON_RESIDENTIAL,
      programmeName: user.programmeName || '',
      programmeStatus: user.programmeStatus || ProgrammeStatus.IN_TRAINING,
      extracurricularActivities: user.extracurricularActivities || [],
    },
  });

  function onSubmit(data: ProfileFormValues) {
    if (onUpdate) {
      // Convert date back to string format for the API
      const formattedData = {
        ...data,
        dateOfBirth: data.dateOfBirth ? format(data.dateOfBirth, 'yyyy-MM-dd') : undefined,
      };
      
      onUpdate(formattedData as unknown as Partial<User>);
    }
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
    
    setIsEditing(false);
  }
  
  const addActivity = () => {
    if (!newActivity.trim()) return;
    
    const currentActivities = form.getValues('extracurricularActivities') || [];
    form.setValue('extracurricularActivities', [...currentActivities, newActivity.trim()]);
    setNewActivity('');
  };
  
  const removeActivity = (index: number) => {
    const currentActivities = form.getValues('extracurricularActivities') || [];
    const updatedActivities = currentActivities.filter((_, i) => i !== index);
    form.setValue('extracurricularActivities', updatedActivities);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Personal Information</h2>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        ) : (
          <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
        )}
      </div>
      
      {!isEditing ? (
        <Card>
          <CardContent className="pt-6">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Full Name</dt>
                <dd className="text-base">{user.firstName} {user.lastName}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                <dd className="text-base">{user.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Phone Number</dt>
                <dd className="text-base">{user.phoneNumber || 'Not provided'}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Date of Birth</dt>
                <dd className="text-base">
                  {user.dateOfBirth ? format(new Date(user.dateOfBirth), 'MMM dd, yyyy') : 'Not provided'}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Gender</dt>
                <dd className="text-base capitalize">{user.gender}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Campus Status</dt>
                <dd className="text-base capitalize">{user.campusStatus.replace('_', ' ')}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Residential Status</dt>
                <dd className="text-base capitalize">{user.residentialStatus?.replace('_', ' ') || 'Non-Residential'}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Programme</dt>
                <dd className="text-base">{user.programmeName || 'Not assigned'}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Programme Status</dt>
                <dd className="text-base capitalize">{user.programmeStatus?.replace('_', ' ') || 'Not assigned'}</dd>
              </div>
              {user.isResident && (
                <>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Room Number</dt>
                    <dd className="text-base">{user.roomId || 'Not assigned'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Locker Number</dt>
                    <dd className="text-base">{user.lockerId || 'Not assigned'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Residency Period</dt>
                    <dd className="text-base">
                      {user.residencyStartDate && user.residencyEndDate ? (
                        `${format(new Date(user.residencyStartDate), 'MMM dd, yyyy')} - 
                         ${format(new Date(user.residencyEndDate), 'MMM dd, yyyy')}`
                      ) : 'Not specified'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Passes</dt>
                    <dd className="text-base">
                      {user.passesUsed !== undefined && user.maxPasses !== undefined ? (
                        `${user.passesUsed} / ${user.maxPasses} used`
                      ) : 'Not available'}
                    </dd>
                  </div>
                </>
              )}
            </dl>
            
            {user.extracurricularActivities && user.extracurricularActivities.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Extracurricular Activities</h3>
                <div className="flex flex-wrap gap-2">
                  {user.extracurricularActivities.map((activity, index) => (
                    <span 
                      key={index} 
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                    >
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date of Birth</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
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
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={Gender.MALE}>Male</SelectItem>
                            <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                            <SelectItem value={Gender.OTHER}>Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="campusStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Campus Status</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select campus status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={CampusStatus.ON_CAMPUS}>On Campus</SelectItem>
                            <SelectItem value={CampusStatus.OFF_CAMPUS}>Off Campus</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="residentialStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Residential Status</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select residential status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={ResidentialStatus.RESIDENTIAL}>Residential</SelectItem>
                            <SelectItem value={ResidentialStatus.NON_RESIDENTIAL}>Non-Residential</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="programmeName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Programme Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="programmeStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Programme Status</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select programme status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={ProgrammeStatus.IN_TRAINING}>In Training</SelectItem>
                            <SelectItem value={ProgrammeStatus.WORK_EXPERIENCE}>Work Experience</SelectItem>
                            <SelectItem value={ProgrammeStatus.INTERNSHIP}>Internship</SelectItem>
                            <SelectItem value={ProgrammeStatus.COMPLETED}>Completed</SelectItem>
                            <SelectItem value={ProgrammeStatus.DISCONTINUED}>Discontinued</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div>
                  <FormLabel>Extracurricular Activities</FormLabel>
                  <div className="flex flex-wrap gap-2 mt-2 mb-4">
                    {form.watch('extracurricularActivities')?.map((activity, index) => (
                      <span 
                        key={index} 
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center"
                      >
                        {activity}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-5 w-5 p-0 ml-1"
                          onClick={() => removeActivity(index)}
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Input
                      value={newActivity}
                      onChange={(e) => setNewActivity(e.target.value)}
                      placeholder="Add activity"
                      className="flex-1"
                    />
                    <Button 
                      type="button" 
                      onClick={addActivity}
                      variant="outline"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TraineeProfile;
