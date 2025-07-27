import React, { useState, useEffect } from 'react';
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../charts/CustomBarChart"; // Ensure this path is correct
import { prepareIncomeBarChartData } from '../../utils/helper'; // Ensure this path is correct

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  // Calculate total income from transactions for display
  const totalIncomeAmount = transactions.reduce((sum, t) => sum + (typeof t.amount === 'number' ? t.amount : parseFloat(t.amount) || 0), 0);

  useEffect(() => {
    // --- Crucial Debugging Logs ---
    console.log("IncomeOverview: Raw 'transactions' prop received:", transactions);

    if (transactions && transactions.length > 0) {
      const result = prepareIncomeBarChartData(transactions);
      setChartData(result);
      console.log("IncomeOverview: Processed 'chartData' for Bar Chart:", result);
    } else {
      setChartData([]); // Clear chart data if no valid transactions
      console.log("IncomeOverview: No valid 'transactions' data to process for chart.");
    }
    // ----------------------------

    return () => {};
  }, [transactions]); // Effect re-runs when 'transactions' prop changes

  return (
    <div className="card bg-white p-6 rounded-2xl shadow-md border border-gray-200/50"> {/* Added card styling for visibility */}
      <div className="flex items-center justify-between mb-4"> {/* Added margin-bottom */}
        <div>
          <h5 className="text-lg font-semibold text-gray-800">Income Overview</h5> {/* Added font styling */}
          <p className="text-sm text-gray-500 mt-0.5">
            Track your earnings over time and analyze your income trends
          </p>
        </div>
        <button
          // Applied direct Tailwind CSS utility classes for styling the button
          className="flex items-center gap-1.5 text-xs md:text-sm font-medium text-white whitespace-nowrap bg-purple-600 border border-purple-600 rounded-lg px-4 py-2 cursor-pointer hover:bg-purple-700 hover:border-purple-700 transition duration-300 ease-in-out"
          onClick={onAddIncome}
        >
          <LuPlus className="text-lg" />
          Add Income
        </button>
      </div>

      {/* Display Total Income (Optional, but common for overview) */}
      <div className="mb-6 text-center">
        <h6 className="text-sm text-gray-500">Total Income</h6>
        <p className="text-3xl font-bold text-green-600">${totalIncomeAmount.toFixed(2)}</p>
      </div>

      <div className="mt-10">
        {/* Render chart if data exists */}
        {chartData.length > 0 ? (
          <CustomBarChart data={chartData} />
        ) : (
          <div className="text-center text-gray-500 py-8">
            <p>No income data available for chart.</p>
          </div>
        )}
      </div>

      {/* Removed the "Recent Income Transactions" section as requested */}
    </div>
  );
};

export default IncomeOverview;
