
answer = 0

for item in open('Day_3/input.txt', 'r').read().split("\n"):
    p1 = item[: len(item)//2]
    p2 = item[len(item)//2 : ]
    for char in p1:
        if char in p2:
            if char >= 'a' and char <= 'z':
                answer += ord(char) - ord('a') + 1 
            if char >= 'A' and char <= 'Z':
                answer += ord(char) - ord('A') + 27
            break

input_list = open('Day_3/input.txt', 'r').read().split("\n")
answer2 = 0

for j in range(len(input_list)//3):
    s1 = input_list[j*3]
    s2 = input_list[j*3+1]
    s3 = input_list[j*3+2]
    
    for char in s1:
        if char in s2 and char in s3:
            if char >= 'a' and char <= 'z':
                answer2 += ord(char) - ord('a') + 1 
            if char >= 'A' and char <= 'Z':
                answer2 += ord(char) - ord('A') + 27
            break

print(answer)
print(answer2)