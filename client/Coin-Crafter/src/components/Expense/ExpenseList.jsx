import React from 'react';
import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="card"> {/* Using the 'card' class */}
      <div className="flex items-center justify-between mb-4"> {/* Simplified header flex */}
        <h5 className="text-lg">All Expenses</h5> {/* Smaller title font size */}
        <button className="card-btn flex items-center gap-2" onClick={onDownload}> {/* Using 'card-btn' */}
          <LuDownload className="text-base" /> {/* Consistent icon size */}
          Download
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {transactions?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format("Do MMM YYYY")}
            amount={expense.amount}
            type="expense"
            onDelete={() => onDelete(expense._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;