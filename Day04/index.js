import syncReadFile from "../utils.js"

const pairs = syncReadFile("input.txt")

const getSectionArray = (pair) => {
  let assignments = pair.split(",")
  let assignmentsArray = assignments.map((line) => {
    return Array.from(line.matchAll(/\d+/g), (d) => Number.parseInt(d, 10))
  })
  return assignmentsArray
}

const pairsArray = pairs.map((pair) => getSectionArray(pair))

const filteredPairsforpart01 = pairsArray.filter((pairs) => {
  const [first, second] = pairs
  return (
    (first[0] >= second[0] && first[1] <= second[1]) ||
    (first[0] <= second[0] && first[1] >= second[1])
  )
})

//console.log(filteredPairsforpart01.length)

const filteredPairsforpart02 = pairsArray.filter((pairs) => {
  const [first, second] = pairs
  return (
    (second[0] <= first[1] && second[0] >= first[0]) ||
    (first[0] <= second[1] && first[0] >= second[0])
  )
})

console.log(filteredPairsforpart02.length)
