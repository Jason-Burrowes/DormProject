
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Save, 
  Mail, 
  Bell, 
  Shield, 
  Smartphone, 
  Clock 
} from 'lucide-react';

// Form validation schema
const settingsFormSchema = z.object({
  emailNotifications: z.boolean().default(true),
  overStayAlerts: z.boolean().default(true),
  twoFactorAuth: z.boolean().default(false),
  requireGatePassApproval: z.boolean().default(true),
  autoLogout: z.boolean().default(false),
  dormHours: z.object({
    curfewTime: z.string(),
    wakeUpTime: z.string(),
  }),
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

const Settings = () => {
  // Initialize the form with default values
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      emailNotifications: true,
      overStayAlerts: true,
      twoFactorAuth: false,
      requireGatePassApproval: true,
      autoLogout: false,
      dormHours: {
        curfewTime: '22:00',
        wakeUpTime: '06:00',
      },
    },
  });
  
  const onSubmit = (data: SettingsFormValues) => {
    // In a real application, this would update the settings
    console.log('Settings update submitted:', data);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="emailNotifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Email Notifications</FormLabel>
                      <FormDescription>
                        Receive email notifications for important updates
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <Separator />
              
              <FormField
                control={form.control}
                name="overStayAlerts"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Overstay Alerts</FormLabel>
                      <FormDescription>
                        Receive alerts when residents overstay their gate passes
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Configure security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="twoFactorAuth"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Two-Factor Authentication</FormLabel>
                      <FormDescription>
                        Add an extra layer of security to your account
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <Separator />
              
              <FormField
                control={form.control}
                name="autoLogout"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Auto Logout</FormLabel>
                      <FormDescription>
                        Automatically log out after 30 minutes of inactivity
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Dorm System Settings</CardTitle>
              <CardDescription>
                Configure dorm-specific settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="requireGatePassApproval"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Require Gate Pass Approval</FormLabel>
                      <FormDescription>
                        All gate passes must be approved by authorized personnel
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <Separator />
              
              <div className="space-y-4">
                <div className="text-base font-medium">Dorm Hours</div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="dormHours.curfewTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Curfew Time</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormDescription>
                          Residents must be in the dorm by this time
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="dormHours.wakeUpTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Wake-up Time</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormDescription>
                          Official wake-up time for all residents
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button type="submit" size="lg">
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Settings;
