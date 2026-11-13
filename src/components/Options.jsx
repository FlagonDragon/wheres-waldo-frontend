// import { useState } from 'react';

const characters = ['Pink Square', 'Yellow Square', 'Blue Square', 'Gray Square'];

function Options({ handleClick }) {

  return (
    
  <div className="options">

    <ul className="optionsList">
      
      {characters.map(char => {

        return (
      
        <li 
          key={char}
          onClick={(e) => handleClick(e, char)}
        >{char}</li>

        )

      })}

    </ul>

  </div>

  )

}

export default Options;
