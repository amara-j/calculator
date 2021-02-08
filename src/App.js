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
  const [result, updateResult] = useState(0);
  const operators = ["+", "-", "*", "/", "**"];

  const loopNumberComponents = () => {
    let numberComponents = [];
    for (let i = 0; i < 10; i++) {
      numberComponents.push(
        <Number
          key={i}
          displayNumber={i}
          onClick={() => {
            if (currentOperator === "") {
              parseInt(operand1) === 0
                ? updateOperand1(i.toString())
                : updateOperand1(operand1.toString() + i.toString());
            } else {
              parseInt(operand2) === 0
                ? updateOperand2(i.toString())
                : updateOperand2(operand2.toString() + i.toString());
            }
          }}
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
            onClick={() => {
              if (operand1 === "") {
                updateOperand1(0);
              }
              updateCurrentOperator(operator);
            }}
          />
        );
      })}
      <Clear
        onClick={() => {
          updateResult(0);
          updateOperand1("");
          updateCurrentOperator("");
        }}
      />
      <Equals
        onClick={() => {
          updateResult(eval(operand1 + currentOperator + operand2));
          updateOperand1(eval(operand1 + currentOperator + operand2));
          updateCurrentOperator("");
          updateOperand2("");
        }}
      />

      <div> {operand1}</div>
      <div>{currentOperator}</div>
      <div> {operand2}</div>
      <div className="resultContainer">Result: {result}</div>
    </div>
  );
}

export default App;
