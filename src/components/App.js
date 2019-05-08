import React, { Component } from 'react';
import './styles/App.css';

const capitalize = ([first, ...rest]) =>
  `${first.toUpperCase()}${rest.join('')}`;

const getJson = url => fetch(url).then(r => r.json());

const shortPokeDescription = ({ name, id, sprites: { front_default } }) => ({
  name: capitalize(name),
  id,
  url: front_default,
})

class App extends React.Component {
  state = {
    loading: true,
    pokemonList: []
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

  render() {
    const { loading, pokemonList } = this.state;
    return (
      <div>
        {!loading && pokemonList.length > 0
          ? pokemonList.map(({ name, url, id }) => (
            <div key={name}>
              {id}
              <p>
                {name}
                <br />
                <img alt={name} src={url} />
              </p>
            </div>
          ))
          : null}
      </div>
    );
  }
}

export default App;