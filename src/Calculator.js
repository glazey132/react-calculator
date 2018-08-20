import React, { Component } from 'react';
import Display from './Display';
import Keyboard from './Keyboard';
import _ from 'lodash';

const nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const operators = ['+', '-', '*', '/'];
const fns = ['C', '='];

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayValue: '0',
      waitingForOperand: false,
      operator: null,
      value: null
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

  inputOperator = newOperator => {
    const operations = {
      '+': (prevValue, newValue) => prevValue + newValue,
      '-': (prevValue, newValue) => prevValue - newValue,
      '*': (prevValue, newValue) => prevValue * newValue,
      '/': (prevValue, newValue) => prevValue / newValue,
      '=': (prevValue, newValue) => newValue
    };

    const { displayValue, operator, value } = this.state;
    const nextValue = parseFloat(displayValue);

    if (value === null) {
      this.setState({
        value: nextValue
      });
    } else if (operator) {
      const currentValue = value || 0;
      const computed = operations[operator](currentValue, nextValue);

      this.setState({
        value: computed,
        displayValue: String(computed)
      });
    }
    this.setState({
      waitingForOperand: true,
      operator: newOperator
    });
  };

  clearDisplay = () => {
    this.setState({
      displayValue: '0',
      value: null
    });
  };

  handleKeyPress = async e => {
    const { displayValue } = this.state;
    console.log('event in calc ', e);
    if (_.indexOf(operators, e) !== -1) {
      this.inputOperator(e);
    } else if (_.indexOf(fns, e) !== -1) {
      if (e === 'C') {
        this.clearDisplay();
      } else if (e === '=') {
        this.inputOperator(e);
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
          backgroundColor: 'aliceblue',
          border: '1px solid darkgrey',
          width: '20rem',
          height: '20rem',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
        <Display displayValue={displayValue} />
        <Keyboard
          handleKeyPress={this.handleKeyPress}
          numKeys={nums}
          fnKeys={fns}
          operatorKeys={operators}
        />
      </section>
    );
  }
}

export default Calculator;
