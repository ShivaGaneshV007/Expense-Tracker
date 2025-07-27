import React from 'react';
import {
  AreaChart, // Changed from LineChart to AreaChart
  Area,        // Keep Area for the shaded region
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomLineChart = ({ data }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      // Assuming payload[0].name and payload[0].value are available
      const entry = payload[0].payload; // Access the original data object
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p className="text-xs font-semibold text-purple-800 mb-1">
            {entry.month || entry.name} {/* Assuming month or name for X-axis */}
          </p>
          <p className="text-sm text-gray-600">
            Amount: {" "}
            <span className="text-sm font-medium text-gray-900">
              ${entry.amount}
            </span>
          </p>
          {entry.category && ( // Display category if present (for expenses)
            <p className="text-xs text-gray-600">
              Category: {entry.category}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white mt-6 p-4 rounded-lg shadow-sm">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart // Changed to AreaChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          {/* Define the linear gradient for the shaded area */}
          <defs>
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              {/* Top color (darker purple, less transparent) */}
              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
              {/* Bottom color (lighter purple, more transparent) */}
              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" /> {/* Keep grid for visual guidance */}
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#555" }} />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="#e0e0e0" strokeWidth={0.5} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />

          <Area
            type="monotone"
            dataKey="amount"
            stroke="#8B5CF6" // Line color (vibrant purple)
            fill="url(#expenseGradient)" // Apply the gradient here
            strokeWidth={2}
            dot={{ r: 4, fill: '#8B5CF6' }}
            activeDot={{ r: 6, fill: '#DDD6FE', stroke: '#8B5CF6', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;