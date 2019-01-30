import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import SwapiService from "../../services/swapi-service";
import {SwapiServiceProvider} from '../swapi-services-context';
import DummySwapiService from "../../services/dummy-swapi-service";
import { PeoplePage, StarShipPage, PlanetPage, SecretPage, LoginPage } from '../pages';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import  StarshipDetails from '../sw-components/starship-details';


import './app.css';


export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    swapiService: new SwapiService(),
    isLoggedIn:false
  };

  onLogin = () =>{
    this.setState({
      isLoggedIn:true
    });
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

    const {isLoggedIn} = this.state;
     return (
      <ErrorBoundry>
        <SwapiServiceProvider value = {this.state.swapiService}>
        <Router>
        <div className="stardb-app">
          <Header onServiceChange={this.onServiceChange}/>
          <RandomPlanet/> 
          <Switch>
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
            <Route 
            path='/login'
            render = {() => (
                <LoginPage 
                isLoggedIn={isLoggedIn}
                onLogin={this.onLogin}/>
            )} />
            <Route 
            path='/secret'
            render = {() => (
              <SecretPage isLoggedIn={false}/>
            )} />
             
              <Route render={() => <h2> Page not found </h2> } />
             </Switch>
        </div>
        </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
