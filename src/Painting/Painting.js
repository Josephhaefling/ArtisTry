import React from 'react';
import './Painting.css';


function Painting (props) {

  return(
    <div>
      <img src={props.painting.image} alt={props.painting.title} className="art" onError={} />
    </div>
  )
}

export default Painting;