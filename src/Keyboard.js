import React, { Component } from 'react';

class Keyboard extends Component {
  constructor(props) {
    super(props);
  }
  handleKeyPress(e) {
    console.log('key pressed in keyboard ', e.target.value);
    this.props.handleKeyPress(e.target.value);
  }
  render() {
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
          {this.props.buttonKeys.map(key => (
            <button
              key={key}
              value={key}
              style={{ width: '1.5rem', height: '1.2rem', margin: '.1rem' }}
              onClick={e => this.handleKeyPress(e)}
            >
              {key}
            </button>
          ))}
        </div>
      </section>
    );
  }
}

export default Keyboard;
