import "./App.css";
import Number from "./Number.js";
import Operator from "./Operator.js";
import Clear from "./Clear.js";
import Equals from "./Equals.js";
import { useState } from "react";

function App() {
  const [operand1, updateOperand1] = useState(0);
  const [currentOperator, updateCurrentOperator] = useState("");
  const [operand2, updateOperand2] = useState("");
  const [result, updateResult] = useState("");
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
      <Equals onClick={() => console.log("equals")} />
      <div> Operand 1: {operand1}</div>
      <div>Operator: {currentOperator}</div>
      <div> Operand 2: {operand2}</div>
      <div className="resultContainer">Result: {result}</div>
    </div>
  );
}

export default App;
