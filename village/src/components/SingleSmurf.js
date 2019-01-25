import React from 'react';

import Smurf from './Smurf';
import './SingleSmurf.css';

function SinglePost (props) {
    // variable used to hold the smurf that is to be displayed on the webpage. It takes the prop of smurfs which is an array that hold all of the 
    // smurf objects from the server and runs the find() method. The find method compared each smurfs id from the array to the id of the smurf clicked on
    // from the smurfs list on the homepage, the link itself is set up when the Smurfs component is ran. This variable is then sent into 
    // the smurf component to be displayed on the webpage on its own.
    const smurf = props.smurfs.find(
        smurf => `${smurf.id}` === props.match.params.id
    );
    
    if(!smurf) return <h2>Opps!</h2>;
    return (
        <div className="selected-smurf">
            <Smurf smurf={smurf}/>
        </div>
    );
}

export default SinglePost;