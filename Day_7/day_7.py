import pdb

# considering folder names are unique
all_dirs = []

class directory_tree():
    name = ""
    foldersize = 0
    files = []
    _subFolders = []
    parent = None
    
    def __init__(self, dirname, parent, subfs):
        self.name = dirname
        self.parent = parent
        self._subFolders = subfs
    
    def __str__(self):
        if self.parent:
            return "Name: {n} parent: {p} subfolders: {s}".format(n = self.name, p = self.parent.name, s = [x.name for x in self._subFolders])
        else:
            return "Name: {n} parent: {p} subfolders: {s}".format(n = self.name, p = self.parent, s = [x.name for x in self._subFolders])
            
    
    def add_subFolder(self, folder):
        self._subFolders.append(folder)
    
    def add_file(self, filename, size):
        self.files.append(filename)
        self.foldersize += int(size)

    def get_size(self):
        total_size = self.foldersize
        for child in self._subFolders:
            total_size += child.get_size()
        return total_size
    
    def part1_answer(self):
        total_size = self.foldersize
        for child in self._subFolders:
            total_size += child.part1_answer()
        if total_size > 100000:
            return 0
        return total_size
    
    def get_subFolders(self):
        return self._subFolders


input_list = open('Day_7/input.txt', 'r').read().split("\n")

current_command = ""
parent_dir = None
root = directory_tree("/", None, [])


def find_subFolder(parent, foldername):
    for folder in parent.get_subFolders():
        # print(parent, folder)
        if folder.name == foldername:
            return folder
    return None

#pdb.set_trace()
for line in input_list:
    # print(line)
    if line.startswith("$"):
        line = line.strip("$ ").strip()
        
        if line == "ls":
            continue
        
        to_folder = line[3:].strip()
        if to_folder == "/":
            parent_dir = None
            current_dir = root
        elif to_folder == "..":
            current_dir = parent_dir
            parent_dir = current_dir.parent
        else:
            parent_dir = current_dir
            current_dir = find_subFolder(current_dir, to_folder)
        
        # print(current_dir, all_dirs)
        continue
        
    subFolders = []

    if line.startswith("dir"):
        dirname = line[4:].strip()
        
        new_dir = directory_tree(dirname, current_dir, [])
        current_dir.add_subFolder(new_dir)
        all_dirs.append(new_dir)
        # print(new_dir)
        continue
    
    if not current_dir:
        pdb.set_trace()
    filesize, filename = line.split(" ")
    current_dir.add_file(filename, filesize)


# print(all_dirs)
# PART 1
answer = 0
for d in all_dirs:
    size = d.get_size()
    if size < 100000:
        answer += size

print(answer)

# PART 2
occupied = root.get_size()
system_size = 7*10**7
needed = 3*10**7

free_size = system_size - occupied
to_free = needed - free_size

answer2 = occupied

for i in all_dirs:
    size = i.get_size()
    if size < to_free:
        continue
    if size < answer2:
        answer2 = size
        
print(answer2)