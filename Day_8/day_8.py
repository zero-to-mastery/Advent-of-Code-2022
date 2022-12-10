
from pprint import pprint
import pdb

with open("Day_8/input.txt") as f:
    grid = f.read().split("\n")

visibility_grid = [[0]*len(grid[0]) for x in range(len(grid))]

grid_length = len(grid)
for i in range(grid_length):
    visibility_grid[0][i] = 1
    visibility_grid[i][0] = 1
    visibility_grid[grid_length-1][i] = 1
    visibility_grid[i][grid_length-1] = 1
    
def traverse_horizontal(xStart, xEnd, xStep):
    for i in range(len(grid)):
        tallest_tree = grid[i][xStart]
        for j in range(xStart, xEnd+xStep, xStep):
            if grid[i][j] > tallest_tree:
                tallest_tree = grid[i][j]
                visibility_grid[i][j] = 1
             
def traverse_vertical(yStart, yEnd, yStep):
    for i in range(len(grid)):
        tallest_tree = grid[yStart][i]
        for j in range(yStart, yEnd+yStep, yStep):
            if grid[j][i] > tallest_tree:
                tallest_tree = grid[j][i]
                visibility_grid[j][i] = 1

def part2(x, y):
    curr_height = grid[x][y]
    cr, cl, cu, cd = 0, 0, 0, 0
    
    for i in range(x+1, grid_length, 1):
        cr+=1
        if grid[i][y] >= curr_height:
            break
    for i in range(x-1, -1, -1):
        cl+=1
        if grid[i][y] >= curr_height:
            break
    for j in range(y+1, grid_length, 1):
        cd+=1
        if grid[x][j] >= curr_height:
            break
    for j in range(y-1, -1, -1):
        cu+=1
        if grid[x][j] >= curr_height:
            break

    return cr*cd*cu*cl
    

def get_visibles():
    count = 0
    for i in range(grid_length):
        print("".join(map(str,visibility_grid[i])))
        count += visibility_grid[i].count(1)
    return count

pdb.set_trace()
traverse_horizontal(0, grid_length-1, 1)
traverse_horizontal(grid_length-1, 0, -1)

traverse_vertical(0, grid_length-1, 1)
traverse_vertical(grid_length-1, 0, -1)

print(get_visibles())

# PART 2

answer2 = 0
for i in range(1, grid_length-1):
    for j in range(1, grid_length-1):
        visibles = part2(i, j)
        if visibles > answer2:
            answer2 = visibles

print(answer2)