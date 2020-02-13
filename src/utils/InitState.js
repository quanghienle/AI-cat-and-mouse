
export default class InitState {

    constructor(gridSize, numCheese, numMice) {
        this.gridSize = gridSize;
        this.numCheese = numCheese;
        this.numMice = numMice;
        this.grid = this.initGrid();
    }

    initGrid() {
        const emptyGrid = [];
        for (let row = 0; row < this.gridSize; row++) {
            let tempRow = [];
            for (let col = 0; col < this.gridSize; col++) {
                tempRow.push("empty");
            }
            emptyGrid.push(tempRow);
        }
        return emptyGrid;
    }

    setAndGetRandomItem (name){
        let row, col;
        do {
            row = Math.floor(Math.random() * this.gridSize);
            col = Math.floor(Math.random() * this.gridSize);
        } while (this.grid[row][col] !== "empty");
        this.grid[row][col] = name;
        return [row, col]
    }

    getInitialState(){
        let catLocation = this.setAndGetRandomItem("cat");
        let mouseLocations = [];
        for (let i = 0; i < this.numMice; i++) {
            mouseLocations.push(this.setAndGetRandomItem("mouse"));
        }

        let cheeseLocations = []
        for (let i = 0; i < this.numCheese; i++) {
            cheeseLocations.push(this.setAndGetRandomItem("cheese"));
        }

        return {
            grid: this.grid,
            catLocation: catLocation,
            mouseLocations: mouseLocations,
            cheeseLocations: cheeseLocations,
        }
    }





}