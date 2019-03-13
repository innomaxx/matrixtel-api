
export default function range (from: number, to: number) : number[] {
  const result: number[] = []

  if (from > to) return result

  for (let i = from; i <= to; i++) result.push(i)
  return result
}
