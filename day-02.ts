const testData = `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`;

(function main() {
  console.log(ptA(testData));
  console.log(ptB(testData));
  Deno.readTextFile("./day-02.txt").then((r) => {
    const resA = ptA(r);
    console.log(resA);
    const resB = ptB(r);
    console.log(resB);
  });
})();

function ptA(inp: string) {
  return processIn(inp)
    .map((line) => {
      return isSafe(line) ? 1 : 0;
    })
    .reduce((acc, cur) => acc + cur, 0 as number);
}

function ptB(inp: string) {
  return processIn(inp)
    .map((line) => {
      const isFullySafe = isSafe(line);
      if (isFullySafe) {
        return 1;
      }
      const subArrs = line.map((_, idx) =>
        line.slice(0, idx).concat(line.slice(idx + 1, line.length))
      );
      return subArrs.some(isSafe) ? 1 : 0;
    })
    .reduce((acc, cur) => acc + cur, 0 as number);
}

function processIn(inp: string): number[][] {
  return inp
    .split("\n")
    .filter(Boolean)
    .map((l) => l.split(" ").map(Number));
}

function isSafe(line: number[]): boolean {
  let isSafe = true;
  let dir: "incr" | "decr" = "decr";
  if (line.length < 2) {
    throw new Error("invalid");
  }
  if (line[1] > line[0]) {
    dir = "incr";
  }

  for (let i = 1; i < line.length; i++) {
    if (dir === "incr" && line[i] <= line[i - 1]) {
      isSafe = false;
      break;
    }
    if (dir === "decr" && line[i] >= line[i - 1]) {
      isSafe = false;
      break;
    }
    if (Math.abs(line[i] - line[i - 1]) > 3) {
      isSafe = false;
      break;
    }
  }
  return isSafe;
}
