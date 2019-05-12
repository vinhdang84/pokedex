import React, { Component } from 'react';
import './sass/app.scss';

const capitalize = ([first, ...rest]) =>
  `${first.toUpperCase()}${rest.join('')}`;

const getJson = url => fetch(url).then(r => r.json());

const shortPokeDescription = ({ name, id, sprites: { front_default } }) => ({
  name: capitalize(name),
  id,
  url: front_default,
})

const Pokemon = (props) => <h4>{props.pokemon.name}</h4>

class App extends Component {
  state = {
    loading: true,
    pokemonList: [],
    pokes: []
  };

  async componentDidMount() {
    getJson('https://pokeapi.co/api/v2/pokemon/?limit=151')
      .then(({ results: pokes }) => Promise.all(pokes.map(({ url }) => getJson(url))))
      .then(pokes => pokes.map(shortPokeDescription))
      .then(pokemonList =>
        this.setState({
          pokemonList,
          loading: false
        })
      )
      .catch(error => console.log('parsing failed', error));
  }

  filter(e) {
    this.setState({ filter: e.target.value })
  }

  render() {
    let pokemons = this.state.pokemonList;
    let loading = this.state.loading;
    if (this.state.filter) {
      pokemons = pokemons.filter(pokemon =>
        pokemon.name.toLowerCase()
          .includes(this.state.filter.toLowerCase())
      )
    }

    return (
      <div>
        <div className="search">
          <input text="text"
            onChange={this.filter.bind(this)} />
        </div>
        <div>
          {!loading && pokemons.length > 0
            ? pokemons.map(({ name, url, id }) => (
              <h4 key={name} className="poke-card" >
                <img alt={name} src={url} />
                <br />
                {name}
              </h4>
            ))
            : null}
        </div>
      </div >
    );
  }
}

export default App;