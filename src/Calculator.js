import Button from "./Button.js";
import { useEffect, useState } from "react";

function Calculator() {
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
    if (operator != "" && operand2 == "") {
      updateOperator(element);
      updateOperand2("");
    }
    if (operator != "" && operand2 != "") {
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
    if (operand2 != "") {
      updateResult(operand1 + operator + operand2);
      updateOperand1(operand1 + operator + operand2);
      updateOperator("");
      updateOperand2("");
    } else {
      updateResult(operand1);
    }
  };

  const checkResultError = (answer) => {
    if (Number.isNaN(answer)) {
      return "Error! Enter another expression.";
    }
    return answer;
  };

  const handleIncompleteResult = (answer) => {
    if (operator_array.includes(answer.toString().slice(-1))) {
      return answer.toString().slice(0, -1);
    }
    return answer;
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

  const decimalButtonOnClick = () => {
    if (operator === "") {
      if (!operand1.includes(".")) {
        updateOperand1(operand1.toString() + ".");
      }
    } else {
      if (!operand2.includes(".")) {
        updateOperand2(operand2.toString() + ".");
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
          containerID={`number${i}Container`}
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
    // numbers
    if (e.code.slice(0, 5) === "Digit" && e.shiftKey === false) {
      numberButtonOnClick(e.code.slice(-1));
      //negative number, but not minus
    } else if (e.code === "Minus" && operand1 === "") {
      negativeButtonOnClick();
      // decimal point
    } else if (e.key === ".") {
      decimalButtonOnClick();
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
      <div className="calculatorDisplay">
        <div className="resultContainer">
          {checkResultError(eval(handleIncompleteResult(result)))}
        </div>{" "}
        <div className="expressionContainer">
          {operand1 + operator + operand2}
        </div>
      </div>
      <div className="calculatorButtons">
        {operator_array.map((element) => {
          return (
            <Button // buttons for +, -, *, /, ** in a loop
              key={element}
              display={element}
              containerClassName={"operatorContainer"}
              onClick={() => {
                operatorButtonOnClick(element);
              }}
            />
          );
        })}
        {loopNumberComponents()}
        <Button // decimal point button
          display={"."}
          containerClassName={"decimalContainer"}
          onClick={() => {
            decimalButtonOnClick();
          }}
        />
        <Button // equals button
          display={"Equals"}
          containerClassName={"equalsContainer"}
          onClick={() => {
            equalsButtonOnClick();
          }}
        />
        <Button //  clear button
          display={"Clear"}
          containerClassName={"clearContainer"}
          onClick={() => clearButtonOnClick()}
        />
        <Button // negative button
          display={"Negative"}
          containerClassName={"negativeContainer"}
          onClick={() => {
            negativeButtonOnClick();
          }}
        />
      </div>
    </div>
  );
}

export default Calculator;
