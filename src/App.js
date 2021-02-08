import "./App.css";
import Number from "./Number.js";
import { useState } from "react";

function App() {
  const [currentNumber, updateCurrentNumber] = useState("");

  const loopNumberComponents = () => {
    let numberComponents = [];
    for (let i = 0; i < 10; i++) {
      numberComponents.push(
        <Number
          key={i}
          displayNumber={i}
          onClick={() => updateCurrentNumber(i)}
        />
      );
    }
    return numberComponents;
  };

  return (
    <div className="App">
      {loopNumberComponents()}
      <div>Current number: {currentNumber}</div>
    </div>
  );
}

export default App;
