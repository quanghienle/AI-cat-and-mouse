import appConfig from '../appConfig';

const max = appConfig.gridSize-1;

const mouseMovements = {
    "N": ([x, y]) => [x, y === 0 ? 0 : y - 1],
    "S": ([x,y]) => [x, y === max ? max : y + 1],
    "E": ([x,y]) => [x === max ? max : x + 1, y],
    "W": ([x,y]) => [x === 0 ? 0 : x - 1, y],
    "NE": ([x,y]) => (x === max || y === 0) ? [x, y] : [x + 1, y - 1],
    "NW": ([x,y]) => (x === 0 || y === 0) ? [x, y] : [x - 1, y - 1],
    "SE": ([x,y]) => (x === max || y === max) ? [x, y] : [x + 1, y + 1],
    "SW": ([x,y]) => (x === 0 || y === max) ? [x, y] : [x - 1, y + 1]
}

const catMovements = {
    "NW": ([x,y]) => (y - 2 < 0 || x === 0) ? [x, y] : [x - 1, y - 2],
    "NE": ([x,y]) => (y - 2 < 0 || x === max) ? [x, y] : [x + 1, y - 2],
    "SW": ([x,y]) => (y + 2 > max || x === 0) ? [x, y] : [x - 1, y + 2],
    "SE": ([x,y]) => (y + 2 > max || x === max) ? [x, y] : [x + 1, y + 2],
    "WN": ([x,y]) => (y === 0 || x - 2 < 0) ? [x, y] : [x - 2, y - 1],
    "EN": ([x,y]) => (y === max || x - 2 < 0) ? [x, y] : [x - 2, y + 1],
    "WS": ([x,y]) => (y === 0 || x + 2 > max) ? [x, y] : [x + 2, y - 1],
    "ES": ([x,y]) => (y === max || x + 2 > max) ? [x, y] : [x + 2, y + 1],
}

export default {
    cat: catMovements,
    mouse: mouseMovements,
}