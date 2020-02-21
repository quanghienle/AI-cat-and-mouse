import React, { Component } from 'react';
import appConfig from '../appConfig';
import InitState from '../utils/InitState'
import MousePath from '../utils/MousePath'
import Button from '@material-ui/core/Button';
import Cell from './Cell';
// import Movements from '../utils/Movements';
import BFS from '../search/BFS';
import DFS from '../search/DFS';
import A_star from '../search/A_star';
import Heuristics from '../search/Heuristics';

class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = this.initGameState();
        // this.reset = this.reset.bind(this)
    }

    // ObjMovements = new Movements();

    initGameState() {
        const { gridSize, numberOfCheese, numberOfMice} = appConfig;
        const init = new InitState(gridSize, numberOfCheese, numberOfMice);
        const { catLocation, mouseLocations, cheeseLocations } = init.getInitialState();
        const mousePath = new MousePath(mouseLocations[0], cheeseLocations).findMousePath()[1];;
        console.log(mousePath);

        return {
            start: false,
            mouseTurn: true,
            stateNum: 1,
            catLocation: catLocation,
            mouseLocation: mouseLocations[0],
            cheeseLocations: cheeseLocations,
            mousePath: mousePath,
            catPath: [catLocation],
        }
    }

    reset() {
        window.location.reload();
   
        }
        

    mouseEatsCheese() {
        const canEatCheese = cheese => !(JSON.stringify(cheese) === JSON.stringify(this.state.mouseLocation));
        this.setState({ cheeseLocations: this.state.cheeseLocations.filter(canEatCheese) });
    }

    catCaughtMouse() {
        return this.state.catLocation[0] === this.state.mouseLocation[0]
            && this.state.catLocation[1] === this.state.mouseLocation[1];
    }


    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.state.start && this.state.start !== prevState.start) {
            const intervalId = setInterval(() => {
                const iteration = this.state.stateNum;
                

                if (this.state.mouseTurn) {
                    // const index = iteration > this.state.catPath.length - 1 ? this.state.catPath.length - 1 : iteration;
                    const nextLocation = this.state.mousePath[iteration];
                    console.log("mouse:\t", nextLocation);
                    this.setState({ mouseLocation: nextLocation });
                    this.mouseEatsCheese();
                    this.setState({ mouseTurn: false });
                } else {
                    const index = iteration > this.state.catPath.length - 1 ? this.state.catPath.length - 1 : iteration;
                    console.log("cat:\t", this.state.catPath[index]);
                    this.setState({ catLocation: this.state.catPath[index] });
                    this.setState({ mouseTurn: true });
                    this.setState({ stateNum: iteration + 1 });
                }

                if (iteration === this.state.mousePath.length || this.catCaughtMouse()) {
                    // this.reset()
                    // this.setState({ start: false});
                    clearInterval(intervalId);
                    
                }
            }, 1000);
            // console.log(this.state.start)
        }


    }

    render() {
        return (
            <div>
                <div
                    className="grid"
                    style={{
                        width: appConfig.gridSize * appConfig.cellSize,
                        height: appConfig.gridSize * appConfig.cellSize,
                        position: "relative",
                        margin: "50px auto",
                        outline: "2px solid red",
                        backgroundSize: `${appConfig.cellSize}px ${appConfig.cellSize}px`,
                        backgroundImage: "linear-gradient(to right, lavender 1px, transparent 1px),"
                            + "linear-gradient(to bottom, lavender 1px, transparent 1px)",
                    }}>

                    {/* {Object.keys(this.ObjMovements.mouseMovements).map(dir => {
                        const coor = this.ObjMovements.mouseMove(dir, this.state.mouseLocation, appConfig.gridSize - 1);
                        return <Cell cellName="guide" xyCoor={coor} onClick={() => this.mouseMove(dir)} />
                    })} */}

                    {/* {Object.keys(this.ObjMovements.catMovements).map((dir, index) => {
                        const coor = this.ObjMovements.catMove(dir, this.state.catLocation);
                        return <Cell cellName="guide" xyCoor={coor} onClick={() => this.catMove(dir)} />
                    })} */}

                    {this.state.cheeseLocations.map((cheese, index) =>
                        <Cell cellName="cheese" key={index} xyCoor={cheese} />
                    )}
                    <Cell cellName="mouse" xyCoor={this.state.mouseLocation} />
                    <Cell cellName="cat" xyCoor={this.state.catLocation} />

                </div>

                <div>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            const newCatPath = new DFS(this.state.catLocation, this.state.mousePath).findPath();
                            console.log(newCatPath);
                            this.setState({ catPath: newCatPath });
                            this.setState({ start: true });
                        }}>
                        DFS
                    </Button>

                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            const newCatPath = new BFS(this.state.catLocation, this.state.mousePath).findPath();
                            console.log(newCatPath);
                            this.setState({ catPath: newCatPath });
                            this.setState({ start: true });
                        }}>
                        BFS
                    </Button>


                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            const h = Heuristics.pythagorean;
                            const newCatPath = new A_star(this.state.catLocation, this.state.mousePath, h).findPath();
                            console.log(newCatPath);
                            this.setState({ catPath: newCatPath });
                            this.setState({ start: true });
                        }}>
                        A* Pythagorean
                    </Button>


                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            const h = Heuristics.middlePoint;
                            const newCatPath = new A_star(this.state.catLocation, this.state.mousePath, h).findPath();
                            console.log(newCatPath);
                            this.setState({ catPath: newCatPath });
                            this.setState({ start: true });
                        }}>
                        A* Middle Point
                    </Button>


                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            const h = Heuristics.average;
                            const newCatPath = new A_star(this.state.catLocation, this.state.mousePath, h).findPath();
                            console.log(newCatPath);
                            this.setState({ catPath: newCatPath });
                            this.setState({ start: true });
                        }}>
                        A* Average
                    </Button>

                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={this.reset}>
                        Restart 
                    </Button>

                </div>

                {/* <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                        this.setState({ start: true });
                    }}>
                    Start
                </Button> */}

                {/* <div>
                    {Object.keys(this.ObjMovements.mouseMovements).map(dir => {
                        return <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                                const nextMove = this.ObjMovements.mouseMove(dir, this.state.mouseLocation);
                                this.setState({ mouseLocation: nextMove });
                            }}>
                            {dir}
                        </Button>
                    })}
                </div>

                <div>
                    {Object.keys(this.ObjMovements.catMovements).map(dir => {
                        return <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                                const nextMove = this.ObjMovements.catMove(dir, this.state.catLocation);
                                this.setState({ catLocation: nextMove });
                            }}>
                            {dir}
                        </Button>

                    })}
                </div> */}

            </div>
        );
    }
}

export default Grid;