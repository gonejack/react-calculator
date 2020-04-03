import React, {Component} from "react";
import Button from "./Button";

import "./ButtonPanel.css";

type ButtonPanelProps = {
    clickHandler: (buttonName: string) => void
}

class ButtonPanel extends Component<ButtonPanelProps, {}> {

    onClick = (buttonName: string) => {
        this.props.clickHandler(buttonName);
    };

    render() {
        return (
            <div className="component-button-panel">
                <div>
                    <Button name="AC" clickHandler={this.onClick}/>
                    <Button name="+/-" clickHandler={this.onClick}/>
                    <Button name="%" clickHandler={this.onClick}/>
                    <Button name="÷" clickHandler={this.onClick} orange/>
                </div>
                <div>
                    <Button name="7" clickHandler={this.onClick}/>
                    <Button name="8" clickHandler={this.onClick}/>
                    <Button name="9" clickHandler={this.onClick}/>
                    <Button name="x" clickHandler={this.onClick} orange/>
                </div>
                <div>
                    <Button name="4" clickHandler={this.onClick}/>
                    <Button name="5" clickHandler={this.onClick}/>
                    <Button name="6" clickHandler={this.onClick}/>
                    <Button name="-" clickHandler={this.onClick} orange/>
                </div>
                <div>
                    <Button name="1" clickHandler={this.onClick}/>
                    <Button name="2" clickHandler={this.onClick}/>
                    <Button name="3" clickHandler={this.onClick}/>
                    <Button name="+" clickHandler={this.onClick} orange/>
                </div>
                <div>
                    <Button name="0" clickHandler={this.onClick} wide/>
                    <Button name="." clickHandler={this.onClick}/>
                    <Button name="=" clickHandler={this.onClick} orange/>
                </div>
            </div>
        );
    }
}

export default ButtonPanel;