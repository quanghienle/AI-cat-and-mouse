import React, { Component } from 'react';
import appConfig from '../appConfig';
import InitState from '../utils/InitState'
import MousePath from '../utils/MousePath'
import Button from '@material-ui/core/Button';
import Cell from './Cell';
import Movements from '../utils/Movements';
import BFS from '../search/BFS';

class Grid extends Component {
    constructor(props) {
        super(props);
        const { gridSize, numberOfCheese, numberOfMice, cellSize } = appConfig;
        const init = new InitState(gridSize, numberOfCheese, numberOfMice);
        const { catLocation, mouseLocations, cheeseLocations } = init.getInitialState();
        const mousePath = new MousePath(mouseLocations[0], cheeseLocations).findMousePath()[1];
        const catPath = new BFS().bfs(catLocation, mousePath);

        this.state = {
            mouseTurn: true,
            stateNum: 0,
            gridSize: gridSize,
            cellSize: cellSize,
            catLocation: catLocation,
            mouseLocation: mouseLocations[0],
            cheeseLocations: cheeseLocations,
            mousePath: mousePath,
            catPath: catPath,
        }

    }

    ObjMovements = new Movements();

    mouseMove = (dir) => {
        // console.log(this.state.mouseCoords);
        const nextMove = this.ObjMovements.mouseMove(dir, this.state.mouseLocation);
        this.setState({ mouseLocation: nextMove });
    }

    catMove = (dir) => {
        const nextMove = this.ObjMovements.catMove(dir, this.state.catLocation);
        this.setState({ catLocation: nextMove });
    }

    mouseEatsCheese() {
        const canEatCheese = cheese => !(JSON.stringify(cheese) === JSON.stringify(this.state.mouseLocation));
        this.setState({ cheeseLocations: this.state.cheeseLocations.filter(canEatCheese) });
    }


    componentDidMount() {
        
        const intervalId = setInterval(() => {
            const iteration = this.state.stateNum;
            const nextLocation = this.state.mousePath[iteration];
            this.setState({ mouseLocation: nextLocation });

            this.setState({ catLocation: this.state.catPath[iteration].getCatCoords() });
            this.mouseEatsCheese();

            const cond = JSON.stringify(this.state.catLocation) === JSON.stringify(this.state.mouseLocation);

            (iteration === this.state.mousePath.length - 1 || cond)
                ? clearInterval(intervalId)
                : this.setState({ stateNum: iteration + 1 });
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
                        backgroundImage: "linear-gradient(to right, lavender 1px, transparent 1px),"
                            + "linear-gradient(to bottom, lavender 1px, transparent 1px)",
                    }}>

                    {/* {Object.keys(this.ObjMovements.mouseMovements).map(dir => {
                        const coor = this.ObjMovements.mouseMove(dir, this.state.mouseLocation, this.state.gridSize - 1);
                        return <Cell cellName="guide" xyCoor={coor} onClick={() => this.mouseMove(dir)} />
                    })} */}

                    {/* {Object.keys(this.ObjMovements.catMovements).map((dir, index) => {
                        const coor = this.ObjMovements.catMove(dir, this.state.catLocation);
                        return <Cell cellName="guide" xyCoor={coor} onClick={() => this.catMove(dir)} />
                    })} */}

                    {this.state.cheeseLocations.map((cheese, index) =>
                        <Cell cellName="cheese" xyCoor={cheese} />
                    )}
                    <Cell cellName="mouse" xyCoor={this.state.mouseLocation} />
                    <Cell cellName="cat" xyCoor={this.state.catLocation} />

                </div>

                {/* <div>
                    {Object.keys(this.ObjMovements.mouseMovements).map(dir => {
                        return <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => { this.mouseMove(dir) }}>
                            {dir}
                        </Button>
                    })}
                </div>

                <div>
                    {Object.keys(this.ObjMovements.catMovements).map(dir => {
                        return <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => { this.catMove(dir) }}>
                            {dir}
                        </Button>

                    })}
                </div> */}

            </div>
        );
    }
}

export default Grid;