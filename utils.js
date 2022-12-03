import { readFileSync } from "fs"

const syncReadFile = (filename) => {
  const content = readFileSync(filename, "utf-8")
  const array = content.split(/\n/)
  return array
}

export default syncReadFile
