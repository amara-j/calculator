import "./App.css";
import Button from "./Button.js";
import { useState } from "react";

function App() {
  const [operand1, updateOperand1] = useState("");
  const [currentOperator, updateCurrentOperator] = useState("");
  const [operand2, updateOperand2] = useState("");
  const [result, updateResult] = useState(0);
  const operators = ["+", "-", "*", "/", "**"];

  const numberButtonOnClick = (i) => {
    if (currentOperator === "") {
      parseInt(operand1) === 0
        ? updateOperand1(i.toString())
        : updateOperand1(operand1.toString() + i.toString());
    } else {
      parseInt(operand2) === 0
        ? updateOperand2(i.toString())
        : updateOperand2(operand2.toString() + i.toString());
    }
  };

  const operatorButtonOnClick = (operator) => {
    if (operand1 === "") {
      updateOperand1(0);
    }
    updateCurrentOperator(operator);
  };

  const clearButtonOnClick = () => {
    updateResult(0);
    updateOperand1("");
    updateCurrentOperator("");
  };

  const equalsButtonOnClick = () => {
    {
      updateResult(eval(operand1 + currentOperator + operand2));
      updateOperand1(eval(operand1 + currentOperator + operand2));
      updateCurrentOperator("");
      updateOperand2("");
    }
  };

  const negativeButtonOnClick = () => {
    {
      if (operand1 === "") {
        updateCurrentOperator("*");
        updateOperand1("-1");
      } else {
        updateCurrentOperator("*");
        updateOperand2("-1");
      }
    }
  };

  const loopNumberComponents = () => {
    let numberComponents = [];
    for (let i = 0; i < 10; i++) {
      numberComponents.push(
        <Button // generate numbers 0-9 in a loop
          key={i}
          display={i}
          containerClassName={"numberContainer"}
          onClick={() => {
            numberButtonOnClick(i);
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
          <Button // generate buttons for +, -, *, /, ** in a loop
            key={operator}
            display={operator}
            containerClassName={"operatorContainer"}
            onClick={() => {
              operatorButtonOnClick(operator);
            }}
          />
        );
      })}
      <Button // generate clear button
        display={"Clear"}
        containerClassName={"clearContainer"}
        onClick={() => clearButtonOnClick()}
      />
      <Button // generate equals button
        display={"Equals"}
        containerClassName={"equalsContainer"}
        onClick={() => {
          equalsButtonOnClick();
        }}
      />

      <Button // negative button
        display={"Negative"}
        containerClassName={"negativeContainer"}
        onClick={() => {
          negativeButtonOnClick();
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
