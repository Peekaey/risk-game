import React from "react"


interface GameScoresProps {
    playerNames: string[];
    setRenderStartRoundButton: (value:boolean) => void;
    renderStartRoundButton: boolean;
    setRenderGamePlayerTargetScreen: (value:boolean) => void;
    playerTurnCounter: number;
    startingScore: number;
}

interface StartRoundButtonProps {
    setRenderStartRoundButton: (value:boolean) => void;
    setRenderGamePlayerTargetScreen: (value:boolean) => void;
}

export const GameScores: React.FC<GameScoresProps> = ({playerNames, setRenderStartRoundButton, renderStartRoundButton, setRenderGamePlayerTargetScreen, playerTurnCounter, startingScore}) => {

    const currentPlayer = playerNames[playerTurnCounter];


    return (
        <React.Fragment>
            <div className="card">
            <h1>Current Match</h1>
            {playerNames.map((playerName, index) => (
                <div key={index}>
                    <label id={`player${index}`}>{playerName} | Score: </label> <span id={`player-${index}-score`}>{startingScore}</span>
                </div>
            ))}
            </div>
            <div>
            <h2> Its {currentPlayer}'s Turn</h2>
            {renderStartRoundButton && <StartRoundButton setRenderStartRoundButton={setRenderStartRoundButton} setRenderGamePlayerTargetScreen={setRenderGamePlayerTargetScreen}/>}
            </div>
        </React.Fragment>
    )
}



const StartRoundButton: React.FC<StartRoundButtonProps> = ({ setRenderStartRoundButton, setRenderGamePlayerTargetScreen }) => {

    const handleClick = () => {
        setRenderStartRoundButton(false);
        setRenderGamePlayerTargetScreen(true);
    }

    return (
        <button onClick={handleClick} style={{marginTop: "1em"}}>Start Game</button>
    );
};