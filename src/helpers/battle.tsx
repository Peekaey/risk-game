import React, {useEffect} from "react";


interface Battle{
    attacker: number;
    defender: number;
    setRenderGameBattleScreen: (value:boolean) => void;
    playerNames: string[];
    setRenderGamePlayerTargetScreen: (value:boolean) => void;
}

export const Battle: React.FC<Battle> = ({attacker, defender, setRenderGameBattleScreen, playerNames, setRenderGamePlayerTargetScreen}) => {

    const [battleLog, setBattleLog] = React.useState<string[]>([]);
    const [battleWinner, setBattleWinner] = React.useState<string>("");
    const [playerWinner, setPlayerWinner] = React.useState<number>(0);
    const [loading, setLoading] = React.useState<boolean>(true);

    useEffect(() => {
        const completeCalculations = async () => {
            await RollDice({attacker, defender, setBattleLog, setBattleWinner, setPlayerWinner});
            setLoading(false);
        }
        completeCalculations().catch(error => console.error(error));
    }, [attacker, defender, setBattleLog, setBattleWinner, setPlayerWinner, playerWinner]);

    const attackerName = playerNames[attacker];
    const defenderName = playerNames[defender];
    const playerWinnerName = playerNames[playerWinner];

    const handleNextTurn = () => {
        setRenderGameBattleScreen(false);
        setRenderGamePlayerTargetScreen(true);
    }

    // If loading is
    if (loading) {
        return <h1>Loading...</h1>
    }

    return(
        <React.Fragment>
            <h2>{attackerName} is attacking {defenderName}</h2>
            <br></br>
            <h2 className="underline">Battle Log</h2>
            <h2>Battle Winner: {battleWinner}</h2>
            <h2>Player Winner: {playerWinnerName}</h2>
            <ul>
                {battleLog.map((log, index) => (
                    <li key={index}>{log}</li>
                ))}
            </ul>
            <button style={{marginTop: '1em'}} onClick={handleNextTurn}>Next Turn</button>
        </React.Fragment>
    );
}

interface RollDiceProps {
    attacker: number;
    defender: number;
    setBattleLog: React.Dispatch<React.SetStateAction<string[]>>;
    setBattleWinner: React.Dispatch<React.SetStateAction<string>>;
    setPlayerWinner: React.Dispatch<React.SetStateAction<number>>;
}

