import React, {Component} from "react";
import Display from "./Display";
import ButtonPanel from "./ButtonPanel";
import isNumber from "../util/isNumber";
import operate from "../util/operate";
import Big from "big.js";

import "./App.css";

type AppState = {
    total: string,
    next: string,
    operation: string,
}

class App extends Component<{}, AppState> {
    state = {
        total    : "",
        next     : "",
        operation: "",
    };

    handleClick = (buttonName: string) => {
        this.setState({...this.calculate(this.state, buttonName)});
    };

    /**
     * Given a button name and a calculator data object, return an updated
     * calculator data object.
     *
     * Calculator data object contains:
     *   total:String      the running total
     *   next:String       the next number to be operated on with the total
     *   operation:String  +, -, etc.
     */
    calculate(obj: AppState, buttonName: string): {} {
        if (buttonName === "AC") {
            return {
                total    : "",
                next     : "",
                operation: "",
            };
        }

        if (isNumber(buttonName)) {
            if (buttonName === "0" && obj.next === "0") {
                return {};
            }
            // If there is an operation, update next
            if (obj.operation) {
                if (obj.next) {
                    return {next: obj.next + buttonName};
                }
                return {next: buttonName};
            }
            // If there is no operation, update next and clear the value
            if (obj.next) {
                const next = obj.next === "0" ? buttonName : obj.next + buttonName;
                return {
                    next,
                    total: "",
                };
            }
            return {
                next : buttonName,
                total: "",
            };
        }

        if (buttonName === "%") {
            if (obj.operation && obj.next) {
                const result = operate(obj.total, obj.next, obj.operation);
                return {
                    total    : Big(result).div(Big("100")).toString(),
                    next     : "",
                    operation: "",
                };
            }
            if (obj.next) {
                return {
                    next: Big(obj.next)
                        .div(Big("100"))
                        .toString(),
                };
            }
            return {};
        }

        if (buttonName === ".") {
            if (obj.next) {
                // ignore a . if the next number already has one
                if (obj.next.includes(".")) {
                    return {};
                }
                return {next: obj.next + "."};
            }
            return {next: "0."};
        }

        if (buttonName === "=") {
            if (obj.next && obj.operation) {
                return {
                    total    : operate(obj.total, obj.next, obj.operation),
                    next     : "",
                    operation: "",
                };
            } else {
                // '=' with no operation, nothing to do
                return {};
            }
        }

        if (buttonName === "+/-") {
            if (obj.next) {
                return {next: (-1 * parseFloat(obj.next)).toString()};
            }
            if (obj.total) {
                return {total: (-1 * parseFloat(obj.total)).toString()};
            }
            return {};
        }

        // Button must be an operation

        // When the user presses an operation button without having entered
        // a number first, do nothing.
        // if (!obj.next && !obj.total) {
        //   return {};
        // }

        // User pressed an operation button and there is an existing operation
        if (obj.operation) {
            return {
                total    : operate(obj.total, obj.next, obj.operation),
                next     : "",
                operation: buttonName,
            };
        }

        // no operation yet, but the user typed one

        // The user hasn't typed a number yet, just save the operation
        if (!obj.next) {
            return {operation: buttonName};
        }

        // save the operation and shift 'next' into 'total'
        return {
            total    : obj.next,
            next     : "",
            operation: buttonName,
        };
    }

    render() {
        return (
            <div className="component-app">
                <Display value={this.state.next || this.state.total || "0"}/>
                <ButtonPanel clickHandler={this.handleClick}/>
            </div>
        );
    }
}

export default App;