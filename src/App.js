import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Calculator from './Calculator';
import Calculations from './Calculations';
import io from 'socket.io-client';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io('react-calculator-69586.herokuapp.com:8080'),
      calculations: []
    };

    this.state.socket.on('calculationsUpdate', calcs => {
      this.setState({
        calculations: calcs
      });
    });
  }

  componentDidMount() {
    this.state.socket.emit('mount');
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <section
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '1rem',
            backgroundColor: 'lightgrey',
            border: '1px solid black',
            width: '40rem',
            height: '43rem'
          }}
        >
          <Calculator socket={this.state.socket} />
          <Calculations
            socket={this.state.socket}
            calculations={this.state.calculations}
          />
        </section>
      </div>
    );
  }
}

export default App;
