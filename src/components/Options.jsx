// import { useState } from 'react';

const characters = ['char1', 'char2', 'char3'];

function Options({ handleClick }) {

  return (
    
  <div className="options">

    <ul className="optionsList">
      
      {characters.map(char => {

        return (
      
        <li 
          key={char}
          onClick={handleClick}
        >{char}</li>

        )

      })}

    </ul>

  </div>

  )

}

export default Options;
