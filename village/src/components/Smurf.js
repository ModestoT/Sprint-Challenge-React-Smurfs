import React from 'react';

import './Smurf.css';

const Smurf = props => {
  return (
    <div className="Smurf">
      <h3>{ props.smurf.name}</h3>
      <strong>{ props.smurf.height} tall</strong>
      <p>{props.smurf.age} smurf years old</p>
      <form >
        <button className= "delete" onClick={e => props.deleteSmurf(e, props.smurf.id)}>Delete</button>
        <button onClick={e => props.populateUpdate(e, props.smurf.id)}>Update</button> 
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

