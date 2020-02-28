import Searches from "./src/search/SearchAlgo.js";
import InitState from "./src/utils/InitState.js";
import MousePath from "./src/utils/MousePath.js";
import appConfig from "./src/appConfig.js";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get("/init", (req, res) => {
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
  ).findMousePath(1)[1];

  const resObj = {
    catLocation: catLocation,
    mouseLocation: mouseLocations[0],
    cheeseLocations: cheeseLocations,
    mousePath: mousePath
  };

  // console.log("Mouse Path:\t", mousePath);
  // console.log("sending ", resObj)
  res.send(resObj);
});

app.post("/search", (req, res) => {
  // console.log(req.body);

  const search = Searches(req.body.cat, req.body.mousePath)[
    req.body.searchIndex
  ];

  console.log("\n=======================================================")
  console.log("Running " + search.name);
  // console.log(search)
  const catPath = search.search.findPath();

  console.log("Done. Now sending to client...");
  res.send(JSON.stringify({ catPath: catPath }));
});
