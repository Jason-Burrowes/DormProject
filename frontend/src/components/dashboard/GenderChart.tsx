
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface GenderChartProps {
  maleCount: number;
  femaleCount: number;
  otherCount: number;
}

const GenderChart: React.FC<GenderChartProps> = ({ maleCount, femaleCount, otherCount }) => {
  const data = [
    { name: 'Male', value: maleCount, color: '#3b82f6' },
    { name: 'Female', value: femaleCount, color: '#ec4899' },
    { name: 'Other', value: otherCount, color: '#a3a3a3' },
  ];

  return (
    <Card className="col-span-full lg:col-span-1 h-full">
      <CardHeader>
        <CardTitle>Gender Distribution</CardTitle>
        <CardDescription>Breakdown of residents by gender</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <Tooltip
                formatter={(value) => [`${value} residents`, 'Count']}
                labelFormatter={(name) => `Gender: ${name}`}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-4">
          {data.map((item) => (
            <div key={item.name} className="flex flex-col items-center">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              <div className="text-2xl font-bold mt-1">{item.value}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GenderChart;
