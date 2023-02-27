import React from "react";

const Gallery = ({ data , visible}) => {
  return (
    <div className="flex-container">
      <ul>
        {visible && data.map((data, index) => (
          <li key={index}>
            {index + 1}. <b>{data.manufacturer}</b> <i>{data.model}</i> - $
            {data.price} - {data.odometer}km{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Gallery;
