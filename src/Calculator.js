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
      <div className="">
        <Display displayValue={this.state.displayValue} />
      </div>
    );
  }
}

export default Calculator;
