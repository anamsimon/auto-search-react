import React, { useEffect } from "react";

const CarModelDropdown = ({
  label,
  placeholder,
  data,
  onCarModelChange,
  className,
}) => {

  data.sort();
  
  const handleChange = (e) => {
    onCarModelChange(e.target.value);
  };

  return (
    <div className="flex-component">
     <label><span>{label}</span></label><br/>
      <select
        className={className}
        name="Model"
        onChange={handleChange}
        disabled={data.length == 0 ? "disabled" : ""} defaultValue={placeholder}
      >
        <option value="-1" >
          {placeholder}
        </option>
        {data.map((d) => (
          <option value={d}>{d}</option>
        ))}
      </select>
    </div>
  );
};

export default CarModelDropdown;
