import appConfig from '../appConfig';

export default class Movements {
    max = appConfig.gridSize - 1;

    mouseMovements = {
        "N": ([x, y]) => [x, y === 0 ? 0 : y - 1],
        "S": ([x, y]) => [x, y === this.max ? this.max : y + 1],
        "E": ([x, y]) => [x === this.max ? this.max : x + 1, y],
        "W": ([x, y]) => [x === 0 ? 0 : x - 1, y],
        "NE": ([x, y]) => (x === this.max || y === 0) ? [x, y] : [x + 1, y - 1],
        "NW": ([x, y]) => (x === 0 || y === 0) ? [x, y] : [x - 1, y - 1],
        "SE": ([x, y]) => (x === this.max || y === this.max) ? [x, y] : [x + 1, y + 1],
        "SW": ([x, y]) => (x === 0 || y === this.max) ? [x, y] : [x - 1, y + 1]
    }

    catMovements = {
        "NW": ([x, y]) => (y - 2 < 0 || x === 0) ? [x, y] : [x - 1, y - 2],
        "NE": ([x, y]) => (y - 2 < 0 || x === this.max) ? [x, y] : [x + 1, y - 2],
        "SW": ([x, y]) => (y + 2 > this.max || x === 0) ? [x, y] : [x - 1, y + 2],
        "SE": ([x, y]) => (y + 2 > this.max || x === this.max) ? [x, y] : [x + 1, y + 2],
        "WN": ([x, y]) => (y === 0 || x - 2 < 0) ? [x, y] : [x - 2, y - 1],
        "EN": ([x, y]) => (y === this.max || x - 2 < 0) ? [x, y] : [x - 2, y + 1],
        "WS": ([x, y]) => (y === 0 || x + 2 > this.max) ? [x, y] : [x + 2, y - 1],
        "ES": ([x, y]) => (y === this.max || x + 2 > this.max) ? [x, y] : [x + 2, y + 1],
    }
    mouseMove(dir, XYcoord) {
        return this.mouseMovements[dir](XYcoord);
    }

    catMove(dir, XYcoord) {
        return this.catMovements[dir](XYcoord);
    }
}
