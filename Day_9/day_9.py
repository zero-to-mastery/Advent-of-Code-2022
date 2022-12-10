import pdb

with open("Day_9/input.txt","r") as f:
    input_list = f.read().split("\n")

class position():
    x = 0
    y = 0
    def __init__(self, x, y):
        self.x = x
        self.y = y
        
    def __str__(self):
        return "x: {c}, y: {b}".format(c=self.x, b=self.y)
    
    def move(self, direction):
        if direction == "R":
            self.x += 1
        if direction == "L":
            self.x -= 1
        if direction == "U":
            self.y += 1
        if direction == "D":
            self.y -= 1

def find_size():
    rows = 0
    columns = 0
    moveX, moveY = 0,0
    for line in input_list:
        direction, moves = line.split(" ")
        moves = int(moves)
        if direction == "L":
            moveX -= moves
        if direction == "R":
            moveX += moves
        columns = max(columns, moveX)
        
        if direction == "U":
            moveY += moves
        if direction == "D":
            moveY -= moves
        rows = max(rows, moveY)
    
    return (rows, columns)

def find_next_move(T, H):
    distX = H.x - T.x
    distY = H.y - T.y
    
    moveX, moveY = 0, 0
    if abs(distX) > 1:
        moveX = distX//abs(distX)
        moveY = distY
    if abs(distY) > 1:
        moveX = distX
        moveY = distY//abs(distY)
    return (moveX, moveY)

def pv():
    for i in visited:
        print("".join(map(str, i)))

def part1():
    visited = [[0]*60 for _ in range(60)]

    Head = position(0, 0)
    Tail = position(0, 0)

    visited[0][0] = 1

    pdb.set_trace()
    for cou, line in enumerate(input_list):
        direction, moves = line.split(" ")
        moves = int(moves)
        for move in range(moves):
            Head.move(direction)
            mx, my = find_next_move(Tail, Head)
            Tail.x += mx
            Tail.y += my
            visited[Tail.y][Tail.x] = 1
        
        if cou == 20:
            pdb.set_trace()

    answer1 = 0
    for i in visited:
        #print("".join(map(str, i)))
        answer1 += i.count(1)
    
    return answer1

# print(part1())


#########################################3
# PART 2
#########################################3

def move_tail(tail, head):
    mx, my = find_next_move(tail, head)
    tail.x += mx
    tail.y += my

def pt():
    print(Head)
    for i in Tails:
        print(i)

Head = position(0, 0)
Tails = []
for i in range(9):
    Tails.append(position(0, 0))

visited = [[0]*60 for _ in range(60)]
visited[0][0] = 1

for cou, line in enumerate(input_list):
    direction, moves = line.split(" ")
    moves = int(moves)
    for move in range(moves):
        Head.move(direction)
        move_tail(Tails[0], Head)
        for i in range(1,9):
            move_tail(Tails[i], Tails[i-1])
        
        visited[Tails[-1].y][Tails[-1].x] = 1
    if cou == 97:
        pdb.set_trace()
    if Tails[-1].y == -3:
        pdb.set_trace()
        
answer2 = 0
for i in visited:
    #print("".join(map(str, i)))
    answer2 += i.count(1)

print(answer2)