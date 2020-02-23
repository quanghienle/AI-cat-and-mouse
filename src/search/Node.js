import Movements from "../utils/Movements";

export default class Node {
  constructor(parent, state, depth, current_cost) {
    this.parent = parent;
    this.state = state;
    this.depth = depth;
    this.current_cost = current_cost || 0;
  }

  getPath() {
    let currNode = this;
    const path = [];
    while (currNode) {
      path.unshift(currNode.state.catLocation);
      currNode = currNode.parent;
    }
    return path;
  }

  catCatchesMouse() {
    return (
      JSON.stringify(this.state.catLocation) ===
      JSON.stringify(this.state.mouseLocation)
    );
  }

  catHitsWall(direction) {
    const newCatLocation = Movements.catMove(direction, this.state.catLocation);
    return (
      JSON.stringify(this.state.catLocation) === JSON.stringify(newCatLocation)
    );
  }

  getNextNode(direction, mousePath, cost) {
    const index =
      this.depth >= mousePath.length ? mousePath.length - 1 : this.depth + 1;
    const nextState = {
      catLocation: Movements.catMove(direction, this.state.catLocation),
      mouseLocation: mousePath[index]
    };
    return new Node(this, nextState, this.depth + 1, cost);
  }
}
