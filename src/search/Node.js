import Movements from '../utils/Movements';

export default class Node {
    constructor(catLocation, mouseLocation, depth) {
        this.catLocation = catLocation;
        this.depth = depth;
        this.mouseLocation = mouseLocation;
        this.movements = new Movements();
        this.heuristic = null;
        // this.cost_fn = cost_fn;
        // this.distance_travelled = distance_travelled;
    }


    getDepth() {
        return this.depth;
    }

    getCatLocation(){
        return this.catLocation;
    }

    catCatchesMouse() {
        return JSON.stringify(this.catLocation) === JSON.stringify(this.mouseLocation);
    }

    catHitsWall(direction) {
        const newCatLocation = this.movements.catMove(direction, this.catLocation); 
        return this.catLocation[0]===newCatLocation[0] && this.catLocation[1]===newCatLocation[1]; 
    }

    display() {
        return this.depth + " - " + this.catLocation + " - " + this.mouseLocation;
    }

    getNextNode(direction, mousePath){
        const index = this.depth >= mousePath.length ? mousePath.length - 1 : this.depth + 1;
        const newMouseLocation = mousePath[index];
        const newCatLocation = this.movements.catMove(direction, this.catLocation);  
        return new Node(newCatLocation, newMouseLocation, this.depth+1);
    }

}