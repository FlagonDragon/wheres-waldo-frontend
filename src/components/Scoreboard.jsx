function Scoreboard({time, gameOver}) {
    
    return(
    <>

    <div 
        className={gameOver ? 'scoreboard show' : 'scoreboard'}
    >
        <h2>Congratulations!</h2>
        <h1>Score: {time}</h1> 
    </div>
    
    </>
    )

}

export default Scoreboard;