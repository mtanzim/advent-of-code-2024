const testInput =
  "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";

const testInputB =
  "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

function ptA(inp: string) {
  return parse(inp).reduce((acc, [a, b]) => acc + a * b, 0);
}

function ptB(inp: string) {
  return parseDosDonts(inp)
    .map(ptA)
    .reduce((acc, cur) => acc + cur, 0);
}

function parse(inp: string): [number, number][] {
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
  let matches;
  const results = [];

  while ((matches = regex.exec(inp)) !== null) {
    results.push([Number(matches[1]), Number(matches[2])] as [number, number]);
  }

  return results;
}

type Window = {
  t: "do" | "dont";
  idx: number;
};

function parseDosDonts(inp: string): string[] {
  const doIndices = [...inp.matchAll(/do\(\)/g)].map((a) => a.index);
  const dontIndices = [...inp.matchAll(/don't\(\)/g)].map((a) => a.index);

  const windows = doIndices
    .map((d) => ({ t: "do", idx: d }))
    .concat(dontIndices.map((d) => ({ t: "dont", idx: d })))
    .toSorted((a, b) => a.idx - b.idx) as Array<Window>;
  let isDoing = true;
  let marker = 0;
  const candidates = [];
  for (const w of windows) {
    if (isDoing && w.t === "dont") {
      candidates.push(inp.slice(marker, w.idx));
      marker = w.idx + 4;
      isDoing = false;
      continue;
    }
    if (!isDoing && w.t === "do") {
      isDoing = true;
      marker = w.idx + 2;
      continue;
    }
  }
  if (isDoing) {
    candidates.push(inp.slice(marker));
  }
  return candidates;
}

(async function main() {
  console.log(ptA(testInput));
  const res = await Deno.readTextFile("./day-04.txt").then(ptA);
  console.log(ptB(testInputB));
  const resB = await Deno.readTextFile("./day-04.txt").then(ptB);
  console.log(resB);
})();
