import React from "react";

const CarMakeDropdown = ({
  label,
  placeholder,
  data,
  onCarMakeChange,
  className,
}) => {

  data.sort();

  const handleChange = (e) => {
    onCarMakeChange(e.target.value);
  };

  return (
    <div className="flex-component">
      <label><span>{label}</span></label><br/>
      <select className={className} name="make" onChange={handleChange} defaultValue={placeholder}>
        <option value="-1">{placeholder}</option>
        {data.map((d) => (
          <option value={d}>{d}</option>
        ))}       
      </select>
    </div>
  );
};

export default CarMakeDropdown;
