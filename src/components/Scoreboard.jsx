import { useState } from "react";

let pictureId = 1;

async function fetchScores() {

    try {

    const response = await fetch(`https://wheres-waldo-5irt.onrender.com/highscore`)

    let scoresData = await response.json();

    return scoresData;

    } catch (error) {

        console.log(error);

    }

};

async function postScore(name, time, pictureId) {

    console.log(name);  
    console.log(time);  
    console.log(pictureId);  

    try {

    const response = await fetch("https://wheres-waldo-5irt.onrender.com/highscore", {
    method: "POST",
    body: JSON.stringify({ name: name, time: time, pictureId: pictureId }),
    headers: {'Content-type': 'application/json'},
    });

    let data = await response.json();

    console.log(data);

    } catch (error) {

    console.log(error);

    }

}


function Scoreboard({time, gameOver, handleClick}) {
    const [display, setDisplay] = useState("result");
    const [name, setName] = useState("");
    const [scores, setScores] = useState(null);
    
    return(
    <>

    {display == 'result' ?

    <div 
        className={gameOver ? 'scoreboard show' : 'scoreboard'}
    >

        <h2>Congratulations!</h2>

        <h1>Your Time: {time} seconds</h1> 

        <form onSubmit={e => e.preventDefault()}>

        <label>Title:
            <input 
            name="name" 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
        </label>

        <button
            type='submit'
            onClick={async () => {

                await postScore(name, time, pictureId)
                setName("");
                
                const data = await fetchScores();
                const fastestFive = data.slice(0, 5);
                setScores(fastestFive);

                setDisplay("scores");

            }}
        >Submit</button>

    </form>

        <button 
            onClick={() => {
                handleClick();
                setDisplay('result');
            }}
        >Restart Game</button>

    </div>

    : 

    <div 
        className={gameOver ? 'scoreboard show' : 'scoreboard'}
    >

        <h2>Scoreboard</h2>

        {scores && scores.map(score =>{

            return(

            <div className="scoreDiv">
                <div>{score.name}</div>
                <div>{score.time} secs.</div>
            </div>

            )

        })}

        <button 
            onClick={() => {
                handleClick();
                setDisplay('result');
            }}
        >Restart Game</button>

    </div>

    }
    
    </>
    )

}

export default Scoreboard;