const RollDice = ({attacker, defender, setBattleLog, setBattleWinner, setPlayerWinner}: RollDiceProps) => {
    return new Promise<void>((resolve) => {
        const attackerDice1 = Math.floor(Math.random() * 6) + 1;
        const attackerDice2 = Math.floor(Math.random() * 6) + 1;
        const attackerDice3 = Math.floor(Math.random() * 6) + 1;
        const defenderDice1 = Math.floor(Math.random() * 6) + 1;
        const defenderDice2 = Math.floor(Math.random() * 6) + 1;

        // Stores the dice into arrays
        const attackerDiceArray = [attackerDice1, attackerDice2, attackerDice3];
        const defenderDiceArray = [defenderDice1, defenderDice2];

        // Sort the dice arrays in descending order
        attackerDiceArray.sort((a, b) => b - a);
        defenderDiceArray.sort((a, b) => b - a);

        let BattleWinner = "";
        let playerWinner;
        const BattleLog = [];
        let highestDiceWinner;
        let secondHighestDiceWinner;
        //Top Attacker Dice vs Top Defender Dice but if equal attacker lose
        if (attackerDiceArray[0] > defenderDiceArray[0]) {
            highestDiceWinner = "Attacker";
            BattleLog.push('Attacker won the highest dice roll battle')
        } else {
            highestDiceWinner = "Defender";
            BattleLog.push('Defender won the highest dice roll battle')
        }

        //Second Highest Attacker Dice vs Second-Highest Defender Dice but if equal attacker lose
        if (attackerDiceArray[1] > defenderDiceArray[1]) {
            secondHighestDiceWinner = "Attacker";
            BattleLog.push('Attacker won the second highest dice roll battle')
        } else {
            secondHighestDiceWinner = "Defender";
            BattleLog.push('Defender won the second highest dice roll battle')
        }

        //If attacker only have one army left, and defender has more,
        // both attacker and defender rolls 2 dice each
        if (highestDiceWinner.toLowerCase() === "defender" && secondHighestDiceWinner === "defender") {
            const lastChanceAttackerDice1 = Math.floor(Math.random() * 6) + 1;
            const lastChanceAttackerDice2 = Math.floor(Math.random() * 6) + 1;
            const lastChanceDefenderDice1 = Math.floor(Math.random() * 6) + 1;
            const lastChanceDefenderDice2 = Math.floor(Math.random() * 6) + 1;

            const lastChanceAttackerDiceArray = [lastChanceAttackerDice1, lastChanceAttackerDice2];
            const lastChanceDefenderDiceArray = [lastChanceDefenderDice1, lastChanceDefenderDice2];
            lastChanceAttackerDiceArray.sort((a, b) => b - a);
            lastChanceDefenderDiceArray.sort((a, b) => b - a);

            if (lastChanceAttackerDiceArray[0] > lastChanceDefenderDiceArray[0]) {
                BattleWinner = "Attacker";
                BattleLog.push('Attacker won the last chance dice roll battle')
            } else {
                BattleWinner = "Defender";
                BattleLog.push('Defender won the last chance dice roll battle')
            }
        }

        // If attacker has 2 army left and defender has only 1,
        // attacker rolls 3 dice and defender rolls only 1 die
        if (highestDiceWinner.toLowerCase() === "attacker" || secondHighestDiceWinner.toLowerCase() === "attacker") {
            const lastchanceAttackerDice1 = Math.floor(Math.random() * 6) + 1;
            const lastchanceAttackerDice2 = Math.floor(Math.random() * 6) + 1;
            const lastchanceAttackerDice3 = Math.floor(Math.random() * 6) + 1;
            const lastchanceDefenderDice1 = Math.floor(Math.random() * 6) + 1;

            const highestAttackerDice = Math.max(lastchanceAttackerDice1, lastchanceAttackerDice2, lastchanceAttackerDice3);

            if (highestAttackerDice > lastchanceDefenderDice1) {
                BattleWinner = "Attacker";
                BattleLog.push('Attacker won the last chance dice roll battle')
            } else {
                BattleWinner = "Defender";
                BattleLog.push('Defender won the last chance dice roll battle')
            }

        }

        //If both attacker and defender only have one army left, Attacker rolls 2 dice and defender rolls 1 die
        //Not really Possible as is

        // Tally Victories on the off chance the edge case didn't decide it
        // Currently doesn't need to as both these scenarios cover all possibilities

        if (BattleWinner.toLowerCase() == "attacker") {
            playerWinner = attacker;
        } else {
            playerWinner = defender;
        }

        setBattleLog(BattleLog);
        setBattleWinner(BattleWinner);
        setPlayerWinner(playerWinner);

        if (playerWinner != null) {
            UpdateScores({attacker, defender, playerWinner});
        }

        resolve();
    });
    }

    interface UpdateScoresProps {
        attacker: number;
        defender: number;
        playerWinner: number;
    }

const UpdateScores = ({attacker, defender, playerWinner}: {attacker: number, defender: number, playerWinner: number}) => {
        const attackerScore = document.getElementById(`player-${attacker}-score`)
        const defenderScore = document.getElementById(`player-${defender}-score`);

        const currentAttackerScore = parseInt(attackerScore?.textContent || "0");
        const currentDefenderScore = parseInt(defenderScore?.textContent || "0");

        console.log("Update Scores Called");
        if (playerWinner === attacker) {
            defenderScore!.textContent = (currentDefenderScore - 1).toString();
        } else {
            attackerScore!.textContent = (currentAttackerScore - 1).toString();
        }

    }







