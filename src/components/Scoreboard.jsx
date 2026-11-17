function Scoreboard({time, gameOver, handleClick}) {
    
    return(
    <>

    <div 
        className={gameOver ? 'scoreboard show' : 'scoreboard'}
    >
        <h2>Congratulations!</h2>
        <h1>Your Time: {time} seconds</h1> 
        <div>
            <input></input>
            <button>Submit Score</button>
        </div>
            <button onClick={handleClick}>Restart Game</button>
    </div>
    
    </>
    )

}

export default Scoreboard;