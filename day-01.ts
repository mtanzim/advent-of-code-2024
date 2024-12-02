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

  if (left.length !== right.length) {
    throw new Error("invalid");
  }
  const leftSorted = left.toSorted((a, b) => a - b);
  const rightSorted = right.toSorted((a, b) => a - b);
  const sum = leftSorted.reduce((acc, l, idx) => {
    const d = Math.abs(l - rightSorted[idx]);
    return acc + d;
  }, 0);
  return sum;
}

function ptB(ti: string) {
  const lines = ti.split("\n").filter(Boolean);
  const left = lines.map((l) => l.split(delim)[0]).map(Number);
  const right = lines.map((l) => l.split(delim)[1]).map(Number);

  if (left.length !== right.length) {
    throw new Error("invalid");
  }
  const leftSorted = left.toSorted((a, b) => a - b);

  const rightGrouped = right.reduce((acc, cur) => {
    if (acc?.[cur] !== undefined) {
      return {
        ...acc,
        [cur]: acc[cur] + 1,
      };
    }
    return {
      ...acc,
      [cur]: 1,
    };
  }, {} as Record<number, number>);

  const res = leftSorted.reduce((acc, l) => {
    if (rightGrouped?.[l]) {
      return acc + l * rightGrouped[l];
    }
    return acc;
  }, 0);
  return res;
}

(function main() {
  console.log(ptA(testInput));
  console.log(ptB(testInput));
  Deno.readTextFile("./day-01.txt").then((r) => {
    const resA = ptA(r);
    console.log(resA);
    const resB = ptB(r);
    console.log(resB);
  });
})();
