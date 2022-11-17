import Die from "./Die";
import "./App.css";

function App() {
  let diceArr = [];
  for (let i = 0; i < 10; i++) {
    diceArr.push(<Die key={i} value={Math.floor(Math.random() * 6) + 1} />);
  }
  return (
    <main>
      <div className='dice-container'>{diceArr}</div>
    </main>
  );
}

export default App;
