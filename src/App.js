import "./App.css";
import Number from "./Number.js";
import Operator from "./Operator.js";
import Clear from "./Clear.js";
import { useState } from "react";

function App() {
  const [currentNumber, updateCurrentNumber] = useState("");
  const [currentOperator, updateCurrentOperator] = useState("");
  const operators = ["+", "-", "X", "%"];

  const loopNumberComponents = () => {
    let numberComponents = [];
    for (let i = 0; i < 10; i++) {
      numberComponents.push(
        <Number
          key={i}
          displayNumber={i}
          onClick={
            currentOperator === ""
              ? () =>
                  updateCurrentNumber(currentNumber.toString() + i.toString())
              : () => updateCurrentNumber(i)
          }
        />
      );
    }
    return numberComponents;
  };

  return (
    <div className="App">
      {loopNumberComponents()}
      {operators.map((operator) => {
        return (
          <Operator
            key={operator}
            displayOperator={operator}
            onClick={() => updateCurrentOperator(operator)}
          />
        );
      })}
      <Clear
        onClick={() => {
          updateCurrentNumber("");
          updateCurrentOperator("");
        }}
      />
      <div>Current number: {currentNumber}</div>
      <div>Current operator: {currentOperator}</div>
    </div>
  );
}

export default App;
