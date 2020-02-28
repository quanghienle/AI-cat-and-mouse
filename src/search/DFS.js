import Node from './Node.js';
import Stack from './Stack.js';
import Movements from '../utils/Movements.js';

export default class DFS {

    constructor(catLocation, mousePath) {
        this.catLocation = catLocation;
        this.mousePath = mousePath;
    }

    findPath() {
        let iteration = 0;
        const stack = new Stack();
        const startState = {
            catLocation: this.catLocation,
            mouseLocation: this.mousePath[0],
        }

        stack.push(new Node(null, startState, 0, 0));

        while (true) {
            iteration += 1;
            const node = stack.pop();

            // get cat's possible move directions -> filterring directions -> add to queue
            Object.keys(Movements.catMovements)
                .filter(dir => !node.catHitsWall(dir) && (node.depth < this.mousePath.length - 2))
                .forEach(dir => stack.push(node.getNextNode(dir, this.mousePath, 0)));

            if (node.catCatchesMouse() || stack.isEmpty()) {
                const catPath = node.getPath();
                console.log("Depth First Search: ", iteration, " iterations");
                console.log("Cat Path: ", catPath);
                return catPath;
            }
        }
    }
}
