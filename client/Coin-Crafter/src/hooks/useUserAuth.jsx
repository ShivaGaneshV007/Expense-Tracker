import { useEffect } from "react";
import { useUser } from "../context/userContext"; // Import the custom hook
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/ApiPaths";

export const useUserAuth = () => {
  const { user, updateUser, clearUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. If the user is already loaded in our context, we don't need to do anything.
    if (user) {
      return;
    }

    // 2. Check if a token exists in local storage.
    const token = localStorage.getItem("token");

    // 3. If no token exists, the user is not logged in. Redirect them.
    if (!token) {
      clearUser();
      navigate("/login");
      return;
    }

    // 4. If a token exists, validate it by fetching the user's data.
    const fetchUserInfo = async () => {
      try {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
        updateUser(response.data);
      } catch (error) {
        console.error("Token validation failed:", error);
        // If the token is invalid, clear it and redirect to login.
        clearUser();
        navigate("/login");
      }
    };

    fetchUserInfo();
  }, [user, updateUser, clearUser, navigate]);
};