import Node from './Node';
import Stack from './Stack';
import Movements from '../utils/Movements';

export default class DFS {

    constructor(catLocation, mousePath) {
        this.catLocation = catLocation;
        this.mousePath = mousePath;
    }

    findPath() {
        const catDirections = Object.keys(new Movements().catMovements);
        const stack = new Stack();
        let node = new Node(this.catLocation, this.mousePath[0], 0);
        stack.push([node]);

        while (true) {
            const path = stack.pop();
            node = path[path.length - 1];


            if(node.getDepth() < this.mousePath.length-2){
                for (const dir of catDirections) {
                    if (!node.catHitsWall(dir)) {
                        const nextNode = node.getNextNode(dir, this.mousePath);
                        stack.push([...path, nextNode]);
                    }
                }
            }

            if (node.catCatchesMouse() || stack.isEmpty()){
                return path.map(e => e.getCatLocation()); 
            }
        }
    }
}
