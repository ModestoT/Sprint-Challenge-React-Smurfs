import React, { Component } from 'react';
import axios from 'axios';
import { Route, NavLink, withRouter } from 'react-router-dom';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import SingleSmurf from './components/SingleSmurf';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [], //empty array in state used to hold the data received from the get request to the server
      smurf: { // empty object used to store a signle smurf to be based around as a prop for the other components
        name: '',
        age: '',
        height: ''
      },
      isUpdating: false // boolean variable used to update the state based on if the user is updating a smurfs information
    };
  }

  //Gets the data from the server when the App component is mounted onto the browser and sets that data to the state
  componentDidMount(){
    axios
      .get('http://localhost:3333/smurfs')
      .then(res => {
        this.setState({ smurfs: res.data});
      })
      .catch(err => console.log(err.response));
  }

  // method used to create a new smurf for the database. This method is mainly used to do the post request to the server
  // it requires an object as its param and sends that smurf object with the post request and then sets 
  // the state to the new data received from that post request and sends the user back to the homepage
  createSmurf = (smurf) => {

    axios
      .post('http://localhost:3333/smurfs', smurf)
      .then(res => {
        this.setState({
          smurfs: res.data
        });
        this.props.history.push('/');
      })
      .catch(err => console.log(err.response));
  }

  // method used to delete a smurf from the database. Method takes in an id as its parameter and uses it when running
  // the delete request to the server. It then sets the state to the new data recieved from the request 
  deleteSmurf = (e, id) => {
    e.preventDefault();

    axios 
      .delete(`http://localhost:3333/smurfs/${id}`)
      .then(res => { this.setState({ smurfs: res.data })})
      .catch(err => console.log(err));
  }

  // method used to update a specific smurf on the database. Method takes in a smurf object as well as the smurfs id.
  // method uses the smurfs id to match it with the id of the smurf in the database and then sets that smurfs data to the new
  // smurf object sent it as the parameter. After it sets the state with the updated data received from the database as well as
  // setting the isUpdating state to false and sending the user back to the homepage
  updateSmurf = (id, smurf) => {
    axios 
      .put(`http://localhost:3333/smurfs/${id}`, smurf)
      .then(res => { 
        this.setState({ smurfs: res.data, isUpdating:false});
        this.props.history.push('/')
      })
      .catch(err => console.log(err))
  }

  // method used to populate the form fields with the selected smurfs data from the smurfs list.  Method takes in an id that is grabbed when 
  // the user clicks on the update button. The id is used to set the empty object smurf to the data of that smurf selected to be updated. Sets 
  // isUpdating state to true and sends the user to the smurf-form page
  populateUpdate = (e, id) => {
      e.preventDefault();
      this.setState({smurf: this.state.smurfs.find(smurf => smurf.id === id ),
      isUpdating:true})
      this.props.history.push(`/smurf-form`)
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    return (
      <div className="App">
        <nav>
          <h1>Smurf List</h1>
          <div className="links">
            <NavLink to ="/smurf-form">Add Smurf</NavLink>
            <NavLink exact to ="/">Home</NavLink>
          </div>
        </nav>
        <Route exact path = "/" render={props => <Smurfs {...props} smurfs={this.state.smurfs} deleteSmurf={this.deleteSmurf} populateUpdate={this.populateUpdate}/>} />
        <Route path ="/smurf-form" render={props => <SmurfForm {...props} createSmurf={this.createSmurf} isUpdating={this.state.isUpdating} smurf={this.state.smurf} updateSmurf={this.updateSmurf}/>} />
        <Route path="/smurf/:id" render={props => <SingleSmurf {...props} smurfs={this.state.smurfs} />} />
      </div>
    );
  }
}

export default withRouter(App);
