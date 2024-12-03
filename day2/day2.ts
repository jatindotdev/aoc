import { readFile } from "fs/promises";
import path from "path";

if (process.argv.length < 3) {
  console.error("Missing input file");
  process.exit(1);
}

const filename = path.join(import.meta.dirname, process.argv[2]);
const dataset = await readFile(filename, "utf-8");

function part1(dataset: string) {
  const reports = dataset
    .split("\n")
    .map((report) => report.split(" ").map(Number));
  let validReports = 0;

  for (let i = 0; i < reports.length; i++) {
    let valid = true;
    let positive = true;

    if (reports[i][1] - reports[i][0] > 0) {
      positive = true;
    } else {
      positive = false;
    }

    for (let j = 1; j < reports[i].length; j++) {
      let diff = reports[i][j] - reports[i][j - 1];

      if (positive && diff < 0) {
        valid = false;
        break;
      } else if (!positive && diff > 0) {
        valid = false;
        break;
      }

      diff = Math.abs(diff);

      if (diff > 3 || diff < 1) {
        valid = false;
        break;
      }
    }
    if (valid) {
      validReports++;
    }
  }

  return validReports;
}

function part2(dataset: string) {
  const reports = dataset
    .split("\n")
    .map((report) => report.split(" ").map(Number));
  let validReports = 0;

  function isValid(report: number[]) {
    let valid = true;
    let positive = true;

    if (report[1] - report[0] > 0) {
      positive = true;
    } else {
      positive = false;
    }

    for (let j = 1; j < report.length; j++) {
      let diff = report[j] - report[j - 1];

      if (positive && diff < 0) {
        valid = false;
        break;
      } else if (!positive && diff > 0) {
        valid = false;
        break;
      }

      diff = Math.abs(diff);

      if (diff > 3 || diff < 1) {
        valid = false;
        break;
      }
    }

    return valid;
  }

  for (let i = 0; i < reports.length; i++) {
    let valid = isValid(reports[i]);

    if (!valid) {
      for (let j = 0; j < reports[i].length; j++) {
        const newReport = reports[i].filter((_, index) => index !== j);

        let isValidReport = isValid(newReport);

        if (isValidReport) {
          valid = true;
          break
        }
      }
    }

    if (valid) {
      validReports++;
    }
  }

  return validReports;
}

const part1Result = part1(dataset);
console.log(part1Result);

const part2Result = part2(dataset);
console.log(part2Result);
