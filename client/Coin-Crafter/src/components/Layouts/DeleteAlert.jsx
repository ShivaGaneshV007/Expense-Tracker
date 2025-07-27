import React from "react";

const DeleteAlert = ({ content, onDelete, onCancel }) => {
  return (
    <div className="p-4 md:p-5 text-center">
      {/* Removed SVG icon as it's not in the new image */}
      <h3 className="mb-5 text-lg font-normal text-gray-500">
        {content}
      </h3>
      <div className="flex justify-end gap-4 mt-6"> {/* Changed justify-center to justify-end and added mt-6 */}
        {/* Removed Cancel button as it's not in the new image */}
        <button
          onClick={onDelete}
          type="button"
          // Updated styling to match the new image (purple filled button)
          className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
