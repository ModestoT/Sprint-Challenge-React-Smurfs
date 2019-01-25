import React, { Component } from 'react';

import './SmurfForm.css';

class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurf: {
        name: '',
        age: '',
        height: ''
      }
    };
  }

  // method used to add a smurf to the database. This method calls the createSmurf from the parent component App and passes in
  // the smurf object from this components state
  addSmurf = event => {
    event.preventDefault();
    // add code to create the smurf using the api
    this.props.createSmurf(this.state.smurf)
  }

  // method used to handle the input the users inputs into the form fields. Sets the state based on the targeted field elements name
  // to the targeted fields value being inputted.
  handleInputChange = e => {
    e.persist();
    this.setState( prevState => { 
      return {
        smurf: {
          ...prevState.smurf,
          [e.target.name]: e.target.value 
        }
      }
    });
  };

  // method used to handle sumbits to the form element. Sees if the prop isUpdating from parent component App is true or false. 
  // if it's true it runs the method updateSmurf else it will the addSmurf method
  handleSumbit = e => {
    e.preventDefault();

    if(this.props.isUpdating) {
      this.props.updateSmurf(this.props.smurf.id, this.state.smurf);
    } else {
      this.addSmurf(e);
    }
  }

  // sets the state of the empty smurf object to that of the smurf object sent down to it as a prop from the parent component App
  componentDidMount(){
    this.setState({smurf: {name: this.props.smurf.name, age: this.props.smurf.age, height: this.props.smurf.height }})
  }
  render() {
    return (
      <div className="SmurfForm">
        <h1>{this.props.isUpdating ? "Update Smurf" : "Add to the village"}</h1>
        <form onSubmit={this.handleSumbit}>
          <input
            onChange={this.handleInputChange}
            placeholder="name"
            value={this.state.smurf.name}
            name="name"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="age"
            value={this.state.smurf.age}
            name="age"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="height"
            value={this.state.smurf.height}
            name="height"
          />
          <button type="submit">{this.props.isUpdating ? "Update Smurf" : "Add to the village"}</button>
        </form>
      </div>
    );
  }
}

export default SmurfForm;
