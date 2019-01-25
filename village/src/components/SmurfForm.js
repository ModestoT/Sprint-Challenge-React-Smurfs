import React, { Component } from 'react';

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

  addSmurf = event => {
    event.preventDefault();
    // add code to create the smurf using the api
    this.props.createSmurf(this.state.smurf)
  }

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
  
  handleSumbit = e => {
    e.preventDefault();

    if(this.props.isUpdating) {
      this.props.updateSmurf(this.props.smurf.id, this.state.smurf);
    } else {
      this.addSmurf(e);
    }
  }
  componentDidMount(){
    this.setState({smurf: {name: this.props.smurf.name, age: this.props.smurf.age, height: this.props.smurf.height }})
  }
  render() {
    return (
      <div className="SmurfForm">
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
