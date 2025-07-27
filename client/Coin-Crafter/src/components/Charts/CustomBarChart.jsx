import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // Legend, // Removed Legend import
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomBarChart = ({ data }) => {
  const getBarColor = (index) => {
    return index % 2 === 0 ? "#875cf5" : "#cfbefb";
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      // The payload[0].payload will contain the original transaction object
      const transaction = payload[0].payload;
      const displayDate = transaction.date
        ? new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        : 'N/A';

      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p className="text-xs font-semibold text-purple-800 mb-1">
            {transaction.category || 'No Category'}
          </p>
          <p className="text-xs text-gray-600 mb-1">
            {displayDate}
          </p>
          <p className="text-sm text-gray-600">
            Amount: {" "}
            <span className="text-sm font-medium text-gray-900">
              ${transaction.amount}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white mt-6 p-4 rounded-lg shadow-sm">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          {/* Explicitly add a white background to the chart area */}
          <rect x="0" y="0" width="100%" height="100%" fill="#FFFFFF" />
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
          <XAxis
            dataKey="uniqueKey" // Now uses the 'uniqueKey' from prepared data
            tick={{ fontSize: 12, fill: "#555" }}
            // Formatter to display only the category from the uniqueKey
            tickFormatter={(tick) => {
              // Assuming uniqueKey is "Category-ID" or "Category-Index"
              // We split by '-' and take all parts except the last one (the ID/index)
              return tick.split('-').slice(0, -1).join('-');
            }}
            angle={-45} // Angle the labels to prevent overlap
            textAnchor="end" // Anchor text to the end of the label
            height={70} // Give more height for angled labels
            interval={0} // Show all ticks, no skipping
          />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="#e0e0e0" />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
          {/* Legend component removed as requested */}
          <Bar
            dataKey="amount"
            radius={[10, 10, 0, 0]}
            stroke="#8884d8" // Added a default stroke to the bars for visibility
          >
            {data.map((entry, index) => (
              // Use the uniqueKey for the Cell key as well for React's reconciliation
              <Cell key={`cell-${entry.uniqueKey}`} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
