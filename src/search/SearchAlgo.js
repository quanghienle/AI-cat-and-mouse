import BFS from "./BFS.js";
import DFS from "./DFS.js";
import A_star from "./A_star.js";
import Heuristics from "./Heuristics.js";

export default (catLocation, mousePath) => [
  {
    search: new DFS(catLocation, mousePath),
    name: "Depth First Search"
  },
  {
    search: new BFS(catLocation, mousePath),
    name: "Breadth First Search"
  },
  {
    search: new A_star(catLocation, mousePath, Heuristics.pythagorean),
    name: "A* Agressive"
  },
  {
    search: new A_star(catLocation, mousePath, Heuristics.endPoint),
    name: "A* Passive"
  },
  {
    search: new A_star(catLocation, mousePath, Heuristics.average),
    name: "A* Average"
  }
];
