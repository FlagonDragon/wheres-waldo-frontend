// import { useState } from 'react';

// const options = ['Pink Square', 'Yellow Square', 'Blue Square', 'Gray Square'];

function OptionsDiv({ optionsArr, handleClick }) {

  return (
    
  <div className="options">

    <ul className="optionsList">
      
      {optionsArr.map(option => {

        return (
      
        <li 
          key={option}
          onClick={(e) => handleClick(e, option)}
        >{option}</li>

        )

      })}

    </ul>

  </div>

  )

}

export default OptionsDiv;
