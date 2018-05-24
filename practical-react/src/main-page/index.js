'use strict';

import React, { Component } from 'react';
import AppPresentation from './app-presentation';

class App extends Component {
    state = {};

    componentDidMount() {
      this.fetchHouses();
    }

    componentDidCatch(error, info) {
        this.setState({hasError: true});

    }

    fetchHouses = () => {
    fetch('/houses.json')
    .then(resp => resp.json())
    .then(allHouses => {
      this.allHouses = allHouses;
      this.determineFeaturedHouse();
      this.determineUniqueCountries();
    })
  }

  determineFeaturedHouse = () => {
    if(this.allHouses){
      const randomIndex = Math.floor(Math.random() * this.allHouses.length);
      const featuredHouse = this.allHouses[randomIndex];
      this.setState({featuredHouse});
    }
  }

  determineUniqueCountries = () => {
    const countries =this.allHouses ? Array.from(new Set(this.allHouses.map(h=> h.country))): [];
    countries.unshift(null);

    this.setState({countries});
  }

  filterHouses = (country) => {
    this.setState({activeHouse: null});
    const filteredHouses = this.allHouses.filter((h)=> h.country === country);
    this.setState({filteredHouses, country});
  }

  setActiveHouse = (house) => {
      this.setState({activeHouse: house});
  }

  render() {
    return (
      <AppPresentation
        country={this.state.country} 
        filteredHouses={this.state.filteredHouses}
        setActiveHouse={this.setActiveHouse}
        house={this.state.activeHouse}
        house={this.state.featuredHouse}
        countries={this.state.countries} 
        filterHouses={this.filterHouses}/>
    );
  }
}

export default App;
