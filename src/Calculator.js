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
      displayValue: '0',
      waitingForOperand: false,
      operator: null
    };
  }

  inputDigit = e => {
    const { waitingForOperand } = this.state;
    if (waitingForOperand) {
      this.setState({
        displayValue: e,
        waitingForOperand: false
      });
    } else {
      this.setState(prev => ({
        displayValue: prev.displayValue === '0' ? e : prev.displayValue + e
      }));
    }
  };

  inputDecimal = () => {
    const { waitingForOperand } = this.state;
    if (waitingForOperand) {
      this.setState({
        displayValue: '.',
        waitingForOperand: false
      });
    }
    this.setState(prev => ({
      displayValue:
        prev.displayValue.indexOf('.') === -1
          ? prev.displayValue + '.'
          : prev.displayValue
    }));
  };

  inputOperand = operand => {
    this.setState({
      waitingForOperand: true,
      operator: operand
    });
  };

  handleKeyPress = async e => {
    const { displayValue } = this.state;
    console.log('event in calc ', e);
    if (_.indexOf(operands, e) !== -1) {
      this.inputOperand(e);
    } else if (_.indexOf(fns, e) !== -1) {
      if (e === 'C') {
        this.setState({
          displayValue: '0'
        });
      }
    } else if (_.indexOf(nums, e) !== -1) {
      if (e === '.') {
        if (displayValue.indexOf('.') === -1) {
          this.inputDecimal();
        }
      } else {
        this.inputDigit(e);
      }
    }
  };

  render() {
    const { displayValue } = this.state;
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
        <Display displayValue={displayValue} />
        <Keyboard
          handleKeyPress={this.handleKeyPress}
          numKeys={nums}
          fnKeys={fns}
          operandKeys={operands}
        />
      </section>
    );
  }
}

export default Calculator;
