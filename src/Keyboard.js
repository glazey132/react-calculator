import React, { Component } from 'react';

function Keyboard(props) {
  return (
    <section
      style={{
        border: '1px solid darkgrey',
        width: '15rem',
        height: '15rem',
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
            style={{
              width: '3.5rem',
              height: '2.2rem',
              margin: '.11rem',
              borderRadius: '1rem'
            }}
            onClick={e => props.handleKeyPress(e.target.value)}
          >
            {key}
          </button>
        ))}
        {props.operatorKeys.map(key => (
          <button
            key={key}
            value={key}
            style={{
              width: '3.5rem',
              height: '2.2rem',
              margin: '.11rem',
              borderRadius: '1rem'
            }}
            onClick={e => props.handleKeyPress(e.target.value)}
          >
            {key}
          </button>
        ))}
        {props.fnKeys.map(key => (
          <button
            key={key}
            value={key}
            style={{
              width: '3.5rem',
              height: '2.2rem',
              margin: '.11rem',
              borderRadius: '1rem'
            }}
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
