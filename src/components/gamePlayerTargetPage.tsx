import React from "react";

interface GamePlayerTargetPageProps {
    playerTurnCounter: number;
    setPlayerTurnCounter: React.Dispatch<React.SetStateAction<number>>;
    playerNames: string[];
    setRenderGameBattleScreen: (value:boolean) => void;
    attacker: number;
    setAttacker: React.Dispatch<React.SetStateAction<number>>;
    defender: number;
    setDefender: React.Dispatch<React.SetStateAction<number>>;
    renderGamePlayerTargetScreen: boolean;
    setRenderGamePlayerTargetScreen: (value:boolean) => void;
}

export const GamePlayerTargetPage: React.FC<GamePlayerTargetPageProps> = ({playerTurnCounter, setPlayerTurnCounter, playerNames, setRenderGameBattleScreen, setAttacker, setDefender, setRenderGamePlayerTargetScreen}) => {

    const handlePlayerTargetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log("Player Target: ", event.target.value);
    }

    const currentPlayer = playerNames[playerTurnCounter];
    const playerChoices = playerNames.filter(playerName => playerName !== currentPlayer);

    const handleBattleButton = () => {
        setRenderGameBattleScreen(true);
        setAttacker(playerTurnCounter);
        setRenderGamePlayerTargetScreen(false);
        const defender = playerNames.indexOf((document.getElementById("playerTarget") as HTMLSelectElement)?.value);
        setDefender(defender);
        console.log("Defender", defender);
        if(playerTurnCounter === playerNames.length - 1){
            setPlayerTurnCounter(0);
        } else {
            setPlayerTurnCounter(playerTurnCounter + 1);
        }
    }


    return(
        <React.Fragment>
            <h2>Please select the player you wish to target</h2>
            <div className="card">
            <select id="playerTarget" name="playerTarget" style={{width: '10em'}} onChange={handlePlayerTargetChange}>
                {playerChoices.map((playerName, index) => (
                    <option key={index} className="rounded-md" style={{width: '10em'}} value={playerName}>{playerName}</option>
                ))}
            </select>
            </div>
            <div>
                <button onClick={handleBattleButton}>Let's Battle!</button>
            </div>
        </React.Fragment>
    );
}