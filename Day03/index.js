import syncReadFile from "../utils.js"
import priorities from "./priorities.js"

const rucksacks = syncReadFile("input.txt")
const groupRucksacks = (rucksacks, groupLength) => {
  const res = []
  for (let i = 0; i < rucksacks.length; i += groupLength) {
    res.push(rucksacks.slice(i, i + groupLength))
  }
  return res
}
const getPriorities = (rucksacks, priorities) => {
  let prioritiesPerRucksacks = []
  const getCompartments = (rucksack, priorities) => {
    let firstComp = rucksack.substring(0, rucksack.length / 2)
    let secondComp = rucksack.substring(rucksack.length / 2, rucksack.length)
    const getItemType = (first, second) => {
      let itemType = ""
      for (let i = 0; i < first.length; i++) {
        if (second.includes(first[i])) {
          itemType = first[i]
        }
      }
      return itemType
    }
    const getPriority = (itemType, priorities) => {
      return priorities[itemType]
    }
    return getPriority(getItemType(firstComp, secondComp), priorities)
  }
  for (let i = 0; i < rucksacks.length; i++) {
    prioritiesPerRucksacks.push(getCompartments(rucksacks[i], priorities))
  }
  return prioritiesPerRucksacks
}

let listOfPriorities = getPriorities(rucksacks, priorities)

// part 1
//console.log(listOfPriorities.reduce((acc, currentValue) => acc + currentValue, 0))

// part 2
const listOfGroupedRucksacks = groupRucksacks(rucksacks, 3)

const getGroupItemType = (first, second, third) => {
  let itemType = ""
  for (let i = 0; i < first.length; i++) {
    if (second.includes(first[i]) && third.includes(first[i])) {
      itemType = first[i]
    }
  }
  return itemType
}
let itemTypesList = newFunction(listOfGroupedRucksacks)
function newFunction(listOfGroupedRucksacks) {
  let list = []
  for (let i = 0; i < listOfGroupedRucksacks.length; i++) {
    let first = listOfGroupedRucksacks[i][0]
    let second = listOfGroupedRucksacks[i][1]
    let third = listOfGroupedRucksacks[i][2]
    let groupItemType = getGroupItemType(first, second, third)
    list.push(groupItemType)
  }
  return list
}
const getPrioritiesList = (itemTypesList, priorities) => {
  let prioritiesList = []
  for (let itemType of itemTypesList) {
    let priority = getPriority(itemType, priorities)
    prioritiesList.push(priority)
  }
  return prioritiesList
}
const getPriority = (itemType, priorities) => {
  return priorities[itemType]
}
let newPrioritiesList = getPrioritiesList(itemTypesList, priorities)

console.log(newPrioritiesList.reduce((acc, CurrentValue) => acc + CurrentValue, 0))
