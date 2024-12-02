const testInput = `
3   4
4   3
2   5
1   3
3   9
3   3
`;

const delim = "   ";

function ptA(ti: string) {
  const lines = ti.split("\n").filter(Boolean);
  const left = lines.map((l) => l.split(delim)[0]).map(Number);
  const right = lines.map((l) => l.split(delim)[1]).map(Number);
  console.log({ left, right });

  if (left.length !== right.length) {
    throw new Error("invalid");
  }
  const leftSorted = left.toSorted((a, b) => a - b);
  const rightSorted = right.toSorted((a, b) => a - b);
  console.log({ leftSorted, rightSorted });
  const sum = leftSorted.reduce((acc, l, idx) => {
    const d = Math.abs(l - rightSorted[idx]);
    return acc + d;
  }, 0);
  return sum;
}

console.log(ptA(testInput));
Deno.readTextFile("./day-01-a.txt").then((r) => {
  const res = ptA(r);
  console.log(res);
});
