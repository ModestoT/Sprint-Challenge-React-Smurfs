import React from 'react';
import { Route } from 'react-router-dom';

const Smurf = props => {
  return (
    <div className="Smurf">
      <h3>{props.isUpdating ? props.smurf.name : props.name}</h3>
      <strong>{props.isUpdating ? props.smurf.height : props.height} tall</strong>
      <p>{props.isUpdating ? props.smurf.age : props.age} smurf years old</p>
      <form >
        <button onClick={e => props.deleteSmurf(e, props.id)}>Delete</button>
        <button onClick={e => props.populateUpdate(e, props.id)}>Update</button>
      </form>
    </div>
  );
};

Smurf.defaultProps = {
  name: '',
  height: '',
  age: ''
};

export default Smurf;

