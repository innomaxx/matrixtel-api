
import range from "$tools/range"

const ranges = [ [48, 57], [97, 102] ].map(rng => range(rng[0], rng[1]))
const charcodes = [ ...ranges[0], ...ranges[1] ]

export default function generateToken (length: number = 15) : string {
  return new Array(length).fill(0)
    .map(() => String.fromCharCode(charcodes.random()))
    .join("")
}
