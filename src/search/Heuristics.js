

const heuristic_pythagorean = (state, mousePath) => {
    const cat = state.catLocation;
    const mouse = state.mouseLocation;

    return Math.abs(cat[0] - mouse[0]) ^ 2 + Math.abs(cat[1] - mouse[1]) ^ 2
}

const heuristic_middle_point = (state, mousePath) => {
    const cat = state.catLocation;
    const mouse = state.mouseLocation;
    const mouseEnd = mousePath[mousePath.length - 1]

    const middleX = Math.ceil(Math.abs(mouseEnd[0] - mouse[0]) / 2)
    const middleY = Math.ceil(Math.abs(mouseEnd[1] - mouse[1]) / 2)

    return Math.abs(cat[0] - middleX[0]) ^ 2 + Math.abs(cat[1] - middleY[1]) ^ 2
}

const heuristic_average = (state, mousePath) => {
    const h1 = heuristic_pythagorean(state, mousePath);
    const h2 = heuristic_middle_point(state, mousePath);

    return (h1 + h2) / 2
}



export default {
    pythagorean: heuristic_pythagorean,
    middlePoint: heuristic_middle_point,
    average: heuristic_average
}