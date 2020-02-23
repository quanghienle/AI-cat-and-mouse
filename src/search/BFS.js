import Queue from './Queue';
import Node from './Node';
import Movements from '../utils/Movements';

export default class BFS {

    constructor(catLocation, mousePath) {
        this.catLocation = catLocation;
        this.mousePath = mousePath;
    }

    findPath() {
        let iteration = 0;
        const queue = new Queue();
        const startState = {
            catLocation: this.catLocation,
            mouseLocation: this.mousePath[0],
        }

        queue.enqueue(new Node(null, startState, 0, 0));

        while (true) {
            iteration += 1;
            const node = queue.dequeue();

            // get cat's possible move directions -> filterring directions -> add to stack
            Object.keys(Movements.catMovements)
                .filter(dir => !node.catHitsWall(dir) && (node.depth < this.mousePath.length - 2))
                .forEach(dir => queue.enqueue(node.getNextNode(dir, this.mousePath, 0)));

            if (node.catCatchesMouse() || queue.isEmpty()) {
                const catPath = node.getPath();
                console.log("Breadth First Search: ", iteration, " iterations")
                console.log("Cat Path: ", catPath)
                return catPath;
            }
        }
    }
}
