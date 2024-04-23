import React from "react";


interface GamePlayerTargetPageProps {
    playerTurnCounter: number;
    setPlayerTurnCounter: React.Dispatch<React.SetStateAction<number>>;
    playerNames: string[];
}

export const GamePlayerTargetPage: React.FC<GamePlayerTargetPageProps> = ({playerTurnCounter, setPlayerTurnCounter, playerNames}) => {

    const handlePlayerTargetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log("Player Target: ", event.target.value);
    }

    const handleBattleButton = () => {
        setPlayerTurnCounter(playerTurnCounter + 1);
    }

    const currentPlayer = playerNames[playerTurnCounter];
    const playerChoices = playerNames.filter(playerName => playerName !== currentPlayer);

    return(
        <React.Fragment>
            <h2>Player {currentPlayer}'s Turn</h2>
            <h2>Please select the player you wish to target</h2>
            <div>
            <select id="playerTarget" name="playerTarget" onChange={handlePlayerTargetChange}>
                {playerChoices.map((playerName, index) => (
                    <option key={index} value={playerName}>{playerName}</option>
                ))}
            </select>
            </div>
            <div>
                <button onClick={handleBattleButton}>Let's Battle!</button>
            </div>
        </React.Fragment>
    );
}