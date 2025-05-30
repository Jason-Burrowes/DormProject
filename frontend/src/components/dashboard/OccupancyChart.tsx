
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface OccupancyChartProps {
  roomOccupancy: number;
  lockerOccupancy: number;
}

const OccupancyChart: React.FC<OccupancyChartProps> = ({ roomOccupancy, lockerOccupancy }) => {
  const roomData = [
    { name: 'Occupied', value: roomOccupancy },
    { name: 'Available', value: 100 - roomOccupancy },
  ];

  const lockerData = [
    { name: 'Assigned', value: lockerOccupancy },
    { name: 'Available', value: 100 - lockerOccupancy },
  ];

  const COLORS = ['#3b82f6', '#e2e8f0'];

  return (
    <Card className="col-span-full lg:col-span-2 h-full">
      <CardHeader>
        <CardTitle>Accommodation Occupancy</CardTitle>
        <CardDescription>Current room and locker occupancy rates</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-80 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col items-center">
            <h3 className="text-sm font-medium mb-2">Room Occupancy</h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={roomData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {roomData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${Number(value).toFixed(1)}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="text-center mt-2">
              <div className="text-2xl font-bold">{roomOccupancy.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">Current occupancy rate</div>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <h3 className="text-sm font-medium mb-2">Locker Occupancy</h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={lockerData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {lockerData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${Number(value).toFixed(1)}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="text-center mt-2">
              <div className="text-2xl font-bold">{lockerOccupancy.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">Current assignment rate</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OccupancyChart;
