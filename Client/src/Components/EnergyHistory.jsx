import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const EnergyHistoryChart = () => {
  // Hardcoded data for energy history
  const data = [
    { date: '2024-01', amount: 150 },
    { date: '2024-02', amount: 220 },
    { date: '2024-03', amount: 180 },
    { date: '2024-04', amount: 240 },
    { date: '2024-05', amount: 280 },
    { date: '2024-06', amount: 320 },
    { date: '2024-07', amount: 290 },
    { date: '2024-08', amount: 350 },
    { date: '2024-09', amount: 310 },
    { date: '2024-10', amount: 280 }
  ];

  return (
    <ResponsiveContainer width={600} height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="text-gray-200" />
        <XAxis 
          dataKey="date"
          tick={{ fill: '#666' }}
          tickLine={{ stroke: '#666' }}
        />
        <YAxis
          tick={{ fill: '#666' }}
          tickLine={{ stroke: '#666' }}
          label={{ 
            value: 'Energy Production (kWh)', 
            angle: -90, 
            position: 'insideLeft',
            fill: '#666'
          }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="#8884d8"
          strokeWidth={2}
          dot={{ fill: '#8884d8', r: 4 }}
          activeDot={{ r: 6 }}
          name="Energy Production"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default EnergyHistoryChart;