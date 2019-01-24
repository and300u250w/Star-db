import React, { Component } from 'react';

import './person-details.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner/spinner';
import ErrorButton from '../error-button/error-button';

export default class PersonDetails extends Component {

  swapiService = new SwapiService();


  state = {
    person:null,
    loading: true
  };


  componentDidMount(){
    this.updatePerson();
  }

  componentDidUpdate(prevProps){
    if(this.props.personId !== prevProps.personId){
      this.updatePerson();
    }
  }

  updatePerson(){
    const {personId} = this.props;
    if (!personId){
      return;
    }
    this.swapiService
    .getPerson(personId)
    .then((person) =>{
      this.setState({
        person: person,
        loading: false});
    })

  };


  render() {

    if (!this.state.person) {
      return <span> Select a person from a list</span>;
    }
    const {person, loading} = this.state;
    const spinner = loading ? <Spinner/> :<PersonView person={person} />;
  

    return (
      <div className="person-details card">
      {spinner}
  
      </div>
    )

  }
}

const PersonView = ({person}) => {
const { id,name,gender, birthYear, eyeColor} = person;

    return (
      <React.Fragment>
          <img className="person-image"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

        <div className="card-body">
          <h4>{name} </h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender -</span>
              <span>{gender.charAt(0).toUpperCase() + gender.slice(1)}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year -</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color -</span>
              <span>{eyeColor.charAt(0).toUpperCase() + eyeColor.slice(1)}</span>
            </li>
          </ul>
          <ErrorButton/>
        </div>
        </React.Fragment>
    )}