import { readFileSync } from "fs"
const syncReadFile = (filename) => {
  const content = readFileSync(filename, "utf-8")
  const array = content.split(/\n/)
  return array
}

const shapes = {
  // elf
  A: 1, // Rock
  B: 2, // Paper
  C: 3, // Scissors
  // player
  X: 1, // Rock
  Y: 2, // Paper
  Z: 3, // Scissors
}
const outcome = (elf, player) => {
  if (elf === "A" && player === "X") return 3
  if (elf === "B" && player === "Y") return 3
  if (elf === "C" && player === "Z") return 3

  if (elf === "A" && player === "Y") return 6
  if (elf === "B" && player === "Z") return 6
  if (elf === "C" && player === "X") return 6

  return 0
}

const playersHand = (elf, ending) => {
  // to lose
  if (elf === "A" && ending === "X") return "Z"
  if (elf === "B" && ending === "X") return "X"
  if (elf === "C" && ending === "X") return "Y"
  // to draw
  if (elf === "A" && ending === "Y") return "X"
  if (elf === "B" && ending === "Y") return "Y"
  if (elf === "C" && ending === "Y") return "Z"
  // to win
  if (elf === "A" && ending === "Z") return "Y"
  if (elf === "B" && ending === "Z") return "Z"
  if (elf === "C" && ending === "Z") return "X"
}

const getScore = (elf, player) => {
  let score = shapes[player] + outcome(elf, player)
  return score
}

const turns = syncReadFile("input.txt")

const part1Total = (turns) => {
  let total = 0
  for (let i = 0; i < turns.length; i++) {
    let elf = turns[i][0]
    let player = turns[i][2]
    total += getScore(elf, player)
  }
  return total
}

const part2Total = (turns) => {
  let total = 0
  for (let i = 0; i < turns.length; i++) {
    let elf = turns[i][0]
    let ending = turns[i][2]
    let player = playersHand(elf, ending)
    total += getScore(elf, player)
  }
  return total
}

console.log(part1Total(turns))
console.log(part2Total(turns))
