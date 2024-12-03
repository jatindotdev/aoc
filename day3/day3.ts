import { readFile } from "fs/promises";
import path from "path";

if (process.argv.length < 3) {
  console.error("Missing input file");
  process.exit(1);
}

const filename = path.join(import.meta.dirname, process.argv[2]);
const dataset = await readFile(filename, "utf-8");

function part1(dataset: string) {
  let multiples: number[][] = [];

  for (let i = 0; i < dataset.length; ) {
    i = dataset.indexOf("mul(", i);

    if (i === -1) {
      break;
    }

    let startIndex = i + 4;

    let commaIndex = dataset.indexOf(",", startIndex);
    let closingParenthesisIndex = dataset.indexOf(")", commaIndex);

    const a = Number(dataset.slice(startIndex, commaIndex));
    const b = Number(dataset.slice(commaIndex + 1, closingParenthesisIndex));

    if (!isNaN(a) && !isNaN(b)) {
      multiples.push([a, b]);
    }

    i = startIndex;
  }

  let result = 0;

  for (const [a, b] of multiples) {
    result += a * b;
  }

  return result;
}

function part2(dataset: string) {
  let multiples: [number, number][] = [];
  let i = 0;
  while (i < dataset.length) {
    let mulIndex = dataset.indexOf("mul(", i);
    let dontIndex = dataset.indexOf("don't()", i);

    if (mulIndex === -1) {
      break;
    }

    let startIndex = mulIndex + 4;

    let commaIndex = dataset.indexOf(",", startIndex);
    let closingParenthesisIndex = dataset.indexOf(")", commaIndex);

    const a = Number(dataset.slice(startIndex, commaIndex));
    const b = Number(dataset.slice(commaIndex + 1, closingParenthesisIndex));
    const multiple = [a, b] as [number, number];

    if (dontIndex !== -1 && dontIndex < mulIndex) {
      let startIndex = dontIndex + 7;
      let doIndex = dataset.indexOf("do()", startIndex);

      if (doIndex === -1) {
        break;
      }

      i = doIndex + 4;
      continue;
    }

    if (!isNaN(a) && !isNaN(b)) {
      multiples.push(multiple);
    }

    i = startIndex;
  }
  let result = 0;

  for (const [a, b] of multiples) {
    result += a * b;
  }

  return result;
}

const part1Result = part1(dataset);
console.log(part1Result);

const part2Result = part2(dataset);
console.log(part2Result);
