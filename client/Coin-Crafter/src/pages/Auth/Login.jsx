import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import { validateEmail ,validatePassword} from "../../utils/helper";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { API_PATHS } from "../../utils/ApiPaths";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Separate error states for inputs
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset errors first
    setEmailError("");
    setPasswordError("");
    setError(null);

    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }

    if (!password) {
      setError("Please enter a password.");
      return;
      valid=false;
    }
  

    if (!valid) return;

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;

      if(token){
        localStorage.setItem("token",token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      } else{
        setError("Something else went wrong. Please try again.");
      }
      
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

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="email"
            />
            {emailError && (
              <p className="text-red-600 text-xs mt-1 ml-1">{emailError}</p>
            )}
          </div>

          <div>
            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="********"
              type="password"
            />
            {passwordError && (
              <p className="text-red-600 text-xs mt-1 ml-1">{passwordError}</p>
            )}
          </div>

          <button
            type="submit"
            className="mt-2 w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
          >
            Log In
          </button>

          <p className="text-sm text-center mt-4">
            Don&apos;t have an account?{" "}
            <Link className="text-blue-600 hover:underline" to="/signup">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
