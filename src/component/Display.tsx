import React, {Component} from "react";

import "./Display.css";

type IProps = {
    value: string
}

class Display extends Component<IProps, {}> {
    render() {
        return (
            <div className="component-display">
                <div>{this.props.value}</div>
            </div>
        );
    }
}

export default Display;