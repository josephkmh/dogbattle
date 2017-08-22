import React from 'react';

export default class Battle extends React.Component {
  render() {
    return (
      <div>
        <h1>Battle!</h1>
        {this.props.playerOne.breed} vs. {this.props.playerTwo.breed}!
      </div>
    )
  }
}
