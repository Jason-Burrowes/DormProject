
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserPlus, ClipboardList, CalendarClock, Users, Bell } from 'lucide-react';

const ManagementRoleFunctionalities: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Management Role Functionalities</CardTitle>
        <CardDescription>Overview of capabilities for management users</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">1. Profile Attributes</h3>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Basic user information</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Basic user information</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Gender</TableCell>
                  <TableCell>Basic user information</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>Used for login and communications</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Contact information</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Password</TableCell>
                  <TableCell>Secure account access</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">2. Core Functionalities</h3>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-2">
              <Card className="bg-slate-50">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5 text-primary" />
                    <CardTitle className="text-base">User Management</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm">
                  Ability to add new users of all roles (Trainees, Security, Dorm Supervisors, Nurse, and Management)
                </CardContent>
              </Card>
              
              <Card className="bg-slate-50">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-primary" />
                    <CardTitle className="text-base">Dashboard & Analytics</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm">
                  Access to a dashboard showing overall dorm statistics
                </CardContent>
              </Card>
              
              <Card className="bg-slate-50">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <CalendarClock className="h-5 w-5 text-primary" />
                    <CardTitle className="text-base">Leave Management</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>Ability to provide or approve leaves for trainees:</p>
                  <ul className="list-disc list-inside mt-1">
                    <li>Disciplinary leaves</li>
                    <li>Vacation leaves</li>
                    <li>Emergency leaves</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-50">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <CardTitle className="text-base">Information Access</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm">
                  View detailed information of all users (Trainees, Security, Dorm Supervisors, Nurse, Management)
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">3. Communication</h3>
            <Card className="bg-slate-50 mt-2">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Notifications</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm">
                Ability to deploy notifications across all roles (excluding trainees and security)
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ManagementRoleFunctionalities;
