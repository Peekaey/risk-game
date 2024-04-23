import { useState } from 'react'
import {HomePage} from "./components/homePage.tsx";
import {GameSettingsPage} from "./components/gameSettingsPage.tsx";
import './App.css'
import {GameScores} from "./components/gameScores.tsx";
import { GamePlayerTargetPage } from './components/gamePlayerTargetPage.tsx';



function App() {

    // Page State Variables
    const [renderHomeScreen, setRenderHomeScreen] = useState(true);
    const [renderGameSettingsScreen, setRenderGameSettingsScreen] = useState(false);
    const [renderGameScreenScores, setRenderGameScreenScores] = useState(false);

    const [renderStartRoundButton, setRenderStartRoundButton] = useState(true);
    const [renderGamePlayerTargetScreen, setRenderGamePlayerTargetScreen] = useState(false);
    const [renderGameBattleScreen, setRenderGameBattleScreen] = useState(false);


    //Player Turns Counter
    const [playerTurnCounter, setPlayerTurnsCounter] = useState(0);

    // Individual Parameters
    const [numberOfPlayers, setNumberOfPlayers] = useState<number>(2);
    const [playerNames, setPlayerNames] = useState<string[]>([]);

  return (
    <>
      {renderHomeScreen && <HomePage renderHomeScreen={setRenderHomeScreen} renderGameSettingsScreen={setRenderGameSettingsScreen} />}
        {renderGameSettingsScreen && <GameSettingsPage setNumberOfPlayers={setNumberOfPlayers} setPlayerNames={setPlayerNames} numberOfPlayers={numberOfPlayers} playerNames={playerNames} renderGameScreenScores={setRenderGameScreenScores} renderGameSettingsScreen={setRenderGameSettingsScreen}/>}
        {renderGameScreenScores && <GameScores playerNames={playerNames} setRenderStartRoundButton={setRenderStartRoundButton} renderStartRoundButton={renderStartRoundButton} setRenderGamePlayerTargetScreen={setRenderGamePlayerTargetScreen}/>}
        {renderGamePlayerTargetScreen && <GamePlayerTargetPage playerTurnCounter={playerTurnCounter} setPlayerTurnCounter={setPlayerTurnsCounter} playerNames ={playerNames}/>}
    </>
  )
}

export default App
