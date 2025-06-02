import React, { useState, useRef, useEffect } from 'react';

const MultiSelectDropdown = ({ options, placeholder = "Select options", onChange, maxSelectable = Infinity }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    if (selectedOptions.includes(option)) {
      const updated = selectedOptions.filter(o => o !== option);
      setSelectedOptions(updated);
      onChange && onChange(updated);
    } else {
      if (selectedOptions.length < maxSelectable) {
        const updated = [...selectedOptions, option];
        setSelectedOptions(updated);
        onChange && onChange(updated);
      }
    }
  };

  const handleRemove = (option) => {
    const updated = selectedOptions.filter(o => o !== option);
    setSelectedOptions(updated);
    onChange && onChange(updated);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-72" ref={dropdownRef}>
      <div
        className="border border-gray-300 rounded px-3 py-2 bg-white cursor-pointer flex flex-wrap gap-2 items-center"
        onClick={toggleDropdown}
      >
        {selectedOptions.length === 0 ? (
          <span className="text-gray-400">{placeholder}</span>
        ) : (
          selectedOptions.map((option) => (
            <span
              key={option}
              className="bg-blue-100 text-blue-700 text-sm px-2 py-1 rounded flex items-center"
            >
              {option}
              <button
                className="ml-1 text-blue-500 hover:text-blue-700"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(option);
                }}
              >
                &times;
              </button>
            </span>
          ))
        )}
        <span className="ml-auto text-gray-500">{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${selectedOptions.includes(option) ? 'bg-blue-50 text-blue-600' : ''
                }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;