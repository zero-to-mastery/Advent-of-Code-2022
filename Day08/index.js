import { readFileSync } from "fs"
const treesGrid = readFileSync("input.txt", "utf-8")
  .replace(/\r/g, "")
  .trim()
  .split("\n")
  .map((treeRow) => treeRow.split("").map((tree) => parseInt(tree)))

const gridColumns = treesGrid[0].length - 1
const gridRows = treesGrid.length - 1
let visibleTrees = 0
let hightestScenicScore = 0
const getVisibleTreesAmount = (grid) => {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (isTreeVisible(row, col)) {
        ++visibleTrees
      }
      const scenicScore = getScenicScore(row, col)
      if (scenicScore > hightestScenicScore) hightestScenicScore = scenicScore
    }
  }
}

const isTreeVisible = (row, col) => {
  if (row === 0 || row === gridRows || col === 0 || col === gridColumns) return true
  const baseTree = treesGrid[row][col]

  const rowTallest = { left: 0, right: 0 }
  for (const [index, tree] of treesGrid[row].entries()) {
    if (index === col && rowTallest.left < baseTree) return true
    if (index < col && tree > rowTallest.left) rowTallest.left = tree
    else if (index > col && tree > rowTallest.right) rowTallest.right = tree
  }
  if (rowTallest.right < baseTree) return true

  const colTallest = { top: 0, bottom: 0 }
  for (const [index, currentRow] of treesGrid.entries()) {
    if (index === row && colTallest.top < baseTree) return true
    if (index < row && currentRow[col] > colTallest.top) colTallest.top = currentRow[col]
    else if (index > row && currentRow[col] > colTallest.bottom) colTallest.bottom = currentRow[col]
  }

  return colTallest.bottom < baseTree
}

const getScenicScore = (row, col) => {
  if (row === 0 || row === gridRows || col === 0 || col === gridColumns) return 0

  const crossSectionArray = [
    treesGrid[row].slice(0, col + 1).reverse(),
    treesGrid[row].slice(col),
    treesGrid.reduce(
      (arr, thisRow, index) => (index <= row ? [thisRow[col], ...arr] : [...arr]),
      []
    ),
    treesGrid.reduce(
      (arr, thisRow, index) => (index >= row ? [...arr, thisRow[col]] : [...arr]),
      []
    ),
  ]

  return crossSectionArray.reduce(
    (currentScore, section) => getScenicScoreForSection(section) * currentScore,
    1
  )
}

const getScenicScoreForSection = (sectArr) => {
  let scoreLeft = -1

  for (const [index, tree] of sectArr.entries()) {
    ++scoreLeft
    if (tree >= sectArr[0] && index > 0) break
  }
  return scoreLeft
}
getVisibleTreesAmount(treesGrid)
console.log("part1:", visibleTrees)
console.log("part2:", hightestScenicScore)
