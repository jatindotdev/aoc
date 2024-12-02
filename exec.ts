import { $ } from "bun";

if (process.argv.length < 3) {
  console.error("Missing day name");
  process.exit(1);
}

const dayNo = Number(process.argv[2]);

if (isNaN(dayNo)) {
  console.error("Day name should be a number");
  process.exit(1);
}

const folderName = `day${dayNo}`;

if (process.argv.length < 4) {
  console.error("Missing input type");
  process.exit(1);
}

const inputType = process.argv[3];

if (inputType !== "sample" && inputType !== "input") {
  console.error("Input type should be either 'sample' or 'input'");
  process.exit(1);
}

await $`bun run ${folderName}/${folderName}.ts ${inputType}.txt`.throws(false);
