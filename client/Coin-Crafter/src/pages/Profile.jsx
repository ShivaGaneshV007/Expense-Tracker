// src/pages/Profile.js

import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/userContext';
import axiosInstance from '../utils/axiosInstance'; // Your configured axios instance
import { API_PATHS } from '../utils/ApiPaths';
import DashboardLayout from '../components/layouts/DashboardLayout';
import ProfilePhotoSelector from '../components/inputs/ProfilePhotoSelector';
import { LuUser } from 'react-icons/lu';

const Profile = () => {
  const { user, updateUser } = useContext(UserContext);

  // State for form fields
  const [fullName, setFullName] = useState('');
  const [profilePicFile, setProfilePicFile] = useState(null); // Holds the file object
  const [profilePicUrl, setProfilePicUrl] = useState(''); // Holds the display URL

  // State for UI feedback
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Populate form with user data on load
  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '');
      setProfilePicUrl(user.profileImageUrl || '');
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!fullName.trim()) {
      setError('Full name cannot be empty.');
      return;
    }

    setIsLoading(true);

    // Use FormData because we are uploading a file
    const formData = new FormData();
    formData.append('fullName', fullName);

    // Only append the file if a new one was selected
    if (profilePicFile) {
      formData.append('profilePic', profilePicFile);
    }

    try {
      // The backend route is PUT /api/user/profile
      const response = await axiosInstance.put(API_PATHS.USER.UPDATE_PROFILE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data) {
        // Update the global user context with the new data from the server
        updateUser(response.data);
        setSuccess('Profile updated successfully!');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An error occurred. Please try again.';
      setError(errorMessage);
      console.error('Update failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout activeMenu="Profile">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Edit Profile</h2>

          {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">{error}</div>}
          {success && <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">{success}</div>}

          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="flex justify-center">
              <ProfilePhotoSelector
                image={profilePicFile}
                setImage={setProfilePicFile} // This should set the file object
                initialImageUrl={profilePicUrl}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
              <div className="relative">
                <LuUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <input
                type="email"
                value={user?.email || ''}
                readOnly
                className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed"
              />
            </div>

            <div className="flex justify-end">
              <button type="submit" disabled={isLoading} className="btn-primary">
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;