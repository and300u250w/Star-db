import React, { Component } from "react";
import {StarshipDetails, StarshipList} from '../sw-components';
import Row from '../row';

export default class StarShipPage extends Component{

    state = {
        selectedItem: 9
    };


    onItemSelected = (selectedItem) =>{
        this.setState({selectedItem});
    };

    render(){
        return (
            <Row 
            left = {<StarshipList onItemSelected={this.onItemSelected}/>}
            right = {<StarshipDetails itemId={this.state.selectedItem}/>}
         />
        )
    }
}