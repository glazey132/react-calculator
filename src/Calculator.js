import React, { Component } from 'react';
import Display from './Display';

class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      displayValue: '0'
    };
  }
  render() {
    return (
      <section
        style={{
          border: '1px solid darkgrey',
          width: '10rem',
          height: '10rem',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
        <Display displayValue={this.state.displayValue} />
      </section>
    );
  }
}

export default Calculator;
