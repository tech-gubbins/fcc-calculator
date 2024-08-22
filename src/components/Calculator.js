import React, { useState } from "react";
import Button from "./Button";

const Calculator = () => {
    const [input, setInput] = useState("0");
    const [result, setResult] = useState(null);
    const [lastClicked, setLastClicked] = useState(null);

    const processTokens = (tokens) => {
        console.log("Original tokens:", tokens);

        const processedTokens = [];
        let lastToken = null;

        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];

            console.log(`Processing token: ${token}, Last token: ${lastToken}`);

            if (/[+\-*/]/.test(token)) {
                if (lastToken === null || /[+\-*/]/.test(lastToken)) {
                    // If the previous token is null or another operator, handle unary minus or leading operator
                    if (token === "-") {
                        // Handle unary minus
                        processedTokens.push(token);
                    }
                    // Ignore the current operator if it's not a unary minus and replace the last operator if needed
                    else if (lastToken && /[+\-*/]/.test(lastToken)) {
                        processedTokens.pop();
                        processedTokens.push(token);
                    }
                } else if (lastToken === "-" && token === "+") {
                    // Replace '-' with '+' if they are consecutive
                    processedTokens.pop();
                    processedTokens.push("+");
                } else {
                    // Replace the previous operator with the current one
                    if (
                        processedTokens.length > 0 &&
                        /[+\-*/]/.test(
                            processedTokens[processedTokens.length - 1]
                        )
                    ) {
                        processedTokens.pop();
                    }
                    processedTokens.push(token);
                }
                lastToken = token;
            } else {
                // It's a number
                processedTokens.push(token);
                lastToken = token;
            }
        }

        console.log("Processed tokens:", processedTokens);

        return processedTokens;
    };

    const evaluateExpression = (tokens) => {
        console.log("Evaluating tokens:", tokens);

        //debugger;

        let expression = tokens.join("");
        let newExpression = "";
        let isUnaryMinus = false;

        for (let i = 0; i < expression.length; i++) {
            const char = expression[i];

            if (char === "-") {
                // Check if it's a unary minus
                if (i === 0 || /[+\-*/]/.test(expression[i - 1])) {
                    // Unary minus at the start or after another operator
                    newExpression += "(-"; // Directly add the unary minus
                    isUnaryMinus = true;
                } else {
                    // Binary minus
                    newExpression += char;
                    isUnaryMinus = false;
                }
            } else {
                if (isUnaryMinus) {
                    // Close any previously opened parenthesis
                    newExpression += char;
                    newExpression += ")";
                    isUnaryMinus = false;
                } else {
                    newExpression += char;
                }
            }
        }

        console.log("Transformed expression:", newExpression);

        try {
            return eval(newExpression);
        } catch {
            return "Error";
        }
    };

    const tokenize = (input) => {
        const tokens = [];
        let currentNumber = "";

        for (let char of input) {
            if (/\d|\./.test(char)) {
                currentNumber += char;
            } else if (/[+\-*/]/.test(char)) {
                if (currentNumber !== "") {
                    tokens.push(currentNumber);
                    currentNumber = "";
                }
                tokens.push(char);
            }
        }

        if (currentNumber !== "") {
            tokens.push(currentNumber);
        }

        return tokens;
    };

    const handleButtonClick = (label) => {
        if (label === "C") {
            setInput("0");
            setResult(null);
            setLastClicked(null);
        } else if (label === "=") {
            const tokens = tokenize(input);
            const processedTokens = processTokens(tokens);
            const reprocessedTokens = processTokens(processedTokens);
            const evaluated = evaluateExpression(reprocessedTokens);
            setResult(evaluated);
            setInput(evaluated.toString());
            setLastClicked(label);
        } else if (["+", "-", "*", "/"].includes(label)) {
            setInput((prev) => prev + label);
            setLastClicked(label);
        } else if (label === ".") {
            const parts = input.split(/[-+*/]/);
            const lastPart = parts[parts.length - 1];
            if (!lastPart.includes(".")) {
                setInput((prev) => prev + label);
            }
            setLastClicked(label);
        } else {
            if (input === "0" && label !== ".") {
                setInput(label);
            } else {
                setInput((prev) => prev + label);
            }
            setLastClicked(label);
        }
    };

    return (
        <div className="flex flex-col items-center p-4 bg-gray-100 rounded shadow-lg w-120">
            <div
                id="display"
                className="mb-4 p-4 w-full bg-white text-right rounded shadow">
                <div className="text-2xl text-gray-500">{input}</div>
            </div>
            <div className="grid grid-cols-4 gap-4">
                <Button
                    id="clear"
                    label="C"
                    onClick={handleButtonClick}
                    className="col-span-2 bg-red-500 text-white"
                />
                <Button
                    id="divide"
                    label="/"
                    onClick={handleButtonClick}
                />
                <Button
                    id="multiply"
                    label="*"
                    onClick={handleButtonClick}
                />
                <Button
                    id="seven"
                    label="7"
                    onClick={handleButtonClick}
                />
                <Button
                    id="eight"
                    label="8"
                    onClick={handleButtonClick}
                />
                <Button
                    id="nine"
                    label="9"
                    onClick={handleButtonClick}
                />
                <Button
                    id="subtract"
                    label="-"
                    onClick={handleButtonClick}
                />
                <Button
                    id="four"
                    label="4"
                    onClick={handleButtonClick}
                />
                <Button
                    id="five"
                    label="5"
                    onClick={handleButtonClick}
                />
                <Button
                    id="six"
                    label="6"
                    onClick={handleButtonClick}
                />
                <Button
                    id="add"
                    label="+"
                    onClick={handleButtonClick}
                    className="row-span-2"
                />
                <Button
                    id="one"
                    label="1"
                    onClick={handleButtonClick}
                />
                <Button
                    id="two"
                    label="2"
                    onClick={handleButtonClick}
                />
                <Button
                    id="three"
                    label="3"
                    onClick={handleButtonClick}
                />
                <Button
                    id="zero"
                    label="0"
                    onClick={handleButtonClick}
                />
                <Button
                    id="decimal"
                    label="."
                    onClick={handleButtonClick}
                />
                <Button
                    id="equals"
                    label="="
                    onClick={handleButtonClick}
                    className="col-span-2 !bg-blue-500 text-white"
                />
            </div>
        </div>
    );
};

export default Calculator;
