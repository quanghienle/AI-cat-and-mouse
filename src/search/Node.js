import Movements from '../utils/Movements';

export default class Node {
    constructor(catCoords, mouseCoords, depth) {
        this.catCoords = catCoords;
        this.depth = depth;
        this.mouseCoords = mouseCoords;
        this.movements = new Movements();
    }

    getDepth() {
        return this.depth;
    }

    getCatCoords(){
        return this.catCoords;
    }

    catCatchesMouse() {
        return JSON.stringify(this.catCoords) === JSON.stringify(this.mouseCoords);
    }

    catHitsWall(direction) {
        const newCatCoords = this.movements.catMove(direction, this.catCoords); 
        return this.catCoords[0]===newCatCoords[0] && this.catCoords[1]===newCatCoords[1]; 
    }

    display() {
        return this.depth + " - " + this.catCoords + " - " + this.mouseCoords;
    }

    getNextNode(direction, mousePath){
        const index = this.depth >= mousePath.length ? mousePath.length - 1 : this.depth + 1;
        const newMouseCoords = mousePath[index];
        const newCatCoords = this.movements.catMove(direction, this.catCoords);  
        return new Node(newCatCoords, newMouseCoords, this.depth+1);
    }

}