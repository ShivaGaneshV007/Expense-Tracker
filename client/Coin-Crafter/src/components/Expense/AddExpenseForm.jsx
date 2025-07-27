import React, { useState } from 'react';
import Input from '../../components/Inputs/Input'; // Assuming this path is correct
import EmojiPickerPopup from '../EmojiPickerPopup';
import { useUserAuth } from '../../hooks/useUserAuth'; // Assuming this path is correct

const AddExpenseForm = ({ onAddExpense }) => {
  const [income, setIncome] = useState({
    category: '', // Changed from 'source' to 'category'
    amount: '',
    date: '',
    icon: '',
  });

  const handleChange = (key, value) => setIncome({ ...income, [key]: value });

  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      <Input
        value={income.category} // Changed from 'source' to 'category'
        onChange={({ target }) => handleChange("category", target.value)} // Changed from 'source' to 'category'
        label="Category" // Changed label from "Income Source" to "Category"
        placeholder="e.g., Groceries, Rent, Salary" // Updated placeholder
        type="text"
      />
      {/* Input field for amount */}
      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder="e.g., 500.00"
        type="number" // Use type="number" for amount input
      />
      <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          // Applied direct Tailwind CSS utility classes for styling
          className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-md shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-300 ease-in-out"
          onClick={() => onAddExpense(income)}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
