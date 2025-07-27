import React, { useState, useEffect } from 'react';
import { LuPlus } from 'react-icons/lu';
import { prepareExpenseLineChartData } from '../../utils/helper';
import CustomLineChart from '../../components/Charts/CustomLineChart';

const ExpenseOverview = ({ transactions, onAddExpense, onDeleteExpense, onDownload }) => {
  const [chartData, setChartData] = useState([]);

  const totalExpenseAmount = transactions.reduce((sum, t) => sum + (typeof t.amount === 'number' ? t.amount : parseFloat(t.amount) || 0), 0);

  useEffect(() => {
    console.log("ExpenseOverview: Raw 'transactions' prop received:", transactions);

    if (transactions && transactions.length > 0) {
      const result = prepareExpenseLineChartData(transactions);
      setChartData(result);
      console.log("ExpenseOverview: Processed 'chartData' for Line Chart:", result);
    } else {
      setChartData([]);
      console.log("ExpenseOverview: No valid 'transactions' data to process for chart.");
    }

    return () => {};
  }, [transactions]);

  return (
    // Applied card styling from IncomeOverview
    <div className="card bg-white p-6 rounded-2xl shadow-md border border-gray-200/50">
      <div className="flex items-center justify-between mb-4"> {/* Adjusted margin-bottom */}
        <div> {/* Wrapped title and description in a div */}
          <h5 className="text-lg font-semibold text-gray-800">Expense Overview</h5> {/* Adjusted font styling */}
          <p className="text-sm text-gray-500 mt-0.5"> {/* Adjusted text color and margin */}
            Track your spending trends over time and gain insights into where your money goes.
          </p>
        </div>

        {/* The Add Expense button maintains its original styling as it was already consistent */}
        <button
          className="flex items-center gap-1.5 text-xs md:text-sm font-medium text-white whitespace-nowrap bg-purple-600 border border-purple-600 rounded-lg px-4 py-2 cursor-pointer hover:bg-purple-700 hover:border-purple-700 transition duration-300 ease-in-out"
          onClick={onAddExpense}
        >
          <LuPlus className="text-lg" /> {/* Changed icon size for consistency */}
          Add Expense
        </button>
      </div>

      <div className="mb-6 text-center">
        <h6 className="text-sm text-gray-500">Total Expense</h6>
        <p className="text-3xl font-bold text-red-600">${totalExpenseAmount.toFixed(2)}</p>
      </div>

      {/* The chart section remains unchanged as requested */}
      <div className="mt-10"> {/* Adjusted top margin for chart container */}
        {chartData.length > 0 ? (
          <CustomLineChart data={chartData} />
        ) : (
          <div className="text-center text-gray-500 py-8">
            <p>No expense data available for chart.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseOverview;