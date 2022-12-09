
input_list = open('Day_4/input.txt', 'r').read().split('\n')

count = 0
count2 = 0

def get_min_overlap(p11, p12, p21, p22):
    if (p11>=p21 and p11<=p22) or (p12>=p21 and p12<=p22):
        return 1
    if (p21>=p11 and p21<=p12) or (p22>=p11 and p22<=p12):
        return 1
    return 0

def get_complete_overlap(p11, p12, p21, p22):
    if (p11>=p21 and p11<=p22) and (p12>=p21 and p12<=p22):
        return 1
    if (p21>=p11 and p21<=p12) and (p22>=p11 and p22<=p12):
        return 1
    return 0

for event in input_list:
    pair1, pair2 = event.split(",")
    p11, p12 = map(int, pair1.split("-"))
    p21, p22 = map(int, pair2.split("-"))
    count  += get_complete_overlap(p11, p12, p21, p22)
    count2 += get_min_overlap(p11, p12, p21, p22)
    



print("PART 1")
print(count)
print("PART 2")
print(count2)