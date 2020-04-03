import React from "react";
import "./Button.css";

type ButtonProps = {
    clickHandler: (buttonName: string) => void,
    name: string,
    orange: boolean,
    wide: boolean,
}

class Button extends React.Component<ButtonProps> {
    static defaultProps = {
        orange: false,
        wide: false,
    };

    onClick = () => {
        this.props.clickHandler(this.props.name);
    };

    render() {
        const className = [
            "component-button",
            this.props.orange ? "orange" : "",
            this.props.wide ? "wide" : "",
        ];

        return (
            <div className={className.join(" ").trim()}>
                <button onClick={this.onClick}>{this.props.name}</button>
            </div>
        );
    }
}

export default Button;
