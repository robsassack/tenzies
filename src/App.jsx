import React from "react";
import Die from "./Die";
import "./App.css";

function App() {
  const [dice, setDice] = React.useState(allNewDice());

  function allNewDice() {
    let diceArr = [];
    for (let i = 0; i < 10; i++) {
      diceArr.push(Math.ceil(Math.random() * 6));
    }
    return diceArr;
  }

  const diceElements = dice.map((die, i) => {
    return <Die key={i} value={die} />;
  });

  return (
    <main>
      <div className='dice-container'>{diceElements}</div>
    </main>
  );
}

export default App;
