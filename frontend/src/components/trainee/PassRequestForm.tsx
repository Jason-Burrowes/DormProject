
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { GatePass, Status } from '@/types';
import GatePassFormFields, { 
  gatePassSchema, 
  GatePassFormValues 
} from '@/domains/leave/components/forms/GatePassFormFields';

interface PassRequestFormProps {
  userId: string;
  onSubmit: (data: Partial<GatePass>) => void;
}

const PassRequestForm: React.FC<PassRequestFormProps> = ({ userId, onSubmit }) => {
  const form = useForm<GatePassFormValues>({
    resolver: zodResolver(gatePassSchema),
    defaultValues: {
      destination: '',
      reason: '',
      requestDate: new Date(),
      requestTime: format(new Date(), 'HH:mm'),
      departureDate: new Date(),
      returnDate: new Date(),
    },
  });

  function handleSubmit(data: GatePassFormValues) {
    onSubmit({
      userId,
      destination: data.destination,
      reason: data.reason,
      requestDate: data.requestDate,
      requestTime: data.requestTime,
      departureDate: data.departureDate,
      returnDate: data.returnDate,
      status: Status.PENDING,
      isUsed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    toast({
      title: "Pass request submitted",
      description: "Your pass request has been submitted successfully.",
    });
    
    form.reset({
      destination: '',
      reason: '',
      requestDate: new Date(),
      requestTime: format(new Date(), 'HH:mm'),
      departureDate: new Date(),
      returnDate: new Date(),
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Gate Pass</CardTitle>
        <CardDescription>
          Fill in the details to request a gate pass
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <GatePassFormFields />
            
            <div className="flex justify-end">
              <Button type="submit">Submit Request</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PassRequestForm;
