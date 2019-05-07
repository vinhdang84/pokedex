import React, { Component } from 'react';
import './styles/App.css';

class App extends Component {
  state = {
    loading: true,
    pokemon: [],
  };

  async componentDidMount() {

    fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
      .then(response => response.json())
      .then(parsedJson => parsedJson.results.map(pokemon => (
        {
          name: `${pokemon.name}`.charAt(0).toUpperCase() + `${pokemon.name}`.slice(1),
          url: `${pokemon.url}`.split('/').slice(6, -1)
        }
      )))
      .then(pokemonList => this.setState({
        pokemonList,
        loading: false
      }))
      .then()
      .catch(error => console.log('parsing failed', error))
  }

  render() {
    const { loading, pokemonList } = this.state;
    return (
      <div>
        {
          !loading && pokemonList.length > 0 ? pokemonList.map(pokemon => {
            const { name, url } = pokemon;
            const SPRITE_URL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${url}.png`;

            return <div key={name}>
              {url}
              <p>
                {name}
                <br />
                <img alt={name} src={SPRITE_URL} />
              </p>

            </div>
          }) : null
        }
      </div>
    );
  }
}


export default App;