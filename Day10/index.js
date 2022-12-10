import { readFileSync } from "fs"

const program = readFileSync("input.txt", "utf-8")
  .replace(/\r/g, "")
  .trim()
  .split("\n")
  .map((line) => {
    const [input, number] = line.split(" ")
    const res = {}
    res.op = input
    if (res.op === "addx") {
      res.value = parseInt(number)
    }
    return res
  })

class CPU {
  constructor(program) {
    this.program = program
    this.currentLine = 0
    this.cycle = 1
    this.wait = 0
    this.registers = {
      X: 1,
    }
    this.signalStrengths = []
  }
  runCycle() {
    if (this.currentLine >= this.program.length) {
      return false
    }
    this.cycle++

    const line = this.program[this.currentLine]
    switch (line.op) {
      case "noop":
        // Do nothing here
        this.currentLine++
        break
      case "addx":
        // wait one cycle and increase the register by value
        if (this.wait === 0) {
          this.wait = 1
        } else {
          this.wait--
          if (this.wait === 0) {
            this.registers.X += line.value
            this.currentLine++
          }
        }
        break
      default:
        throw new Error("unknown op: " + line.op)
    }
    return true
  }
  increaseRegister() {
    this.registers.X += this.program.value
  }
}

const part1 = () => {
  const cpu = new CPU(program)
  let sum = 0
  const totalCycles = 2 * cpu.program.length

  while (true) {
    if (!cpu.runCycle()) {
      break
    }

    if (cpu.cycle % 40 === 20) {
      sum += cpu.cycle * cpu.registers.X
    }
  }
  console.log(sum)
  console.log("We're done here")
}
class CRT {
  constructor(width = 40, height = 6, spriteWidth = 3) {
    this.width = width
    this.height = height
    this.currentIndex = 0

    this.content = new Array(this.height).fill(0).map((_) => new Array(this.width).fill(" "))
  }

  runCycle(spritePosition) {
    const x = this.currentIndex % this.width
    const y = Math.floor(this.currentIndex / this.width)
    if (y >= this.height) {
      return
    }
    if (Math.abs(x - spritePosition) < 2) {
      this.content[y][x] = "#"
    } else {
      console.log(y, x)
      this.content[y][x] = "."
    }
    this.currentIndex++
  }

  printScreen() {
    console.log(this.content.map((line) => line.join("")).join("\n"))
  }
}
const part2 = () => {
  const cpu = new CPU(program)
  const crt = new CRT()

  while (true) {
    crt.runCycle(cpu.registers.X)
    if (!cpu.runCycle()) {
      break
    }
  }

  crt.printScreen()
}

//part1()
part2()
