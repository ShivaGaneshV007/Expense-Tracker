import React from "react";
import CARD_2 from "../../assets/images/card2.jpeg";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-indigo-50 to-white transition-all duration-500 ease-in-out">
      {/* Left Side - Branding */}
      <div className="hidden md:flex flex-col justify-center items-center w-[40vw] bg-gradient-to-br from-purple-800 to-indigo-800 text-white p-10 space-y-6 shadow-lg">
        <h1 className="text-4xl font-bold tracking-widest animate-fade-in-down">
          Coin Crafter
        </h1>
        <p className="text-lg text-purple-200 text-center px-4">
          Crafting smarter financial journeys. Secure. Fast. Powerful.
        </p>
        <img
          src={CARD_2}
          alt="Brand"
          className="w-72 h-auto rounded-xl shadow-lg border border-white/20 animate-fade-in-up"
        />
      </div>

      {/* Right Side - Auth Content */}
      <div className="w-full md:w-[60vw] p-8 md:p-16 animate-slide-in-right">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
