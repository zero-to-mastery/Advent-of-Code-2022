
diag = """
[Q] [J]                         [H]
[G] [S] [Q]     [Z]             [P]
[P] [F] [M]     [F]     [F]     [S]
[R] [R] [P] [F] [V]     [D]     [L]
[L] [W] [W] [D] [W] [S] [V]     [G]
[C] [H] [H] [T] [D] [L] [M] [B] [B]
[T] [Q] [B] [S] [L] [C] [B] [J] [N]
[F] [N] [F] [V] [Q] [Z] [Z] [T] [Q]
 1   2   3   4   5   6   7   8   9 
"""

def gen_stacks(diag):
    stacks = [[] for _ in range(9)]
    for line in diag.split("\n")[-3:0:-1]:
        for stack_i in range(9):
            if line[stack_i*4+1] != " ":
                stacks[stack_i].append(line[stack_i*4+1])
    return stacks

def parse_line(line):
    li = line.split(" ")
    return (int(li[1]), int(li[3])-1, int(li[5])-1)

stacks = gen_stacks(diag)
input_list = open("Day_5/input.txt").read().split("\n")
print(stacks)

def one_by_one_movement(stacks, input_list):
    for event in input_list:
        moves, src, dst = parse_line(event)
        for move in range(moves):
            stacks[dst].append(stacks[src].pop())
        
    print("".join([x[-1] for x in stacks ]))
    
def bulk_movement(stacks, input_list):
    for event in input_list:
        moves, src, dst = parse_line(event)
        stacks[dst] += stacks[src][-1*moves:]
        stacks[src] = stacks[src][:-1*moves]
    print("".join([x[-1] for x in stacks ]))
    
bulk_movement(stacks, input_list)    