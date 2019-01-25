import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';

import SwapiService from "../../services/swapi-service";
import {SwapiServiceProvider} from '../swapi-services-context';
import DummySwapiService from "../../services/dummy-swapi-service";

import { 
  PeoplePage,
  StarShipPage,
  PlanetPage
} from '../pages';

import './app.css';

export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    swapiService: new SwapiService()
  };

  onServiceChange = () =>{
    this.setState(({swapiService}) => {
      const Service = swapiService instanceof SwapiService ?
                      DummySwapiService : SwapiService;
      console.log("swithced to, ", Service.name);
           return {
             swapiService: new Service()
           }           
    })
  }
  render() {
     return (
      <ErrorBoundry>
        <SwapiServiceProvider value = {this.state.swapiService}>
        <div className="stardb-app">
          <Header onServiceChange={this.onServiceChange}/>
          <RandomPlanet/> 
          <PeoplePage/>
          <PlanetPage/>
           <StarShipPage/>

        </div>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
