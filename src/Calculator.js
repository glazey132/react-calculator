import React, { Component } from 'react';
import Display from './Display';
import Keyboard from './Keyboard';
import _ from 'lodash';

const nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const operands = ['+', '-', '*', '/'];
const fns = ['C', '='];

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayValue: '0'
    };
  }

  handleKeyPress(e) {
    console.log('event in calc ', e);
    if (_.indexOf(operands, e) !== -1) {
      console.log('is a operand', e);
    } else if (_.indexOf(fns, e) !== -1) {
      console.log('is a fn', e);
    } else if (_.indexOf(nums, e) !== -1) {
      console.log('is a num ', e);
    }
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
        <Keyboard
          handleKeyPress={this.handleKeyPress}
          buttonKeys={this.props.buttonKeys}
        />
      </section>
    );
  }
}

export default Calculator;
