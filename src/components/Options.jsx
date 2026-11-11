// import { useState } from 'react';

const characters = ['char1', 'char2', 'char3'];

function Options() {

  return (
    
  <div className="options">

    <ul className="optionsList">
      
      {characters.map(char => {

        return (
      
        <li key={char}>{char}</li>

        )

      })}

    </ul>

  </div>

  )

}

export default Options;
