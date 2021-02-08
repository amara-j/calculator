import "./App.css";
import Button from "./Button.js";
import { useEffect, useState } from "react";

function App() {
  const [operand1, updateOperand1] = useState("");
  const [operator, updateOperator] = useState("");
  const [operand2, updateOperand2] = useState("");
  const [result, updateResult] = useState(0);
  const operator_array = ["+", "-", "*", "/", "**"];

  const numberButtonOnClick = (i) => {
    if (operator === "") {
      parseInt(operand1) === 0
        ? updateOperand1(i.toString())
        : updateOperand1(operand1.toString() + i.toString());
    } else {
      parseInt(operand2) === 0
        ? updateOperand2(i.toString())
        : updateOperand2(operand2.toString() + i.toString());
    }
  };

  const operatorButtonOnClick = (element) => {
    if (operand1 === "") {
      updateOperand1(0);
    }
    updateOperator(element);
    //if operator already full,
    if (operator != "") {
      updateResult(eval(operand1 + operator + operand2));
      updateOperand1(eval(operand1 + operator + operand2));
      updateOperator(element);
      updateOperand2("");
    }
  };

  const clearButtonOnClick = () => {
    updateResult(0);
    updateOperand1("");
    updateOperator("");
  };

  const equalsButtonOnClick = () => {
    {
      updateResult(eval(operand1 + operator + operand2));
      updateOperand1(eval(operand1 + operator + operand2));
      updateOperator("");
      updateOperand2("");
    }
  };

  const negativeButtonOnClick = () => {
    if (operator === "") {
      if (operand1 === "") {
        updateOperand1("-1*");
      } else {
        updateOperand1(operand1 + "*-1");
      }
    } else {
      if (operand2 === "") {
        updateOperand2("-1*");
      } else {
        updateOperand2(operand2 + "*-1");
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
      {operator_array.map((element) => {
        return (
          <Button // generate buttons for +, -, *, /, ** in a loop
            key={element}
            display={element}
            containerClassName={"operatorContainer"}
            onClick={() => {
              operatorButtonOnClick(element);
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
      <div className="resultContainer">Result: {result}</div>{" "}
      <div> {operand1 + operator + operand2}</div>
    </div>
  );
}

export default App;
