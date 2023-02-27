import React, { useState } from "react";

const MaxInput = ({ label, placeholder, onChange, className }) => {
  
  const [inputValue, setInputValue] = useState("");
  
  const handleChange = (e) => {
    let inputText = e.target.value.trim();
    if (inputText == "") {
      setInputValue(inputText);
      onChange(null);
    } else {
      let value = parseInt(inputText);
      if (!isNaN(value) && value > 0) {
        setInputValue(value);
        onChange(value);
      } else {
        setInputValue(inputValue);
        onChange(inputValue);
      }
    }
  };

  return (
    <div className="flex-component">
      <label><span>{label}</span></label><br/>
      <input
        placeholder={placeholder}
        onChange={handleChange}
        className={className}
        value={inputValue}
      ></input>
    </div>
  );
};

export default MaxInput;
