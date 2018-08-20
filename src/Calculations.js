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
          flexDirection: 'column'
        }}
      >
        <p>calculations section </p>
      </section>
    );
  }
}

export default Calculations;
