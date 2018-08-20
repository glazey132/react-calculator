import React, { Component } from 'react';

class Calculations extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <section
        style={{
          backgroundColor: 'aliceblue',
          border: '1px solid darkgrey',
          width: '20rem',
          height: '20rem',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'scroll'
        }}
      >
        <h5>10 most recent Calculations: </h5>{' '}
        <ol>
          {this.props.calculations.map(calc => (
            <li style={{ flex: '1' }} key={calc.timestamp}>
              {calc.computation} - {calc.timestamp}
            </li>
          ))}
        </ol>
      </section>
    );
  }
}

export default Calculations;
