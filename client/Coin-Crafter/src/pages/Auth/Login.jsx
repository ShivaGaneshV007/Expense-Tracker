import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout"; // fixed import path (no space)
import { useNavigate } from "react-router-dom";

// Assuming you have an Input component, else you can replace with <input />
import Input from "../../components/common/Input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Handle Login Form Submit
  const handleLogin = async (e) => {
    e.preventDefault();

    // Simple validation example
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      // TODO: Add your login API call here
      // Example:
      // const response = await loginApi(email, password);
      // localStorage.setItem("token", response.token);

      // For demo, navigate to dashboard on "success"
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to log in
        </p>

        {error && <p className="text-red-600 mb-3">{error}</p>}

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="email"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="********"
            type="password"
          />

          <button
            type="submit"
            className="mt-4 w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
          >
            Log In
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
