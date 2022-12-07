import { readFileSync } from "fs"
const lines = readFileSync("input.txt", "utf-8").replace(/\r/g, "").trim().split("\n")
//console.log(lines)
//const commands = parseCommands(lines)
//console.log(commands)

const createTree = (lines) => {
  const tree = {
    name: "/",
    isDirectory: true,
    children: [],
  }

  let currentNode = tree
  let currentCommand = null

  for (const line of lines) {
    if (line[0] === "$") {
      const match = /^\$ (?<command>\w+)(?: (?<arg>.+))?$/.exec(line)
      currentCommand = match.groups.command
      if (currentCommand === "cd") {
        const target = match.groups.arg
        switch (target) {
          case "/":
            currentNode = tree
            break
          case "..":
            currentNode = currentNode.parent
            break
          default:
            currentNode = currentNode.children.find(
              (folder) => folder.isDirectory && folder.name === target
            )
        }
      }
    } else {
      if (currentCommand === "ls") {
        const fileMatch = /^(?<size>\d+) (?<name>.+)$/.exec(line)
        if (fileMatch) {
          const node = {
            name: fileMatch.groups.name,
            size: parseInt(fileMatch.groups.size),
            isDirectory: false,
            parent: currentNode,
          }
          currentNode.children.push(node)
        }
        const dirMatch = /^dir (?<name>.+)$/.exec(line)
        if (dirMatch) {
          const node = {
            name: dirMatch.groups.name,
            isDirectory: true,
            children: [],
            parent: currentNode,
          }
          currentNode.children.push(node)
        }
      } else {
        throw new Error("unknown state")
      }
    }
  }

  return tree
}

const printTree = (node, depth = 0) => {
  console.log(
    `${" ".repeat(depth * 2)}- ${node.name} (${
      node.isDirectory ? "dir" : `file, size=${node.size}`
    })`
  )
  if (node.isDirectory) {
    for (const child of node.children) {
      printTree(child, depth + 1)
    }
  }
}
const getSize = (node, directoryCallback = () => {}) => {
  if (!node.isDirectory) {
    return node.size
  }
  const directorySize = node.children
    .map((child) => getSize(child, directoryCallback))
    .reduce((a, b) => a + b, 0)
  directoryCallback(node.name, directorySize)

  return directorySize
}

const part1 = () => {
  const maxSize = 100000
  const tree = createTree(lines)
  //printTree(tree)

  let sumOfFolderSize = 0

  getSize(tree, (name, size) => {
    if (size < maxSize) {
      sumOfFolderSize += size
    }
  })

  console.log(sumOfFolderSize)
}

//part1()

const part2 = () => {
  const totalSpace = 70000000
  const neededSpace = 30000000
  const tree = createTree(lines)

  const usedSpace = getSize(tree)
  const availableSpace = totalSpace - usedSpace
  if (availableSpace > neededSpace) {
    throw new Error("There is already enough space available")
  }
  const minimumFolderSize = neededSpace - availableSpace
  const goodCandidates = []

  getSize(tree, (name, size) => {
    if (size >= minimumFolderSize) {
      goodCandidates.push({ name, size })
    }
  })

  goodCandidates.sort((a, b) => a.size - b.size)

  console.log(goodCandidates[0].size)
}

part2()
