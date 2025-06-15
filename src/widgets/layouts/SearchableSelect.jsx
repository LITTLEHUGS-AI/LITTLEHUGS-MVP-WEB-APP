import { useCallback, useEffect, useState } from 'react';

const SearchableSelect = ({ name, className, placeholder, inputCss, options, key1, key2, defaultValue, onChnageType, setValue }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showOptions, setShowOptions] = useState(false);


  const setDefault = useCallback(() => {
    if (defaultValue && onChnageType && options.length > 0) {
      if (key1 && key2) {
        const defaultV = options.filter(
          option => option[key2].toLowerCase() === defaultValue.toLowerCase()
        );
        if (defaultV.length > 0) setSearchTerm(defaultV[0][key1]);
      } else {
        const defaultV = options.filter(
          option => option.toLowerCase() === defaultValue.toLowerCase()
        );
        if (defaultV.length > 0) setSearchTerm(defaultV[0]);
      }
    }
    else if (defaultValue && options.length > 0) {
      const defaultV = options.filter(
        option => option.toLowerCase() === defaultValue.toLowerCase()
      );
      if (defaultV.length > 0) setSearchTerm(defaultV[0]);
    }
  }, [defaultValue, onChnageType, options, key1, key2, setSearchTerm]);


  useEffect(() => { if (defaultValue) setDefault(); }, [defaultValue, setDefault])

  let filteredOptions = [];
  if (key1 !== undefined) { filteredOptions = options.filter(option => option[key1].toLowerCase().includes(searchTerm.toLowerCase())); }
  else { filteredOptions = options.filter(option => option.toLowerCase().includes(searchTerm.toLowerCase())); }

  const handleOptionSelect = (selectedOption) => {
    if (key1) {

      if (onChnageType) {
        const target = {};
        target.target = {};
        target.target.name = name;
        target.target.value = selectedOption[key2];
        setSearchTerm(selectedOption[key1]);
        setValue(target);
      }
      else {
        setSearchTerm(selectedOption[key1]);
        setValue(name, selectedOption[key2]);
      }

    } else {

      if (onChnageType) {
        const target = {};
        target.target = {};
        target.target.name = name;
        target.target.value = selectedOption;
        setSearchTerm(selectedOption);
        setValue(target);
      }
      else {
        setSearchTerm(selectedOption);
        setValue(name, selectedOption);
      }

    }
    setShowOptions(false);
  };


  return (
    <div className={className}>
      <input
        type="text"
        placeholder={(typeof placeholder === 'string') ? placeholder : ''}
        className={`${inputCss ? inputCss : "w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600"}`}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowOptions(true);
        }}
        onFocus={() => setShowOptions(true)}
        onBlur={() => setTimeout(() => setShowOptions(false), 100)}
        required
      />

      {showOptions && (
        <ul className={`absolute z-10 ${className} bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-y-auto shadow`}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, i) => (
              <li
                key={i}
                onMouseDown={() => handleOptionSelect(option)}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                {key1 !== undefined ? option[key1] : option}
              </li>
            ))
          ) : (
            <li q className="px-4 py-2 text-sm text-gray-500">No results</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchableSelect;