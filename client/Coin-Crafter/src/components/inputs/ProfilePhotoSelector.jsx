import React, { useRef, useState, useEffect } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    let objectUrl;
    if (image) {
      objectUrl = URL.createObjectURL(image);
      setPreviewUrl(objectUrl);
    } else {
      setPreviewUrl(null);
    }
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [image]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const onChooseFile = () => {
    if (inputRef.current) inputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center justify-center mb-6 relative">
      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {/* Wrapper with relative to position button absolutely */}
      <div className="relative w-32 h-32">
        {/* Profile picture container */}
        <div
          className={`w-32 h-32 rounded-full flex items-center justify-center overflow-hidden border-2 shadow-sm
            ${
              previewUrl
                ? "border-gray-300 bg-transparent"
                : "border-violet-600 bg-violet-200"
            }
          `}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Profile Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <LuUser className="text-violet-600 text-8xl" />
          )}
        </div>

        {/* Upload OR Delete button positioned absolutely over profile pic circle */}
        {previewUrl ? (
          <button
            onClick={handleRemoveImage}
            type="button"
            className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center
              shadow-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            title="Remove Profile Picture"
            aria-label="Remove Profile Picture"
          >
            <LuTrash className="text-red-500 text-xl" />
          </button>
        ) : (
          <button
            onClick={onChooseFile}
            type="button"
            className="absolute -bottom-2 -right-2 w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center
              shadow-lg hover:bg-violet-700 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            title="Upload Profile Picture"
            aria-label="Upload Profile Picture"
          >
            <LuUpload className="text-white text-xl" />
          </button>
        )}
      </div>

      {/* Change Photo button visible only when photo selected */}
      {previewUrl && (
        <button
          type="button"
          onClick={onChooseFile}
          className="mt-2 text-violet-600 hover:underline text-sm"
        >
          Change Photo
        </button>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
