import { useState } from 'react'
import {HomePage} from "./components/homePage.tsx";
import {GameSettingsPage} from "./components/gameSettingsPage.tsx";
import './App.css'
import {GameScores} from "./components/gameScores.tsx";
import { GamePlayerTargetPage } from './components/gamePlayerTargetPage.tsx';
import {Battle} from "./helpers/battle.tsx";

// TODO
// - Update Game Scores Properly
// - Fix Hosting
//

function App() {

    // Page State Variables
    const [renderHomeScreen, setRenderHomeScreen] = useState(true);
    const [renderGameSettingsScreen, setRenderGameSettingsScreen] = useState(false);
    const [renderGameScreenScores, setRenderGameScreenScores] = useState(false);
    const [renderGamePlayerTargetScreen, setRenderGamePlayerTargetScreen] = useState(false);
    const [renderGameBattleScreen, setRenderGameBattleScreen] = useState(false);

    const [renderStartRoundButton, setRenderStartRoundButton] = useState(true);


    const [startingScore, setStartingScore] = useState<number>(3);
    const [attacker, setAttacker] = useState<number>(0);
    const [defender, setDefender] = useState<number>(0);


    //Individual Parameters
    const [playerTurnCounter, setPlayerTurnsCounter] = useState(0);

    const [numberOfPlayers, setNumberOfPlayers] = useState<number>(2);
    const [playerNames, setPlayerNames] = useState<string[]>([]);

  return (
    <>
      {renderHomeScreen && <HomePage renderHomeScreen={setRenderHomeScreen} renderGameSettingsScreen={setRenderGameSettingsScreen} />}
        {renderGameSettingsScreen && <GameSettingsPage setNumberOfPlayers={setNumberOfPlayers} setPlayerNames={setPlayerNames} numberOfPlayers={numberOfPlayers} playerNames={playerNames} renderGameScreenScores={setRenderGameScreenScores} renderGameSettingsScreen={setRenderGameSettingsScreen} setStartingScore={setStartingScore}/>}
        {renderGameScreenScores && <GameScores playerNames={playerNames} setRenderStartRoundButton={setRenderStartRoundButton} renderStartRoundButton={renderStartRoundButton} setRenderGamePlayerTargetScreen={setRenderGamePlayerTargetScreen} playerTurnCounter={playerTurnCounter} startingScore={startingScore}/>}
        {renderGamePlayerTargetScreen && <GamePlayerTargetPage playerTurnCounter={playerTurnCounter} setPlayerTurnCounter={setPlayerTurnsCounter} playerNames ={playerNames} setRenderGameBattleScreen={setRenderGameBattleScreen} attacker={attacker} setAttacker={setAttacker} defender={defender} setDefender={setDefender} renderGamePlayerTargetScreen={renderGamePlayerTargetScreen} setRenderGamePlayerTargetScreen={setRenderGamePlayerTargetScreen}/>}
        {renderGameBattleScreen && <Battle attacker={attacker} defender={defender} setRenderGameBattleScreen={setRenderGameBattleScreen}  playerNames={playerNames} setRenderGamePlayerTargetScreen={setRenderGamePlayerTargetScreen}/>}
    </>
  )
}

export default App
