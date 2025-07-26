import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Components & Layouts
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";

// Utils & Helpers
import { validateEmail, validatePassword } from "../../utils/helper";

import { API_PATHS } from "../../utils/ApiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";


const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error states
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  

  const handleSignUp = async (e) => {
    e.preventDefault();

    setFullNameError("");
    setEmailError("");
    setPasswordError("");
    setGeneralError(null);

    let valid = true;

    if (!fullName.trim()) {
      setFullNameError("Full name is required.");
      valid = false;
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      setPasswordError(passwordErrors.join(" "));
      valid = false;
    }

    if (!valid) {
      return;
    }

    try {
      let profileImageUrl = "";

      // Step 1: Upload image if present
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      // Step 2: Register user with text data and image URL
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl, // Send the URL, not the file
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setGeneralError(error.response.data.message);
      } else {
        setGeneralError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>

        {generalError && (
          <p className="text-red-600 mb-3">{generalError}</p>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div>
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="Shiva"
              type="text"
            />
            {fullNameError && (
              <p className="text-red-600 text-xs mt-1 ml-1">{fullNameError}</p>
            )}
          </div>

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
            Sign Up
          </button>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;