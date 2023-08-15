import React from 'react';
import './Filter.css'; // Import the CSS file for styling

const Filter = ({ filter_task }) => {
  return (
    <div className="filter-container">
      <select
        className="filter-select"
        onChange={e => {
          console.log("Selected value:", e.target.value); // Check the selected value
          filter_task(e.target.value);
        }}
      >
        <option className="filter-option" value="Active">Profile</option>
        <option className="filter-option" value="Completed">Password Change</option>
        <option className="filter-option" value="Completed">Edit Profile</option>
      </select>
    </div>
  );
};

export default Filter;
