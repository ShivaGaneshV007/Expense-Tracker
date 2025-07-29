// src/components/Modals/LogoutModal.js

import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm m-4 p-6 text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
          <FiAlertTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-medium leading-6 text-gray-900 mt-4">
          Confirm Logout
        </h3>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Are you sure you want to log out of your account?
          </p>
        </div>
        <div className="mt-6 flex justify-center gap-4">
          <button
            type="button"
            className="btn-secondary w-full"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-danger w-full"
            onClick={onConfirm}
          >
            Confirm Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;