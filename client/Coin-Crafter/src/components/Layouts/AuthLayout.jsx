import React from "react";
import CARD_2 from "../../assets/images/card2.jpeg";
import { LuTrendingUpDown } from "react-icons/lu";

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div
      className={`flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-300 ${color}`}
    >
      <div className="w-12 h-12 flex items-center justify-center bg-purple-700 rounded-full">
        {/* Explicit size and color for icon */}
        {React.cloneElement(icon, { size: 26, color: "white" })}
      </div>
      <div>
        <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
        <span className="text-[20px] font-semibold">{value}</span>
      </div>
    </div>
  );
};

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Left side content */}
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black text-center pr-40">Expense Tracker</h2>
        {children}
      </div>

      {/* Right side content */}
      <div className="hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat relative">
        {/* Decorative rounded boxes */}
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5"></div>
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-5"></div>
        <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -right-5"></div>

        {/* Stats card */}
        <div className="grid grid-cols-1 z-20 relative">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Income & Expenses"
            value="430,000"
            color="bg-purple-100"
          />
        </div>

        {/* Image */}
        <img
          src={CARD_2}
          alt="Card"
          className="w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-400/10"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
