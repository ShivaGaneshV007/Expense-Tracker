"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import AuthLayout from "../../components/layouts/AuthLayout"
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector"
import { validateEmail, validatePassword } from "../../utils/helper"
import { API_PATHS } from "../../utils/ApiPaths"
import axiosInstance from "../../utils/axiosInstance"
import uploadImage from "../../utils/uploadImage"
import { UserContext } from "../../context/userContext"
import { useContext } from "react"
import { LuUser, LuMail, LuLock, LuEye, LuEyeOff } from "react-icons/lu"

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Error states
  const [fullNameError, setFullNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [generalError, setGeneralError] = useState(null)

  const { updateUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    setFullNameError("")
    setEmailError("")
    setPasswordError("")
    setGeneralError(null)

    let valid = true

    if (!fullName.trim()) {
      setFullNameError("Full name is required.")
      valid = false
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.")
      valid = false
    }
    const passwordErrors = validatePassword(password)
    if (passwordErrors.length > 0) {
      setPasswordError(passwordErrors.join(" "))
      valid = false
    }

    if (!valid) {
      setIsLoading(false)
      return
    }

    try {
      let profileImageUrl = ""

      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic)
        profileImageUrl = imgUploadRes.imageUrl || ""
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      })

      const { token, user } = response.data

      if (token) {
        localStorage.setItem("token", token)
        updateUser(user)
        navigate("/dashboard")
      }
    } catch (error) {
      console.error("Error during signup:", error)
      if (error.response && error.response.data.message) {
        setGeneralError(error.response.data.message)
      } else {
        setGeneralError("Something went wrong. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Create Account</h2>
          <p className="text-slate-600">Join thousands of users managing their finances</p>
        </div>

        {generalError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl fade-in">
            {generalError}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-5">
          <div className="flex justify-center mb-6">
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
            <div className="relative">
              <LuUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 text-slate-700"
              />
            </div>
            {fullNameError && <p className="text-red-500 text-sm mt-1 fade-in">{fullNameError}</p>}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
            <div className="relative">
              <LuMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 text-slate-700"
              />
            </div>
            {emailError && <p className="text-red-500 text-sm mt-1 fade-in">{emailError}</p>}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
            <div className="relative">
              <LuLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                className="w-full pl-10 pr-12 py-3 bg-white border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 text-slate-700"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
              </button>
            </div>
            {passwordError && <p className="text-red-500 text-sm mt-1 fade-in">{passwordError}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="loading-spinner"></div>
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="text-center">
          <p className="text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-700 font-medium hover:underline transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}

export default SignUp
