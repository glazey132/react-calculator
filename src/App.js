import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Calculator from './Calculator';

class App extends Component {
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
            height: '40rem'
          }}
        >
          <Calculator />
        </section>
      </div>
    );
  }
}

export default App;
