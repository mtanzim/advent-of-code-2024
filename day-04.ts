const testInput =
  "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";

function ptA(inp: string) {
  return parse(inp).reduce((acc, [a, b]) => acc + a * b, 0);
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

(async function main() {
  console.log(ptA(testInput));
  const res = await Deno.readTextFile("./day-04.txt").then(ptA);
  console.log(res);
})();
