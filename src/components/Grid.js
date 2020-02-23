import React, { Component } from "react";
import appConfig from "../appConfig";
import InitState from "../utils/InitState";
import MousePath from "../utils/MousePath";
import Button from "@material-ui/core/Button";
import Cell from "./Cell";
import Movements from "../utils/Movements";
import Searches from "../search/SearchAlgo";
import "./Grid.css";

class Grid extends Component {
  constructor(props) {
    super(props);
    const { gridSize, numberOfCheese, numberOfMice } = appConfig;

    const init = new InitState(gridSize, numberOfCheese, numberOfMice);

    const {
      catLocation,
      mouseLocations,
      cheeseLocations
    } = init.getInitialState();

    const mousePath = new MousePath(
      mouseLocations[0],
      cheeseLocations
    ).findMousePath()[1];

    console.log("Mouse Path:\t", mousePath);

    this.state = {
      data: "",
      start: false,
      mouseTurn: true,
      stateNum: 1,
      catLocation: catLocation,
      mouseLocation: mouseLocations[0],
      cheeseLocations: cheeseLocations,
      mousePath: mousePath,
      catPath: [catLocation]
    };
  }

  test_case() {
    const mouse = [9, 0];
    const cat = [1, 9];
    const cheese = [
      [7, 5],
      [5, 1],
      [2, 7]
    ];
    const mousePath = new MousePath(mouse, cheese).findMousePath()[1];

    console.log(mousePath);

    this.setState({ start: false });
    this.setState({ mouseTurn: true });
    this.setState({ stateNum: 1 });
    this.setState({ catLocation: cat });
    this.setState({ mouseLocation: mouse });
    this.setState({ cheeseLocations: cheese });
    this.setState({ mousePath: mousePath });
  }

  reset() {
    window.location.reload();
  }

  catMove = dir => {
    const nextMove = Movements.catMove(dir, this.state.catLocation);
    this.setState({ catLocation: nextMove });
  };

  mouseEatsCheese() {
    const canEatCheese = cheese =>
      !(
        cheese[0] === this.state.mouseLocation[0] &&
        cheese[1] === this.state.mouseLocation[1]
      );
    this.setState({
      cheeseLocations: this.state.cheeseLocations.filter(canEatCheese)
    });
  }

  catCaughtMouse() {
    return (
      this.state.catLocation[0] === this.state.mouseLocation[0] &&
      this.state.catLocation[1] === this.state.mouseLocation[1]
    );
  }

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch("/backend");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.start && this.state.start !== prevState.start) {
      const intervalId = setInterval(() => {
        const iteration = this.state.stateNum;

        if (this.state.mouseTurn) {
          const nextLocation = this.state.mousePath[iteration];
          console.log("mouse:\t", nextLocation);
          this.setState({ mouseLocation: nextLocation });
          this.mouseEatsCheese();
          this.setState({ mouseTurn: false });
        } else {
          const index =
            iteration > this.state.catPath.length - 1
              ? this.state.catPath.length - 1
              : iteration;
          console.log("cat:\t", this.state.catPath[index]);
          this.setState({ catLocation: this.state.catPath[index] });
          this.setState({ mouseTurn: true });
          this.setState({ stateNum: iteration + 1 });
        }

        if (
          iteration === this.state.mousePath.length - 1 ||
          this.catCaughtMouse()
        ) {
          clearInterval(intervalId);
        }
      }, appConfig.speed);
    }
  }

  render() {
    return (
      <div className="game-container">
        <div className="search-buttons">
          {Searches(this.state.catLocation, this.state.mousePath).map(
            (e, index) => (
              <Button
                key={index}
                variant="outlined"
                color="primary"
                onClick={() => {
                  const newCatPath = e.search.findPath();
                  this.setState({ catPath: newCatPath });
                  this.setState({ start: true });
                }}
              >
                {e.name}
              </Button>
            )
          )}
          <Button
            variant="outlined"
            color="primary"
            onClick={this.test_case.bind(this)}
          >
            Test
          </Button>
          <Button variant="outlined" color="primary" onClick={this.reset}>
            {this.state.data}
          </Button>
        </div>

        <div
          className="grid"
          style={{
            width: appConfig.gridSize * appConfig.cellSize,
            height: appConfig.gridSize * appConfig.cellSize,
            backgroundSize: `${appConfig.cellSize}px ${appConfig.cellSize}px`
          }}
        >
          {/* {Object.keys(Movements.catMovements).map((dir, index) => {
            const coor = Movements.catMove(dir, this.state.catLocation);
            return (
              <Cell
                key={index}
                cellName="guide"
                xyCoor={coor}
                onClick={() => this.catMove(dir)}
              />
            );
          })} */}
          {this.state.cheeseLocations.map((cheese, index) => (
            <Cell cellName="cheese" key={index} xyCoor={cheese} />
          ))}
          <Cell cellName="mouse" xyCoor={this.state.mouseLocation} />
          <Cell cellName="cat" xyCoor={this.state.catLocation} />
        </div>
      </div>
    );
  }
}

export default Grid;
