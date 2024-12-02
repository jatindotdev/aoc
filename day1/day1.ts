import { readFile } from "fs/promises";
import path from "path";

if (process.argv.length < 3) {
  console.error("Missing input file");
  process.exit(1);
}

const filename = path.join(import.meta.dirname, process.argv[2]);
const dataset = await readFile(filename, "utf-8");

function part1(dataset: string) {
  const leftColumn: number[] = [];
  const rightColumn: number[] = [];

  dataset.split("\n").forEach((line) => {
    const [left, right] = line.split("   ");
    leftColumn.push(Number(left));
    rightColumn.push(Number(right));
  });

  const sortedLeftColumn = leftColumn.sort((a, b) => a - b);
  const sortedRightColumn = rightColumn.sort((a, b) => a - b);

  const differences = sortedLeftColumn.map((left, index) => {
    return Math.abs(left - sortedRightColumn[index]);
  });

  const result = differences.reduce((acc, current) => acc + current, 0);

  return result;
}

function part2(dataset: string) {
  const leftColumn: number[] = [];
  const rightColumn: Map<number, number> = new Map();

  dataset.split("\n").forEach((line) => {
    const [left, right] = line.split("   ");
    leftColumn.push(Number(left));

    if (rightColumn.has(Number(right))) {
      rightColumn.set(Number(right), rightColumn.get(Number(right))! + 1);
    } else {
      rightColumn.set(Number(right), 1);
    }
  });

  let totalSimilarityScore = 0;

  for (const left of leftColumn) {
    if (rightColumn.has(left)) {
      totalSimilarityScore += left * (rightColumn.get(left) ?? 0);
    }
  }

  return totalSimilarityScore;
}

const part1Result = part1(dataset);
console.log(part1Result);

const part2Result = part2(dataset);
console.log(part2Result);