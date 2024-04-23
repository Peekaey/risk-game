import React from "react"


interface GameScoresProps {
    playerNames: string[];
    setRenderStartRoundButton: (value:boolean) => void;
    renderStartRoundButton: boolean;
    setRenderGamePlayerTargetScreen: (value:boolean) => void;
}

interface StartRoundButtonProps {
    setRenderStartRoundButton: (value:boolean) => void;
    setRenderGamePlayerTargetScreen: (value:boolean) => void;
}

export const GameScores: React.FC<GameScoresProps> = ({playerNames, setRenderStartRoundButton, renderStartRoundButton, setRenderGamePlayerTargetScreen}) => {

    console.log("GameScores Called", playerNames);
    return (
        <React.Fragment>
            <h1>Game Scores</h1>
            {playerNames.map((playerName, index) => (
                <div key={index}>
                    <label id={`player${index}`}>{playerName} | Score: </label> <span> 3</span>
                </div>
            ))}
            {renderStartRoundButton && <StartRoundButton setRenderStartRoundButton={setRenderStartRoundButton} setRenderGamePlayerTargetScreen={setRenderGamePlayerTargetScreen}/>}
        </React.Fragment>
    )
}



const StartRoundButton: React.FC<StartRoundButtonProps> = ({ setRenderStartRoundButton, setRenderGamePlayerTargetScreen }) => {

    const handleClick = () => {
        setRenderStartRoundButton(false);
        setRenderGamePlayerTargetScreen(true);
    }

    return (
        <button onClick={handleClick}>Start Round</button>
    );
};