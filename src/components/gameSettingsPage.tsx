import React, {useState} from "react"
interface GameSettingsPageProps {
    setNumberOfPlayers: React.Dispatch<React.SetStateAction<number>>;
    setPlayerNames: React.Dispatch<React.SetStateAction<string[]>>;
    numberOfPlayers: number;
    playerNames: string[];
    renderGameScreenScores: (value:boolean) => void;
    renderGameSettingsScreen: (value:boolean) => void;
}

export const GameSettingsPage: React.FC<GameSettingsPageProps> = ({setNumberOfPlayers, setPlayerNames, numberOfPlayers, playerNames, renderGameScreenScores, renderGameSettingsScreen})  => {
    const[playerNamesCompleted, setplayerNamesCompleted] = useState(false);
    const handleNumberOfPlayersChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log("Number of Players: ", event.target.value)
        setNumberOfPlayers(parseInt(event.target.value));
        RenderPlayerNameInputFields(parseInt(event.target.value), handlePlayerNameChange, playerNames);
    }
    const handlePlayerNameChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPlayerNames = [...playerNames];
        newPlayerNames[index] = event.target.value;
        setPlayerNames(newPlayerNames);
        setplayerNamesCompleted(checkFieldsCompleted(newPlayerNames, numberOfPlayers));
        console.log("Player Names: ", newPlayerNames, playerNamesCompleted, checkFieldsCompleted(newPlayerNames, numberOfPlayers));

    }

    const handleStartGame = () => {
        renderGameScreenScores(true);
        renderGameSettingsScreen(false);
    }

    return(
    <React.Fragment>
        <h1>Game Settings</h1>
        <h2>Please choose the number of players and their username</h2>
        <div className="card">
            <label className="space-x-2">Number of Players</label>
            <br></br>
            <select id="numberOfPlayers" className="rounded-md" style={{width: '10em'}} name="numberOfPlayers" onChange={handleNumberOfPlayersChange}>
                <option value="2" style={{width: '10em'}}>2</option>
                <option value="3" style={{width: '10em'}}>3</option>
                <option value="4" style={{width: '10em'}}>4</option>
                <option value="5" style={{width: '10em'}}>5</option>
                <option value="6" style={{width: '10em'}}>6</option>
            </select>
        </div>
        {RenderPlayerNameInputFields(numberOfPlayers, handlePlayerNameChange, playerNames)}
        {playerNamesCompleted && <button style={{marginTop: '1em'}} onClick={handleStartGame}>Start Game</button>}
    </React.Fragment>
    );
}

const RenderPlayerNameInputFields = (numberOfPlayers: number, handlePlayerNameChange: (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => void, playerNames: string[]) => {
    console.log("RenderPlayerNameInputFields Called")
    return Array(numberOfPlayers).fill(null).map((_, index) => {
        return (
            <div  key={index}>
                <label className="space-x-2">Player {index+1} Name</label>
                <br></br>
                <input type="text" className="rounded-md"  id={`player${index+1}`} name={`player${index+1}`} value={playerNames[index] || ''} onChange={handlePlayerNameChange(index)} />
            </div>
        );
    });
}

const checkFieldsCompleted = (playerNames: string[], numberOfPlayers: number) => {
    if (playerNames.length === numberOfPlayers) {
        for (let i = 0; i < playerNames.length; i++) {
            if (playerNames[i] === '') {
                return false;
            }
        }
        return true;
    }
    return false;
}