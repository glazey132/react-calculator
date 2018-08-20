import React from 'react';

function Display(props) {
  return (
    <input
      type="text"
      name="displayInput"
      onChange={props.handleDisplayChange}
      value={props.displayValue}
      style={{ textAlign: 'right', marginTop: '.2rem', width: '14.75rem' }}
    />
  );
}

export default Display;
