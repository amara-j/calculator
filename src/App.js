import "./App.css";
import Number from "./Number.js";
import Operator from "./Operator.js";
import Clear from "./Clear.js";
import Equals from "./Equals.js";
import { useState } from "react";

function App() {
  const [operand1, updateOperand1] = useState("");
  const [currentOperator, updateCurrentOperator] = useState("");
  const [operand2, updateOperand2] = useState("");
  const [result, updateResult] = useState("");
  const operators = ["+", "-", "*", "%"];

  const loopNumberComponents = () => {
    let numberComponents = [];
    for (let i = 0; i < 10; i++) {
      numberComponents.push(
        <Number
          key={i}
          displayNumber={i}
          onClick={
            currentOperator === ""
              ? () => updateOperand1(operand1.toString() + i.toString())
              : () => updateOperand2(operand2.toString() + i.toString())
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
          updateOperand1("");
          updateCurrentOperator("");
        }}
      />
      <Equals
        onClick={() =>
          updateResult(eval(operand1 + currentOperator + operand2))
        }
      />

      <div> {operand1}</div>
      <div>{currentOperator}</div>
      <div> {operand2}</div>
      <div className="resultContainer">Result: {result}</div>
    </div>
  );
}

export default App;
