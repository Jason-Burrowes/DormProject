
import React from 'react';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, Clock } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { 
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

// Define the schema here so it can be exported and reused
export const gatePassSchema = z.object({
  destination: z.string().min(2, { message: 'Please enter a destination.' }),
  reason: z.string().min(5, { message: 'Please provide a reason for your pass request.' }),
  requestDate: z.date({ required_error: 'Please select a request date.' }),
  requestTime: z.string({ required_error: 'Please enter a request time.' }).regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { 
    message: 'Please enter a valid time in 24-hour format (HH:MM).' 
  }),
  departureDate: z.date({ required_error: 'Please select a departure date.' }),
  returnDate: z.date({ required_error: 'Please select a return date.' }),
}).refine((data) => data.returnDate >= data.departureDate, {
  message: "Return date must be after departure date",
  path: ["returnDate"],
});

export type GatePassFormValues = z.infer<typeof gatePassSchema>;

const GatePassFormFields: React.FC = () => {
  const form = useFormContext<GatePassFormValues>();

  return (
    <>
      <FormField
        control={form.control}
        name="destination"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Destination</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Where are you going?" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="reason"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Reason</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                placeholder="Please provide a reason for your request"
                rows={3}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="requestDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Request Date</FormLabel>
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
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="requestTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Request Time</FormLabel>
              <FormControl>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    {...field} 
                    placeholder="HH:MM" 
                    className="pl-10"
                  />
                </div>
              </FormControl>
              <FormDescription>
                Use 24-hour format (e.g., 14:30)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="departureDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Departure Date</FormLabel>
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
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="returnDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Return Date</FormLabel>
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
                      date < form.getValues('departureDate')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default GatePassFormFields;
