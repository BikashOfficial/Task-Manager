import React from 'react'

import {
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
    PieChart,
} from 'recharts'

const CustomPieChart = ({ data, labels, colors }) => {

    console.log(data)
    return (
        <ResponsiveContainer width='100%' height={325}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="count"
                    nameKey="status"
                    cx="50%"
                    cy='50%'
                    outerRadius={130}
                    innerRadius={100}
                    labelLine={false}
                >
                    {data.map((entry, index) => (
                        <Cell 
                            key={`cell-${index}`} 
                            fill={colors[index % colors.length]} 
                        />
                    ))}
                </Pie>
                <Legend />
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    )
}

export default CustomPieChart