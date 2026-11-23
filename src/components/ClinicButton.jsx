import React from 'react';

const ClinicButton = ({ onClick, children, disabled = false, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="bg-blue-600 text-white px-5 py-2.5 rounded-md text-base font-medium
                 cursor-pointer transition-colors
                 hover:bg-blue-700
                 disabled:bg-blue-300 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
};

export default ClinicButton;