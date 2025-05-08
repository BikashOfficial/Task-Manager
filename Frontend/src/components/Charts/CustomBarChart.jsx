import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts'

const CustomBarChart = ({ data }) => {
  // Transform data from object to array format for Recharts
  const formattedData = Object.entries(data || {}).map(([priority, count]) => ({
    priority,
    count
  }));

  console.log('Bar Chart Data:', formattedData); // Debug log

  const COLORS = {
    'Low': '#008000',
    'Medium': 'orange',
    'High': 'red'
  }

  return (
    <ResponsiveContainer width="100%" height={325} >
      <BarChart
        data={formattedData}
        margin={{
          top: 20,
          right: 30,
          left:-12,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="priority" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="count"
          radius={[4, 4, 0, 0]}
          barSize={60}
        >
          {formattedData.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={COLORS[entry.priority]} 
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default CustomBarChart