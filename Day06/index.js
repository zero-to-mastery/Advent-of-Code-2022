import { readFileSync } from "fs"
const datastream = readFileSync("input.txt", "utf-8")

const part1Length = 4
const part2Length = 14

const handleInput = (markerLength) => {
  let found = false
  let start = 0
  while (found != undefined) {
    let substring = datastream.substring(start, start + markerLength)
    found = [...substring].find((e) => [...substring].includes(e, [...substring].indexOf(e) + 1))
    start++
  }
  return markerLength - 1 + start
}
console.log(
  "Part 01: Amount of characters need to be processed before the first start-of-packet marker is detected is",
  handleInput(part1Length)
)
console.log(
  "Part 02: Amount of characters need to be processed before the first start-of-packet marker is detected is",
  handleInput(part2Length)
)
