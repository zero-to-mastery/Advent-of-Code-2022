scores = {
    'A': 1,
    'B': 2,
    'C': 3, 
    'X': 1,
    'Y': 2,
    'Z': 3
}

wins = {
    ('A', 'X'): 1+3,
    ('A', 'Y'): 2+6,
    ('A', 'Z'): 3+0,
    ('B', 'X'): 1+0,
    ('B', 'Y'): 2+3,
    ('B', 'Z'): 3+6,
    ('C', 'X'): 1+6,
    ('C', 'Y'): 2+0,
    ('C', 'Z'): 3+3 
}

second_strategy = {
    ('A', 'X'): 3+0,
    ('A', 'Y'): 1+3,
    ('A', 'Z'): 2+6,
    ('B', 'X'): 1+0,
    ('B', 'Y'): 2+3,
    ('B', 'Z'): 3+6,
    ('C', 'X'): 2+0,
    ('C', 'Y'): 3+3,
    ('C', 'Z'): 1+6 
}

input_text = open('Day_2/input.txt').read()
total_score = 0
second_strategy_score = 0

for event in input_text.split("\n"):
    p1, p2 = event.split(" ")
    total_score += wins[(p1, p2)]
    second_strategy_score += second_strategy[(p1, p2)]

print(total_score)
print(second_strategy_score)