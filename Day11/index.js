import { readFileSync } from "fs"

const getOperationFunction = (input) => {
  return function (old) {
    const string = input.replace(/old/, old)
    return eval(string)
  }
}
const getMonkeys = () => {
  const monkeys = readFileSync("input.txt", "utf-8")
    .replace(/\r/g, "")
    .trim()
    .split("\n\n")
    .map((lines, monkeyId) => {
      const items = lines
        .match(/Starting items(?:[:,] (\d+))+/g)[0]
        .split(": ")[1]
        .split(", ")
        .map(Number)
      const operation = lines.match(/= ([^\n]+)/)[1]
      const divisibleBy = parseInt(lines.match(/divisible by (\d+)/)[1])
      const whenTrueSendTo = parseInt(lines.match(/If true: throw to monkey (\d)/)[1])
      const whenFalseSendTo = parseInt(lines.match(/If false: throw to monkey (\d)/)[1])

      return {
        id: monkeyId,
        totalInspectedObjects: 0,
        items,
        divisibleBy,
        operation: getOperationFunction(operation),
        sendTo: (item) => (item % divisibleBy === 0 ? whenTrueSendTo : whenFalseSendTo),
      }
    })
  return monkeys
}

const part1 = () => {
  const monkeys = getMonkeys()
  for (let i = 0; i < 20; i++) {
    for (let monkey of monkeys) {
      let items = monkey.items
      while (items.length) {
        let item = items.shift()
        monkey.totalInspectedObjects++
        item = monkey.operation(item)
        item = Math.floor(item / 3)
        const destination = monkey.sendTo(item)

        monkeys[destination].items.push(item)
      }
    }
  }
  const activity = monkeys.map((m) => m.totalInspectedObjects)
  activity.sort((a, b) => b - a)
  console.log(activity[0] * activity[1])
}

const part2 = () => {
  const monkeys = getMonkeys()
  const divider = monkeys.map((m) => m.divisibleBy).reduce((a, b) => a * b, 1)
  for (let i = 0; i < 10000; i++) {
    for (const monkey of monkeys) {
      let items = monkey.items
      while (items.length) {
        let item = items.shift()
        monkey.totalInspectedObjects++

        item = monkey.operation(item)
        item = item % divider
        const destination = monkey.sendTo(item)

        monkeys[destination].items.push(item)
      }
    }
  }
  const activity = monkeys.map((m) => m.totalInspectedObjects)
  activity.sort((a, b) => b - a)
  console.log(activity[0] * activity[1])
}

//part1()

part2()
