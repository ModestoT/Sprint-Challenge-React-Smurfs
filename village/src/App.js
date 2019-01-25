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
      smurfs: [],
      smurf: {
        name: '',
        age: '',
        height: ''
      },
      isUpdating: false
    };
  }

  componentDidMount(){
    axios
      .get('http://localhost:3333/smurfs')
      .then(res => {
        this.setState({ smurfs: res.data});
      })
      .catch(err => console.log(err.response));
  }

  createSmurf = (smurf) => {
    const newSmurf = {name:smurf.name, age:smurf.age, height:smurf.height};

    axios
      .post('http://localhost:3333/smurfs', newSmurf)
      .then(res => {
        this.setState({
          smurfs: res.data
        });
        this.props.history.push('/');
      })
      .catch(err => console.log(err.response));
  }

  deleteSmurf = (e, id) => {
    e.preventDefault();
    console.log("running"+id)
    axios 
      .delete(`http://localhost:3333/smurfs/${id}`)
      .then(res => { this.setState({ smurfs: res.data })})
      .catch(err => console.log(err));
  }

  updateSmurf = (id, smurf) => {
    axios 
      .put(`http://localhost:3333/smurfs/${id}`, smurf)
      .then(res => { 
        this.setState({ smurfs: res.data, isUpdating:false});
        this.props.history.push('/')
      })
      .catch(err => console.log(err))
  }

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
