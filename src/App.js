import "./App.css";
import Button from "./Button.js";
import { useEffect, useState } from "react";

function App() {
  const [operand1, updateOperand1] = useState("");
  const [operator, updateOperator] = useState("");
  const [operand2, updateOperand2] = useState("");
  let expression = operand1 + operator + operand2;
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
      updateResult(operand1 + operator + operand2);
      updateOperand1(operand1 + operator + operand2);
      updateOperator(element);
      updateOperand2("");
    }
  };

  const clearButtonOnClick = () => {
    updateResult(0);
    updateOperand1("");
    updateOperand2("");
    updateOperator("");
  };

  const equalsButtonOnClick = () => {
    {
      updateResult(operand1 + operator + operand2);
      updateOperand1(operand1 + operator + operand2);
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

  const handleDelete = () => {
    if (operand2.length > 0) {
      updateOperand2(operand2.substring(0, operand2.length - 1));
    } else if (operator != "") {
      updateOperator("");
    } else if (operand1.length > 0) {
      updateOperand1(operand1.substring(0, operand1.length - 1));
    }
  };

  const handleKeyDown = (e) => {
    console.log(e.code);
    // numbers
    if (e.code.slice(0, 5) === "Digit" && e.shiftKey === false) {
      numberButtonOnClick(e.code.slice(-1));
      //negative number, but not minus
    } else if (e.code === "Minus" && operand1 === "") {
      negativeButtonOnClick();
    }
    //operators
    else if (operator_array.includes(e.key)) {
      operatorButtonOnClick(e.key);
    }
    //enter
    else if (e.code === "Enter") {
      equalsButtonOnClick();
    }
    //delete
    else if (e.code === "Backspace") {
      handleDelete();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

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
      <div className="resultContainer">Result: {eval(result)}</div>{" "}
      <div> {operand1 + operator + operand2}</div>
      <div>{expression}</div>
    </div>
  );
}

export default App;
