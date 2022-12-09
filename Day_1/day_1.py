import requests
import sys

def get_input_from_server(url):
    try:
        response = requests.get(url)
        if response.status_code != 200:
            raise Exception("Server error")
        input_text = response.text
        return (True, input_text)
    except Exception as err:
        return (False, err)
    
def get_input_from_file(filename):
    try:
        fd = open(filename, "r")
        input_text = fd.read()
        fd.close()
        if input_text :
            return (True, input_text)
        raise Exception(str(input_text))
    except Exception as err:
        return (False, err)

def input_parser(input_text):
    try:
        input_list = []
        temp_list = []
        for line in input_text.split("\n"):
            if line.strip() != "":
                temp_list.append(int(line))
            else:
                input_list.append(temp_list)
                temp_list = []
        return (True, input_list)
    except Exception as err:
        return (False, err)
    
def get_max_3(input_list):
    ans_list = list(map(sum, input_list))
    top_list = []
    for i in ans_list:
        if len(top_list) < 3:
            top_list.append(i)
            top_list.sort()
        if i > top_list[0]:
            top_list[0] = i
            top_list.sort()
    return top_list
    

if __name__ == "__main__":
    day1_url = "https://adventofcode.com/2022/day/1/input"
    file_name = "Day_1/input_file.txt"

    input_text_status, input_text = get_input_from_file(file_name)
    if not input_text_status: 
        print(input_text)
        sys.exit()
    
    input_list_status, input_list = input_parser(input_text)
    if not input_list_status:
        print(input_list)
        sys.exit()
    
    tops = get_max_3(input_list)
    print("Solution PART 1:")
    print(tops[-1])
    print("Solution PART 2:")
    print(sum(tops))
    
    
    
        
    