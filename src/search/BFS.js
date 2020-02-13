import Queue from './Queue';
import Node from './Node';
import Movements from '../utils/Movements';

export default class BFS {

    bfs(catLocation, mousePath) {

        const dirs = Object.keys(new Movements().catMovements); 

        const q = new Queue();

        let node = new Node(catLocation, mousePath[0], 0);
        let path = []
        q.enqueue([node]);

        while (!node.catCatchesMouse()) {
            // node = q.dequeue();
            path = q.dequeue();
            node = path[path.length - 1];
           
            if (node.catCatchesMouse() || node.getDepth() >= mousePath.length){
                break;
            }
        //     console.log(node.getCatCorrds());

            for(let i=0; i<8; i++){
                const direction = dirs[i];
                if(!node.catHitsWall(direction)){

                    const nextNode = node.getNextNode(direction, mousePath);
                    
                    const new_path = [...path];
                    new_path.push(nextNode);
                    q.enqueue(new_path);
                }
            }
        }

        path.forEach(element => {
            console.log(element.display());
        });

        // const p = path.map(e => e.getCatLoc);
        return path;

    }

}
