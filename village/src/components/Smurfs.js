import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Smurf from './Smurf';
import './Smurfs.css';

class Smurfs extends Component {
  render() {
    return (
      <div className="Smurfs">
        <h1>Smurf Village</h1>
        <ul>
          {this.props.smurfs.map(smurf => {
            return (
              <Link to={`/smurf/${smurf.id}`} key={smurf.id}>
                <Smurf
                  smurf={smurf}
                  key={smurf.id}
                  deleteSmurf={this.props.deleteSmurf}
                  populateUpdate={this.props.populateUpdate}
              />
            </Link>
            );
          })}
        </ul>
      </div>
    );
  }
}

Smurf.defaultProps = {
 smurfs: [],
};

export default Smurfs;
