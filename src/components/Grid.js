import React, { Component } from 'react';
import appConfig from '../appConfig';
import InitialState from '../utils/InitialState'
import Button from '@material-ui/core/Button';
import Cell from './Cell';
import Movements from '../utils/ObjectMovements';

class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stateNum: 0,
            gridSize: appConfig.gridSize,
            cellSize: appConfig.cellSize,
            catLocation: InitialState.objectLocations.cat,
            mouseLocation: InitialState.objectLocations.mouse,
            cheeseLocations: InitialState.objectLocations.cheese,
            mousePath: InitialState.mousePath,
        }

    }


    mouseMove = (dir) => {
        const nextMove = Movements.mouse[dir](this.state.mouseLocation);
        this.setState({ mouseLocation: nextMove });
    }

    catMove = (dir) => {
        const nextMove = Movements.cat[dir](this.state.catLocation);
        this.setState({ catLocation: nextMove });
    }


    componentDidMount() {
        const intervalId = setInterval(() => {
            const iteration = this.state.stateNum;
            this.mouseMove(this.state.mousePath[iteration]);

            const mouseEatsCheese = cheese => !(cheese[0] === this.state.mouseLocation[0] && cheese[1] === this.state.mouseLocation[1]);

            this.setState({ cheeseLocations: this.state.cheeseLocations.filter(mouseEatsCheese) });


            if (iteration === this.state.mousePath.length - 1) {
                clearInterval(intervalId);
            } else {
                this.setState({ stateNum: iteration + 1 });
            }
        }, 1000);
    }



    render() {
        return (
            <div>
                <div
                    className="grid"
                    style={{
                        width: this.state.gridSize * this.state.cellSize,
                        height: this.state.gridSize * this.state.cellSize,
                        position: "relative",
                        margin: "50px auto",
                        outline: "2px solid red",
                        backgroundSize: `${this.state.cellSize}px ${this.state.cellSize}px`,
                        backgroundImage: "linear-gradient(to right, lavender 1px, transparent 1px), linear-gradient(to bottom, lavender 1px, transparent 1px)",
                    }}>
                    {/* 
                    {Object.keys(Movements.mouse).map(dir => {
                        const coor = Movements.mouse[dir](this.state.mouseLocation, this.state.gridSize - 1);
                        return <Cell cellName="guide" xyCoor={coor} description={dir} onClick={() => this.mouseMove(dir)} />
                    })} */}

                    {Object.keys(Movements.cat).map(dir => {
                        const coor = Movements.cat[dir](this.state.catLocation);
                        return <Cell cellName="guide" xyCoor={coor} onClick={() => this.catMove(dir)} />
                    })}

                    {this.state.cheeseLocations.map(cheese =>
                        <Cell cellName="cheese" xyCoor={cheese} />
                    )}
                    <Cell cellName="cat" xyCoor={this.state.catLocation} />
                    <Cell cellName="mouse" xyCoor={this.state.mouseLocation} />




                </div>

                <div>
                    {Object.keys(Movements.mouse).map(dir => {
                        return <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => { this.mouseMove(dir) }}>
                            {dir}
                        </Button>

                    })}
                </div>

                <div>
                    {Object.keys(Movements.cat).map(dir => {
                        return <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => { this.catMove(dir) }}>
                            {dir}
                        </Button>

                    })}
                </div>

            </div>
        );
    }
}

export default Grid;