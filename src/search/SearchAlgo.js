import BFS from "./BFS";
import DFS from "./DFS";
import A_star from "./A_star";
import Heuristics from "./Heuristics";

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
    name: "A* Pythagorean"
  },
  {
    search: new A_star(catLocation, mousePath, Heuristics.middlePoint),
    name: "A* EndPoint"
  },
  {
    search: new A_star(catLocation, mousePath, Heuristics.average),
    name: "A* Average"
  }
];
