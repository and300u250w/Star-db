import React, {Component} from 'react';
import Row from '../row/row';
import Header from '../header/header';
import RandomPlanet from '../random-planet/random-planet';
import SwapiService from '../../services/swapi-service';
import ErrorButton from '../error-button/error-button';
import './app.css';
import ErrorIndicator from '../error-indicator/error-indicator';
import PeoplePage from '../people-page/people-page';
import ErrorBoundry from '../error-boundry/error-boundry';
import ItemDetails from '../item-details/item-details';
import PersonDetails from '../person-details/person-details';


export default class App extends Component {


  swapiService = new SwapiService();

    state = {
        hasError: false
    }

    componentDidCatch() {
        console.log('componentDidCatch()');
        this.setState({hasError: true});

    }

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator/>
        }

        const personDetails = <PeoplePage itemId={11}/>;
        const starshipDetails = <PersonDetails itemId={3}/>;
        return (
            <ErrorBoundry>
                <div className='startdb-app'> 
                    <Header/>
                    <Row
                        // left ={personDetails}
                        // right = {starshipDetails}
                        />
    
                </div>
            </ErrorBoundry>

            
        );
    };
}