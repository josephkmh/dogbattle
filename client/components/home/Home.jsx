import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }
  render() {
    return (
      <div>
        <h1>DogBattle</h1>
        <p>Let's get ready to rumble!</p>
        <button onClick={this.props.startBattle}>START</button>
      </div>
    )
  }
}
