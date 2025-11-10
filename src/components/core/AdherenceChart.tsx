import React from 'react';
import { Card } from '../ui/card';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface AdherenceChartProps {
  data: {
    date: string;
    adherence: number;
    taken: number;
    missed: number;
  }[];
  type?: 'bar' | 'line';
  title?: string;
}

export function AdherenceChart({ data, type = 'bar', title }: AdherenceChartProps) {
  const getColor = (value: number) => {
    if (value >= 90) return '#10b981'; // green
    if (value >= 70) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  return (
    <Card className="p-4">
      {title && <h4 className="mb-4">{title}</h4>}
      
      <ResponsiveContainer width="100%" height={250}>
        {type === 'bar' ? (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              formatter={(value: number) => `${value}%`}
            />
            <Bar dataKey="adherence" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.adherence)} />
              ))}
            </Bar>
          </BarChart>
        ) : (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              formatter={(value: number) => `${value}%`}
            />
            <Line
              type="monotone"
              dataKey="adherence"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        )}
      </ResponsiveContainer>

      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Average</p>
          <p className="text-2xl" style={{ color: getColor(data.reduce((acc, d) => acc + d.adherence, 0) / data.length) }}>
            {Math.round(data.reduce((acc, d) => acc + d.adherence, 0) / data.length)}%
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Total Taken</p>
          <p className="text-2xl text-green-600">
            {data.reduce((acc, d) => acc + d.taken, 0)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Total Missed</p>
          <p className="text-2xl text-red-600">
            {data.reduce((acc, d) => acc + d.missed, 0)}
          </p>
        </div>
      </div>
    </Card>
  );
}
