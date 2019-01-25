import React from 'react';

import Smurf from './Smurf';

function SinglePost (props) {
    const smurf = props.smurfs.find(
        smurf => `${smurf.id}` === props.match.params.id
    );
    
    if(!smurf) return <h2>Opps!</h2>;
    return (
        <Smurf smurf={smurf}/>
    );
}

export default SinglePost;