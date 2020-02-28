
<br/>
<br/>
<br/>

### Date: Feb 25, 2020
### Student name: Hien Le
### Student numner: 101044264

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

# COMP 4106 - ASSIGNMENT 1 - REPORT 
---
<br/>
<br/>

## 1. STATE SPACE 
  - Every state of the game includes:
    - __Size of the grid__: 2D array, indicating which direction the cat and the mouse can move.
    - __locations of the cheese__: a 2D of the cheese's coordinates - [[x1, y1], [x2, y2] ...]
    - __location of the mouse__: an array of the x and y coordinates - [x, y]
    - __location of the cat__: an array of the x and y coordinates - [x, y]

  - Initial state:
    - When the game starts, the cat, mouse, and cheese will be randomly 
    - However, their locations are initialized in a way that there's no 2 objects placed at the same location
    - Size of the grid remains unchanged.

  - Actions:
    - No action required to be done for the mouse, because its path is deterministic
    - Update the cheese: remove the cheese once the mouse passes by
    - Movements of the cat: each move the cat makes, the state will be updated

  - Goal:
    - The goal is for the cat to catch the mouse before all of the cheese are eaten
    - In other words, (cat's location == mouse's location) __and__ (number of cheese > 0)

  - Path Cost:
    - Number of moves the cat needs to catch the mouse

<br/>
<br/>

## 2. HEURISTICS

  - Distance between the cat and the mouse (_h1_):
    - This heuristic is measured in terms of the square of Ecludian distance between the cat and the mouse
    - $h = |x_{cat} - x_{mouse}|^2 + |y_{cat} - y_{mouse}|^2$
    - By applying the heuristic, the cat is basicially chasing and trying to get close to the mouse as soon as the game starts    
    - Therefore, this requires fewer moves as well as fewer nodes to be search.


<br/>

  - Distance between the cat and last cheese (_h2_):
    - This heuristic is calculated based on the square of the distance between the cat and the last cheese
    - $h = |x_{cat} - x_{last cheese}|^2 + |y_{cat} - y_{last cheese}|^2$
    - In this heuristic, the cat is guarding and moving around last piece of cheese (or the final destination of the mouse) and waiting for the mouse to come
    - As a result, this requires more moves for the cat to make

<br/>

  - The average of the above heuristics 
    - This heuristic is measured by taking the average of _h1_ and _h2_ -> $(h_1 + h_2) / 2$
    - For this heuristic, the behaviour of the cat will be to move to the middle of the mouse and the last cheese, since it gives the smallest average
    - Since the grid is small, the cat will take almost the same number of moves as if using _h1_



