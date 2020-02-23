import Movements from '../utils/Movements';

import Node from './Node';
export default class A_star {

    constructor(catLocation, mousePath, heuristic) {
        this.catLocation = catLocation;
        this.mousePath = mousePath;
        this.heuristic = heuristic;
    }

    get_min_node(nodeList) {
        let currNode = nodeList[0];

        nodeList.forEach(newNode => 
           currNode = (newNode.current_cost < currNode.current_cost) ? newNode : currNode
        );

        nodeList.splice(nodeList.indexOf(currNode), 1);
        return currNode
    }

    findPath() {
        let iteration = 0;
        const startState = {
            catLocation: this.catLocation,
            mouseLocation: this.mousePath[0],
        }

        const openList = []; 
        const closeList = []; 
        let path = [];

        openList.push(new Node(null, startState, 0, 0));

        while (openList.length > 0){

            iteration += 1;

            let currNode = this.get_min_node(openList);
            path = currNode.getPath()
            
            if (currNode.catCatchesMouse()){
                break;
            }

            closeList.push(currNode);

            for (const dir of Object.keys(Movements.catMovements)){
                if (!currNode.catHitsWall(dir) && (currNode.depth < this.mousePath.length - 2)){
                    const childNode = currNode.getNextNode(dir, this.mousePath, 0)
                    const h = this.heuristic(childNode.state, this.mousePath);
                    const newCost = currNode.current_cost + h
                    childNode.current_cost = newCost
                    
                    if (closeList.indexOf(childNode) > -1){
                        continue;
                    }

                    for (const openNode of openList){
                        if (childNode===openNode && childNode.current_cost > openNode.current_cost){
                            continue;
                        }
                    }

                    openList.push(childNode);
                }
            }
        }
 
        console.log("A* Search: ", iteration, " iterations");
        console.log("Cat Path: ", path);
        return path;
    }
}