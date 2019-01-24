import React, {Component} from 'react';
import ItemList from '../item-list/item-list';
import PersonDetails from '../person-details/person-details';

import SwapiService from '../../services/swapi-service';
import Row from '../row/row'
import ErrorBoundry from '../error-boundry/error-boundry';
import './people-page.css';


export default class PeoplePage extends Component {

    swapiService = new SwapiService();

    state = {
        selectedPerson: 4

    };

    componentDidCatch(error, info) {
        debugger;
        this.setState({hasError: true})
    }

    onPersonSelected = (id) => {
        this.setState({selectedPerson: id})
    }

    render() {

        const itemList = (
            <ItemList onItemsSelected={this.onPersonSelected} getData={this.props.getData}>

                {(e) => `${e.name} - ${e.birthYear}`}

            </ItemList>
        )

        const personDetails = (
            <ErrorBoundry>
                <PersonDetails personId={this.state.selectedPerson}/>
            </ErrorBoundry>
        )
        return <Row left={itemList} right={personDetails}/>
    }

}
