import Queue from './Queue';
import Node from './Node';
import Movements from '../utils/Movements';

export default class BFS {

    constructor(catLocation, mousePath){
        this.catLocation = catLocation;
        this.mousePath = mousePath;
    }

    findPath() {
        const catDirections = Object.keys(new Movements().catMovements); 
        const q = new Queue();
        let node = new Node(this.catLocation, this.mousePath[0], 0);
        q.enqueue([node]);

        while (true) {
            const path = q.dequeue();
            node = path[path.length - 1];
           
            if (node.catCatchesMouse() || node.getDepth() >= this.mousePath.length-1){
                return path.map(e => e.getCatLocation());
            }

            for(const dir of catDirections){
                if(!node.catHitsWall(dir)){
                    const nextNode = node.getNextNode(dir, this.mousePath);
                    q.enqueue([...path, nextNode]);
                }
            }
        }
    }

}
