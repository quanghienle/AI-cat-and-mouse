import React, { Component } from "react";
import appConfig from "../appConfig";
import MousePath from "../utils/MousePath";
import Button from "@material-ui/core/Button";
import Cell from "./Cell";
import Searches from "../search/SearchAlgo";
import "./Grid.css";
import _ from "underscore";

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      start: false,
      mouseTurn: true,
      stateNum: 1
    };
  }

  reset() {
    window.location.reload();
  }

  mouseMove(iteration) {
    const nextLocation = this.state.mousePath[iteration];
    console.log("mouse:\t", nextLocation);
    const allCheese = this.state.cheeseLocations.filter(
      cheese => !_.isEqual(cheese, this.state.mouseLocation)
    );
    this.setState({
      mouseLocation: nextLocation,
      mouseTurn: false,
      cheeseLocations: allCheese
    });
  }

  catMove(iteration) {
    const index =
      iteration > this.state.catPath.length - 1
        ? this.state.catPath.length - 1
        : iteration;
    console.log("cat:\t", this.state.catPath[index]);
    this.setState({
      catLocation: this.state.catPath[index],
      mouseTurn: true,
      stateNum: iteration + 1
    });
  }

  UNSAFE_componentWillMount() {
    this.callBackendAPI()
      .then(res => {
        console.log("Mouse Path: ", res.mousePath);
        this.setState({
          catLocation: res.catLocation,
          mouseLocation: res.mouseLocation,
          cheeseLocations: res.cheeseLocations,
          mousePath: res.mousePath,
          loading: false
        });
      })
      .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch("/init");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  handleOnclick = async index => {
    const response = await fetch("/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        searchIndex: index,
        cat: this.state.catLocation,
        mousePath: this.state.mousePath
      })
    });
    const body = await response.json();
    console.log("Cat Path: ", body.catPath);
    this.setState({ catPath: body.catPath, start: true });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.start && this.state.start !== prevState.start) {
      const intervalId = setInterval(() => {
        const iteration = this.state.stateNum;

        this.state.mouseTurn
          ? this.mouseMove(iteration)
          : this.catMove(iteration);

        if (
          iteration === this.state.mousePath.length - 1 ||
          _.isEqual(this.state.catLocation, this.state.mouseLocation)
        ) {
          clearInterval(intervalId);
        }
      }, appConfig.speed);
    }
  }

  test_case() {
    const mouse = [1, 9];
    const cat = [10, 3];
    const cheese = [
      [9, 1],
      [3, 2],
      [0, 6]
    ];
    const mousePath = new MousePath(mouse, cheese).findMousePath(1)[1];

    console.log(mousePath);

    this.setState({
      start: false,
      mouseTurn: true,
      stateNum: 1,
      catLocation: cat,
      mouseLocation: mouse,
      cheeseLocations: cheese,
      mousePath: mousePath
    });
  }



  render() {
    return (
      <div className="game-container">
        <div className="search-buttons">
          {Searches(null, null).map((e, index) => (
            <Button
              key={index}
              variant="outlined"
              color="primary"
              onClick={() => this.handleOnclick(index)}
            >
              {e.name}
            </Button>
          ))}

          <Button
            variant="outlined"
            color="primary"
            onClick={this.test_case.bind(this)}
          >
            Test
          </Button>

          <Button variant="outlined" color="primary" onClick={this.reset}>
            {" "}
            Reset{" "}
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
          {this.state.loading ? (
            "Loading........"
          ) : (
            <div>
              {this.state.cheeseLocations.map((cheese, index) => (
                <Cell cellName="cheese" key={index} xyCoor={cheese} />
              ))}
              <Cell cellName="mouse" xyCoor={this.state.mouseLocation} />
              <Cell cellName="cat" xyCoor={this.state.catLocation} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Grid;
