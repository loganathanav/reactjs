'use strict';

import React, { Component } from 'react';
import logo from './logo.svg';
import './main-page.css';
import Header from './header';
import FeaturedHouse from './featured-house';
import HouseFilter from './house-filter';
import SearchResults from '../search-results';
import HouseDetail from '../house';

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
    let activeComponent = null;

    if(this.state.country) {
      activeComponent = <SearchResults country={this.state.country} filteredHouses={this.state.filteredHouses}
          setActiveHouse={this.setActiveHouse}/>;
    }

    if(this.state.activeHouse) {
      activeComponent = <HouseDetail house={this.state.activeHouse} />;
    }


    if(!activeComponent) {
      activeComponent = <FeaturedHouse house={this.state.featuredHouse}/>;
    }


    if(this.state.hasError) {
      return <h1>Whoops! Something went wrong! Sorry for the inconvenience! </h1>;
    }

    return (
      <div className="container">
        <Header subtitle="Provisioning houses all over the world."/>
        <HouseFilter countries={this.state.countries} filterHouses={this.filterHouses}/>
        {activeComponent}
      </div>
    );
  }
}

export default App;
