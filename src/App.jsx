import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import "./App.css";

function App() {
  const [dice, setDice] = React.useState(allNewDice());

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
    setDice((prevDice) => (
      prevDice.map((die) => {
        return die.isHeld ? die : generateNewDie();
      })
    ));
  }

  function holdDice(id) {
    setDice((prevDice) => (
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    ));
  }

  const diceElements = dice.map((die) => (
    <Die key={die.id} die={die} holdDice={() => holdDice(die.id)} />
  ));

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll untill all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>{diceElements}</div>
      <button className='roll-button' onClick={rollDice}>
        Roll
      </button>
    </main>
  );
}

export default App;
