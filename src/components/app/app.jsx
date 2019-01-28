import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import SwapiService from "../../services/swapi-service";
import {SwapiServiceProvider} from '../swapi-services-context';
import DummySwapiService from "../../services/dummy-swapi-service";
import { PeoplePage, StarShipPage, PlanetPage } from '../pages';
import {BrowserRouter as Router, Route} from "react-router-dom";



import './app.css';
import { StarshipDetails } from '../sw-components';

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
        <Router>
        <div className="stardb-app">
          <Header onServiceChange={this.onServiceChange}/>
          <RandomPlanet/> 

          <Route  path='/' 
          render={() => <h2>Welcome to StarDB </h2> }
          exact />
          <Route  path='/people/:id?' component ={PeoplePage} />
          <Route  path='/planets' component ={PlanetPage} />
          <Route  path='/starships' 
          component ={StarShipPage}
          exact />
          <Route  path='/starships/:id' 
          render={({match})=> {
            const {id} = match.params;
            
            return <StarshipDetails itemId = {id}/>
          }} />
          

        </div>
        </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
