import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import "./App.css";

function App() {
  const localBestTime = localStorage.getItem("bestTime");
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [game, setGame] = React.useState(false);
  const [rolls, setRolls] = React.useState(0);
  const [time, setTime] = React.useState(0);
  const [bestTime, setBestTime] = React.useState(
    (localBestTime && parseInt(localBestTime)) || ""
  );
  const [confettiProps, setConfettiProps] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // handle window resize for confetti
  React.useEffect(() => {
    function handleResize() {
      setConfettiProps({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // check for game end
  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const allSame = dice.every((die) => die.value === dice[0].value);
    if (allHeld && allSame) {
      setTenzies(true);
      setGame(false);
      // set new best time
      if (bestTime === "" || time < bestTime) {
        localStorage.setItem("bestTime", time);
        setBestTime(time);
      }
    }
  }, [dice]);

  // timer
  React.useEffect(() => {
    let timer = null;
    if (game) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 100);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [game]);

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    let diceArr = [];
    for (let i = 0; i < 10; i++) {
      diceArr.push(generateNewDie());
    }
    return diceArr;
  }

  function rollDice() {
    if (!tenzies) {
      if (game === false) {
        setGame(true);
      }
      setRolls((prevRolls) => prevRolls + 1);
      setDice((prevDice) =>
        prevDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setRolls(0);
      setTime(0);
      setTenzies(false);
      setDice(allNewDice());
    }
  }

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  function timeFormat(time) {
    let seconds = Math.floor(time / 10);
    let milliseconds = time % 10;
    return `${seconds}.${milliseconds}`;
  }

  const diceElements = dice.map((die) => (
    <Die key={die.id} die={die} holdDice={() => holdDice(die.id)} />
  ));

  return (
    <main>
      {tenzies && <Confetti {...confettiProps} />}
      <h1 className='title'>Tenzies</h1>
      <p className='instructions'>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className='stats'>
        <p>Rolls: {rolls}</p>
        <p>Time: {timeFormat(time)}s</p>
        {bestTime && <p>Best Time: {timeFormat(bestTime)}s</p>}
      </div>
      <div className='dice-container'>{diceElements}</div>
      <button className='roll-button' onClick={rollDice}>
        {tenzies ? "Play Again" : "Roll"}
      </button>
    </main>
  );
}

export default App;
