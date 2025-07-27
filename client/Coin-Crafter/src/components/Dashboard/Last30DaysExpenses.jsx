import React, { useEffect, useState } from 'react';
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';

const Last30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  // --- ADDED: Log to confirm component renders at all ---
  console.log("Last30DaysExpenses: Component rendered.");
  // -----------------------------------------------------

  useEffect(() => {
    console.log("Last30DaysExpenses: useEffect triggered. Raw 'data' prop received:", data);

    try {
      if (data && data.length > 0) {
        const result = prepareExpenseBarChartData(data);
        setChartData(result);
        console.log("Last30DaysExpenses: Processed 'chartData' for Bar Chart:", result);
      } else {
        setChartData([]); // Clear chart data if no valid transactions
        console.log("Last30DaysExpenses: No valid 'data' (transactions) to process for chart.");
      }
    } catch (error) {
      console.error("Last30DaysExpenses: Error in prepareExpenseBarChartData or useEffect:", error);
      setChartData([]); // Ensure chart data is cleared on error
    }


    return () => {
      // Cleanup function if needed
    };
  }, [data]); // Dependency array includes 'data' so effect re-runs when 'data' changes

  return (
    <div className="card col-span-1 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold text-gray-800">Last 30 Days Expenses</h5>
      </div>
      {chartData.length > 0 ? (
        <CustomBarChart data={chartData}/>
      ) : (
        <div className="text-center text-gray-500 py-8">
          <p>No expense data available for the last 30 days.</p>
        </div>
      )}
    </div>
  );
};

export default Last30DaysExpenses;
