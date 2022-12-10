def find_dup(string):
    td = {}
    for k in string:
        if td.get(k, None):
            return False
        td[k] = 1
    return True

input_text = open('Day_6/input.txt', 'r').read().strip()

def detect_pos(input_text, unique_num):
    for i in range(len(input_text)-unique_num):
        if find_dup(input_text[i:i+unique_num]):
            return i+unique_num
            
print(detect_pos(input_text, 4))