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
        next     : "0",
        operation: "",
    };

    onClick = (btn: string) => {
        this.setState({...this.calculate(this.state, btn)});
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
    calculate(stat: AppState, btn: string): {} {
        if (btn === "AC") {
            return {
                total    : "",
                next     : "",
                operation: "",
            };
        }

        if (isNumber(btn)) {
            if (btn === "0" && stat.next === "0") {
                return {};
            }
            // If there is an operation, update next
            if (stat.operation) {
                if (stat.next) {
                    return {next: stat.next + btn};
                }
                return {next: btn};
            }
            // If there is no operation, update next and clear the value
            if (stat.next) {
                const next = stat.next === "0" ? btn : stat.next + btn;

                return {next, total: "",};
            }
            return {next: btn, total: "",};
        }

        if (btn === "%") {
            if (stat.operation && stat.next) {
                const result = operate(stat.total, stat.next, stat.operation);
                return {
                    total    : Big(result).div(Big("100")).toString(),
                    next     : "",
                    operation: "",
                };
            }
            if (stat.next) {
                return {next: Big(stat.next).div(Big("100")).toString()};
            }
            return {};
        }

        if (btn === ".") {
            if (stat.next) {
                // ignore a . if the next number already has one
                if (stat.next.includes(".")) {
                    return {};
                }
                return {next: stat.next + "."};
            }
            return {next: "0."};
        }

        if (btn === "=") {
            if (stat.next && stat.operation) {
                return {
                    total    : operate(stat.total, stat.next, stat.operation),
                    next     : "",
                    operation: "",
                };
            } else {
                // '=' with no operation, nothing to do
                return {};
            }
        }

        if (btn === "+/-") {
            if (stat.next) {
                return {next: (-1 * parseFloat(stat.next)).toString()};
            }
            if (stat.total) {
                return {total: (-1 * parseFloat(stat.total)).toString()};
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
        if (stat.operation) {
            return {
                total    : operate(stat.total, stat.next, stat.operation),
                next     : "",
                operation: btn,
            };
        }

        // no operation yet, but the user typed one

        // The user hasn't typed a number yet, just save the operation
        if (!stat.next) {
            return {operation: btn};
        }

        // save the operation and shift 'next' into 'total'
        return {
            total    : stat.next,
            next     : "",
            operation: btn,
        };
    }

    render() {
        return (
            <div className="component-app">
                <Display value={this.state.next || this.state.total || "0"}/>
                <ButtonPanel clickHandler={this.onClick}/>
            </div>
        );
    }
}

export default App;