import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from 'recharts';

const SimpleGraph = () => {
  // Example price history data for iPhone 15 Pro Max for the past month
  const priceHistoryData = [
    { date: '2024-04-01', price: 1200 },
    { date: '2024-04-02', price: 1180 },
    { date: '2024-04-03', price: 1160 },
    { date: '2024-04-04', price: 1155 },
    { date: '2024-04-05', price: 1170 },
    { date: '2024-04-06', price: 1185 },
    { date: '2024-04-07', price: 1190 },
    { date: '2024-04-08', price: 1185 },
    { date: '2024-04-09', price: 1195 },
    { date: '2024-04-10', price: 1200 },
    { date: '2024-04-11', price: 1210 },
    { date: '2024-04-12', price: 1225 },
    { date: '2024-04-13', price: 1240 },
    { date: '2024-04-14', price: 1235 },
    { date: '2024-04-15', price: 1220 },
    { date: '2024-04-16', price: 1215 },
    { date: '2024-04-17', price: 1205 },
    { date: '2024-04-18', price: 1195 },
    { date: '2024-04-19', price: 1200 },
    { date: '2024-04-20', price: 1190 },
    { date: '2024-04-21', price: 1185 },
    { date: '2024-04-22', price: 1195 },
    { date: '2024-04-23', price: 1200 },
    { date: '2024-04-24', price: 1210 },
    { date: '2024-04-25', price: 1220 },
    { date: '2024-04-26', price: 1230 },
    { date: '2024-04-27', price: 1245 },
    { date: '2024-04-28', price: 1250 },
    { date: '2024-04-29', price: 1260 },
    { date: '2024-04-30', price: 1275 },
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={priceHistoryData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <defs>
          <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="price" stroke="#8884d8" fill="url(#priceGradient)" />
        <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} dot={{ stroke: '#8884d8', strokeWidth: 2, r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SimpleGraph;
