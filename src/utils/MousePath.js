import Movements from './Movements';

export default class MousePath {

    constructor(mouseLocation, cheeseLocations) {
        this.ObjMovements = new Movements();
        this.mouseLocation = [...mouseLocation];
        this.cheeseLocations = [...cheeseLocations];
    }

    findClosestCheese(mouse, cheeseArr) {
        const distance = cheeseArr.map(c => {
            const x_squared = Math.pow(mouse[0] - c[0], 2);
            const y_squared = Math.pow(mouse[1] - c[1], 2)
            return x_squared + y_squared;
        })
        return distance.indexOf(Math.min(...distance));
    }

    getCheese(mouse, cheese){
        let [mx, my] = mouse;
        const [cx, cy] = cheese;

        const distance = Math.max(Math.abs(cx - mx), Math.abs(cy - my))

        let directionsList = [];
        let mouseLocationsList = [];    

        for (let i = 0; i < distance; i++) {
            let dir = "";
            if (cy !== my) { dir += (cy < my) ? "N" : "S"; }
            if (cx !== mx) { dir += (cx < mx) ? "W" : "E"; }

            [mx, my] = this.ObjMovements.mouseMove(dir, [mx, my]);
            mouseLocationsList.push([mx, my]);
            directionsList.push(dir);
        }
        return [directionsList, mouseLocationsList];
    }

    findMousePath(){
        let path = [];
        let mouseLocationsPath = [];
        while (this.cheeseLocations.length !== 0) {
            const index = this.findClosestCheese(this.mouseLocation, this.cheeseLocations);
            const [dirList, mouseLocationsList] = this.getCheese(this.mouseLocation, this.cheeseLocations[index]);

            this.mouseLocation = mouseLocationsList[mouseLocationsList.length-1];
            path.push(...dirList);
            mouseLocationsPath.push(...mouseLocationsList);
            this.cheeseLocations.splice(index, 1)
        }
        // console.log(mouseLocationsPath);
        return [path, mouseLocationsPath];
    }
}