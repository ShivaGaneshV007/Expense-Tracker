import React, { useState, useEffect, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react'; // Ensure installed
import { LuImage, LuX } from 'react-icons/lu';

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef(null);

  // Handle clicks outside the emoji picker to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-4 relative">
      {/* Icon display */}
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-12 h-12 flex items-center justify-center border rounded-full bg-gray-100 overflow-hidden">
          {icon ? (
            <img
              src={typeof icon === 'string' && icon.startsWith('http') ? icon : ''}
              alt="Selected Icon"
              className="w-full h-full object-cover"
            />
          ) : (
            <LuImage className="text-gray-500 text-2xl" />
          )}
        </div>
        <p className="text-gray-700">{icon ? 'Change Icon' : 'Pick Icon'}</p>
      </div>

      {/* Emoji Picker */}
      {isOpen && (
        <div ref={pickerRef} className="relative z-10">
          {/* Close button */}
          <button
            className="w-7 h-7 flex items-center justify-center bg-red-500 text-white rounded-full absolute -top-3 -right-3 shadow-md"
            onClick={() => setIsOpen(false)}
            aria-label="Close emoji picker"
          >
            <LuX className="text-lg" />
          </button>

          {/* Picker itself */}
          <EmojiPicker
            open={isOpen}
            onEmojiClick={(emojiData) => {
              // Choose image URL if available, fallback to emoji unicode
              const selected = emojiData?.imageUrl || emojiData?.emoji;
              onSelect(selected);
              setIsOpen(false);
            }}
            lazyLoadEmojis={true}
            height={350}
            width={300}
            theme="light"
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;