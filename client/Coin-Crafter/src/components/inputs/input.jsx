import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="mb-3">
      {label && <label className="block text-[13px] text-slate-800 mb-1">{label}</label>}
      <div className="relative flex items-center input-box border border-slate-300 rounded px-2 py-1">
        <input
          type={inputType}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none pr-8"
          value={value}
          onChange={onChange}
        />
        {type === 'password' && (
          <span onClick={toggleShowPassword} className="absolute right-2 cursor-pointer text-slate-600">
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
