import appConfig from '../appConfig';
import Movements from './ObjectMovements';

const grid = [];
for (let row = 0; row < appConfig.gridSize; row++) {
    let tempRow = [];
    for (let col = 0; col < appConfig.gridSize; col++) {
        tempRow.push("empty");
    }
    grid.push(tempRow);
}


const setRandomItem = name => {
    let row, col;
    do {
        row = Math.floor(Math.random() * appConfig.gridSize);
        col = Math.floor(Math.random() * appConfig.gridSize);
    } while (grid[row][col] !== "empty");
    grid[row][col] = name;
    return [row, col] 
}


let catLocation = setRandomItem("cat");
let mouseLocation = setRandomItem("mouse");

let cheeseLocations = []
for (let i = 0; i < appConfig.numberOfCheese; i++) {
    cheeseLocations.push(setRandomItem("cheese"));
}

const findClosestCheese = (mouse, cheeseArr) => {
    const distance = cheeseArr.map(c => {
        const xLen = Math.pow(mouse[0] - c[0], 2);
        const yLen = Math.pow(mouse[1] - c[1], 2)
        return xLen + yLen;
    })
    return distance.indexOf(Math.min(...distance));
}


const getCheese = (mouse, cheese) => {
    let [mx, my] = mouse;
    const [cx, cy] = cheese;

    const xLen = Math.abs(cx-mx);
    const yLen = Math.abs(cy-my);
    const distance = xLen > yLen ? xLen : yLen;

    let dirList = [];
    for (let i=0; i<distance; i++){
        let dir = "";
        if(cy!==my){ dir += (cy<my) ? "N" : "S"; }
        if(cx!==mx){ dir+= (cx<mx) ? "W" : "E"; }

        [mx, my] = Movements.mouse[dir]([mx, my], 20);
        dirList.push(dir);
    }
    return [dirList, [mx, my]];
}

const findMousePath = (mouse, cheeseList) => {
    let cheeseCopy = [...cheeseList];
    let mouseXY = [...mouse];
    let path = [];
    while(cheeseCopy.length !== 0){
        const index = findClosestCheese(mouseXY, cheeseCopy);
        const [dirs, newLocation] = getCheese(mouseXY, cheeseCopy[index]);
        mouseXY = [...newLocation];
        path.push(...dirs);
        cheeseCopy.splice(index, 1)
    }
    return path;
}


export default {
    grid: grid,
    mousePath: findMousePath(mouseLocation, cheeseLocations),
    objectLocations: {
        cat: catLocation,
        mouse: mouseLocation,
        cheese: cheeseLocations
    }
};
