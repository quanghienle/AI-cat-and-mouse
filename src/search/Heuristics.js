const heuristic_pythagorean = (state, mousePath) => {
  const cat = state.catLocation;
  const mouse = state.mouseLocation;

  return Math.abs(cat[0] - mouse[0]) ^ (2 + Math.abs(cat[1] - mouse[1])) ^ 2;
};

const heuristic_end_point = (state, mousePath) => {
  const cat = state.catLocation;
  // const mouse = state.mouseLocation;
  const mouseEnd = mousePath[mousePath.length - 1];
  
  return Math.abs(cat[0] - mouseEnd[0]) ^ (2 + Math.abs(cat[1] - mouseEnd[1])) ^ 2;
};

const heuristic_average = (state, mousePath) => {
  const h1 = heuristic_pythagorean(state, mousePath);
  const h2 = heuristic_end_point(state, mousePath);

  return (h1 + h2) / 2;
};

export default {
  pythagorean: heuristic_pythagorean,
  middlePoint: heuristic_end_point,
  average: heuristic_average
};
