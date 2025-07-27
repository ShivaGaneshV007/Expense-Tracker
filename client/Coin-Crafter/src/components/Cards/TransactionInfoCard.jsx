import React from "react";
import {
    LuUtensils,
    LuTrendingUp,
    LuTrendingDown,
    LuTrash2,
} from "react-icons/lu"; // Assuming 'lu' sub-path for Lucide icons in react-icons

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete, // Added onDelete prop for the delete button
}) => {
  // Helper function to get dynamic styles for the amount/type display
  const getAmountStyles = () => {
    if (type === "income") {
      return "bg-green-50 text-green-500";
    } else if (type === "expense") {
      return "bg-red-50 text-red-500";
    }
    return ""; // Default or neutral style
  };

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60 transition-colors duration-200">
      {/* Icon Container */}
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6 object-contain" />
        ) : (
          <LuUtensils />
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-between">
        {/* Title and Date */}
        <div>
          <p className="text-sm text-gray-700 font-medium">{title}</p>
          <p className="text-xs text-gray-400 mt-1">{date}</p>
        </div>

        {/* Amount, Type, and Delete Button */}
        <div className="flex items-center gap-2">
          {!hideDeleteBtn && (
            <button
              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              onClick={onDelete} // Use the onDelete prop here
              aria-label="Delete transaction"
            >
              <LuTrash2 size={18} />
            </button>
          )}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}
          >
            <h6 className="text-xs font-medium">
              {type === "income" ? "+" : "-"} ${amount}
            </h6>
            {type === "income" ? <LuTrendingUp size={16} /> : <LuTrendingDown size={16} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
