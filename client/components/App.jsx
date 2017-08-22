import React from 'react';
import Loading from './Loading.jsx';
import Home from './home/Home.jsx';
import Battle from './battle/Battle.jsx';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true
    }
    this.startBattle = this.startBattle.bind(this);
  }
  componentWillMount() {
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(r => r.json())
    .then(r => {
      const breedsArray = Object.keys(r.message).map(key => {
        return key
      });
      this.setState({
        loading: false,
        breeds: breedsArray
      });
    });
  }
  startBattle() {
    this.setState({
      loading: true
    });
    const i1 = Math.floor(Math.random() * this.state.breeds.length);
    let i2 = Math.floor(Math.random() * this.state.breeds.length);
    while( i1 === i2 ) i2 = Math.floor(Math.random() * this.state.breeds.length);
    const breeds = [this.state.breeds[i1], this.state.breeds[i2]];
    const url1 = `https://dog.ceo/api/breed/${breeds[0]}/images`;
    const url2 = `https://dog.ceo/api/breed/${breeds[1]}/images`;
    const fetchBreedPics = url => fetch(url)
      .then(r => r.json());
    Promise
      .all([url1, url2].map(fetchBreedPics))
      .then((data) => {
        console.log(data);
        const doggies = data.map((dog, i) => {
          return {
            breed: breeds[i],
            images: dog.message
          }
        });
        this.setState({
          playerOne: doggies[0],
          playerTwo: doggies[1],
          loading: false,
          battleOngoing: true
        });
      });
  }
  render() {
    if (!this.state.loading) {
        // Battle is ongoing
        if(this.state.battleOngoing) {
          return(
            <Battle
              playerOne={this.state.playerOne}
              playerTwo={this.state.playerTwo}
              />
          )
        }
        // No battle ongoing, but breed list has been loading
        return(
          <Home
            breeds={this.state.breeds}
            startBattle={this.startBattle}
          />
        )
    }
    // App still loading from API
    return(<Loading />)
  }
}
