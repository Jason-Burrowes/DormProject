
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { GatePass, Status } from '@/types';
import GatePassFormFields, { gatePassSchema, GatePassFormValues } from './forms/GatePassFormFields';

interface AddGatePassDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Partial<GatePass>) => void;
}

const AddGatePassDialog: React.FC<AddGatePassDialogProps> = ({ 
  open, 
  onOpenChange,
  onSubmit 
}) => {
  const { user } = useAuth();
  
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
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "You must be logged in to submit a pass request.",
      });
      return;
    }

    const gatePassData: Partial<GatePass> = {
      userId: user.id,
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
    };
    
    onSubmit(gatePassData);
    
    form.reset({
      destination: '',
      reason: '',
      requestDate: new Date(),
      requestTime: format(new Date(), 'HH:mm'),
      departureDate: new Date(),
      returnDate: new Date(),
    });
    
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Request Gate Pass</DialogTitle>
          <DialogDescription>
            Fill in the details to request a gate pass. All fields are required.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <GatePassFormFields />
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Submit Request</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGatePassDialog;
