import syncReadFile from "../utils.js"

let caloriesByElves = syncReadFile("./input.txt")
let groupedElves = []
let elf = []
let total = 0
for (let i = 0; i < caloriesByElves.length; i++) {
  if (caloriesByElves[i].length !== 0) {
    elf.push(Number(caloriesByElves[i]))
  } else {
    getTotalCalories(elf)
  }
}
getTotalCalories(elf)
groupedElves.sort(function (a, b) {
  return b - a
})
let sum = 0
for (let k = 0; k < 3; k++) {
  sum += groupedElves[k]
}
console.log("For Part1:", groupedElves[0])
console.log("For Part2:", sum)

function getTotalCalories(items) {
  for (let j = 0; j < items.length; j++) {
    total += items[j]
  }
  groupedElves.push(total)
  elf = []
  total = 0
}
