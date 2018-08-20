import React from 'react';

function Display(props) {
  return (
    <input
      type="text"
      name="displayInput"
      onChange={props.handleDisplayChange}
      value={props.displayValue}
      style={{ textAlign: 'right' }}
    />
  );
}

export default Display;
