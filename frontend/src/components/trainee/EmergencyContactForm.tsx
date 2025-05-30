
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { toast } from '@/hooks/use-toast';
import { EmergencyContact } from '@/types';

const emergencyContactSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phoneNumber: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  relationship: z.string().min(2, { message: 'Please specify the relationship.' }),
});

interface EmergencyContactFormProps {
  contact?: EmergencyContact;
  userId: string;
  onSave: (data: Partial<EmergencyContact>) => void;
}

const EmergencyContactForm: React.FC<EmergencyContactFormProps> = ({ 
  contact, 
  userId, 
  onSave 
}) => {
  const form = useForm<z.infer<typeof emergencyContactSchema>>({
    resolver: zodResolver(emergencyContactSchema),
    defaultValues: {
      firstName: contact?.firstName || '',
      lastName: contact?.lastName || '',
      email: contact?.email || '',
      phoneNumber: contact?.phoneNumber || '',
      relationship: contact?.relationship || '',
    },
  });

  function onSubmit(data: z.infer<typeof emergencyContactSchema>) {
    onSave({
      ...data,
      userId,
    });
    
    toast({
      title: "Emergency contact saved",
      description: "Your emergency contact information has been updated successfully.",
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Emergency Contact</CardTitle>
        <CardDescription>
          Provide emergency contact information. This will be used in case of emergencies.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                name="relationship"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Relationship</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. Parent, Spouse, Sibling" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-end">
              <Button type="submit">Save Contact</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EmergencyContactForm;
