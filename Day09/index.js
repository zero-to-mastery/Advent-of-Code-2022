import { readFileSync } from "fs"

const motions = readFileSync("input.txt", "utf-8")
  .replace(/\r/g, "")
  .trim()
  .split("\n")
  .map((motion) => {
    const [letter, number] = motion.split(" ")
    return {
      direction: letter,
      totalSteps: parseInt(number),
    }
  })
const movesDefinition = {
  L: {
    x: -1,
    y: 0,
  },
  U: {
    x: 0,
    y: -1,
  },
  R: {
    x: 1,
    y: 0,
  },
  D: {
    x: 0,
    y: 1,
  },
}
class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  move(direction) {
    const delta = movesDefinition[direction]
    this.x += delta.x
    this.y += delta.y
  }
  follow(point) {
    const distance = Math.max(Math.abs(this.x - point.x), Math.abs(this.y - point.y))

    if (distance > 1) {
      const directionX = point.x - this.x
      // 0 => do nothing
      // 1 or 2 => this.x++
      // -1 or -2 => this.x--
      this.x += Math.abs(directionX) === 2 ? directionX / 2 : directionX
      const directionY = point.y - this.y
      this.y += Math.abs(directionY) === 2 ? directionY / 2 : directionY
    }
  }
}

const markVisited = (x, y, visited) => {
  visited.add(`${x} ${y}`)
}
const part1 = () => {
  const head = new Point(0, 0)
  const tail = new Point(0, 0)
  const visited = new Set()
  markVisited(0, 0, visited)
  for (const move of motions) {
    for (let i = 0; i < move.totalSteps; i++) {
      head.move(move.direction)
      tail.follow(head)
      markVisited(tail.x, tail.y, visited)
    }
  }

  console.log(visited.size)
}

const part2 = () => {
  const knots = new Array(10).fill(0).map((_) => new Point(0, 0))
  const visited = new Set()
  markVisited(0, 0, visited)

  for (const move of motions) {
    for (let i = 0; i < move.totalSteps; i++) {
      knots[0].move(move.direction)
      for (let j = 1; j < knots.length; j++) {
        const point = knots[j]
        point.follow(knots[j - 1])
      }
      const tail = knots[knots.length - 1]
      markVisited(tail.x, tail.y, visited)
    }
  }

  console.log(visited.size)
}
//console.log(motions)
//part1()
part2()
