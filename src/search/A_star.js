import Movements from '../utils/Movements';

import Node from './Node';
export default class A_star {

    constructor(catLocation, mousePath, heuristic) {
        this.catLocation = catLocation;
        this.mousePath = mousePath;
        this.heuristic = heuristic;
    }


    findPath() {

        const startState = {
            catLocation: this.catLocation,
            mouseLocation: this.mousePath[0],
        }

        const startNode = new Node(null, startState, 0, 0);

        const openList = []; 
        const closeList = []; 

        openList.push(startNode);

        while (openList.length > 0){

            let currNode = openList[0];
            let currIndex = 0;

            for (let i in openList){
               if (openList[i].current_cost < currNode.current_cost){
                   currIndex = i;
                   currNode = openList[i];
               } 
            }

            openList.splice(currIndex, 1);
            closeList.push(currNode);

            if (currNode.catCatchesMouse()){
                return currNode.getPath()
            }

            for (const dir of Object.keys(Movements.catMovements)){
                if (!currNode.catHitsWall(dir) && (currNode.depth < this.mousePath.length - 2)){
                    const h = this.heuristic(currNode.state, this.mousePath);
                    const newCost = currNode.current_cost + h
                    const childNode = currNode.getNextNode(dir, this.mousePath, newCost)

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


    }

}