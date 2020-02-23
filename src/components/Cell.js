import React, { Component } from 'react';
import appConfig from '../appConfig';
import cheeseImg from '../assets/cheese.png';
import catImg from '../assets/cat.png';
import mouseImg from '../assets/mouse.png';
// import guideImg from '../assets/guide.png';
import guideImg from '../assets/offwhite.png';

const images = {
    "cheese": cheeseImg,
    "mouse": mouseImg,
    "cat": catImg,
    "guide": guideImg
}

class Cell extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    };

    render() {
        return (
            <div style={{
                left: `${this.props.xyCoor[0] * appConfig.cellSize}px`,
                top: `${this.props.xyCoor[1] * appConfig.cellSize}px`,
                position: "absolute",
                textAlign: "center",
                width: appConfig.cellSize,
                height: appConfig.cellSize,
                backgroundColor: appConfig.color[this.props.cellName],
                zIndex: 1,

            }}>
                <button
                    onClick={this.props.onClick}
                    style={{
                        width: "inherit",
                        height: "inherit",
                        padding: 0,
                        // backgroundColor: "inherit"
                    }}>
                    <img
                        src={images[this.props.cellName]}
                        alt={this.props.cellName}
                        height={`${appConfig.cellSize}px`}
                        width={`${appConfig.cellSize}px`}
                    />
                </button>
            </div>
        );
    }
}

export default Cell;