import React, {Component} from "react";
import {PlanetDetails, PlanetList} from '../sw-components';
import Row from '../row';

export default class PlanetPage extends Component {

    state = {
        selectedItem: 5
    };

    onItemSelected = (selectedItem) => {
        this.setState({selectedItem});
    };

    render() {
        return (
            <Row
                left={<PlanetList onItemSelected={this.onItemSelected}/>}
                right={<PlanetDetails itemId={this.state.selectedItem}/>}/>
        );
    };
};