import React, { Component } from 'react';

function Keyboard(props) {
  return (
    <section
      style={{
        border: '1px solid darkgrey',
        width: '8rem',
        height: '8rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        backgroundColor: 'antiqueWhite'
      }}
    >
      <div style={{ margin: '.1rem' }}>
        {props.numKeys.map(key => (
          <button
            key={key}
            value={key}
            style={{ width: '1.5rem', height: '1.2rem', margin: '.1rem' }}
            onClick={e => props.handleKeyPress(e.target.value)}
          >
            {key}
          </button>
        ))}
        {props.fnKeys.map(key => (
          <button
            key={key}
            value={key}
            style={{ width: '1.5rem', height: '1.2rem', margin: '.1rem' }}
            onClick={e => props.handleKeyPress(e.target.value)}
          >
            {key}
          </button>
        ))}
        {props.operandKeys.map(key => (
          <button
            key={key}
            value={key}
            style={{ width: '1.5rem', height: '1.2rem', margin: '.1rem' }}
            onClick={e => props.handleKeyPress(e.target.value)}
          >
            {key}
          </button>
        ))}
      </div>
    </section>
  );
}

export default Keyboard;
