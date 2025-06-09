import { useState } from 'react';

const SearchableSelect = ({ name, placeholder, options, register, setValue }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const filteredOptions = options.filter(option => option.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleCitySelect = (selectedOption) => {
    setSearchTerm(selectedOption);          
    setValue(name, selectedOption);      
    setShowOptions(false);     
  };

  return (
    <div className="relative w-1/2">
      <input
        type="text"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          // setValue(name, e.target.value);
          setShowOptions(true);
        }}
        onFocus={() => setShowOptions(true)}
        onBlur={() => setTimeout(() => setShowOptions(false), 100)}
        required
      />

      {showOptions && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-y-auto shadow">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((city, i) => (
              <li
                key={i}
                onClick={() => handleCitySelect(city)}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                {city}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-sm text-gray-500">No results</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchableSelect;