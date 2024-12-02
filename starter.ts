import { mkdir, writeFile } from "fs/promises";
import path from "path";

if (process.argv.length < 3) {
  console.error("Missing folder name");
  process.exit(1);
}

const folderName = process.argv[2];
const folderPath = path.join(process.cwd(), folderName);

try {
  await mkdir(folderPath);

  const nameTsContent = `import { readFile } from "fs/promises";
import path from "path";

if (process.argv.length < 3) {
  console.error("Missing input file");
  process.exit(1);
}

const filename = path.join(import.meta.dirname, process.argv[2]);
const dataset = await readFile(filename, "utf-8");

function part1(dataset: string) {

}

function part2(dataset: string) {

}

const part1Result = part1(dataset);
console.log(part1Result);

const part2Result = part2(dataset);
console.log(part2Result);
`;

  await writeFile(path.join(folderPath, `${folderName}.ts`), nameTsContent);
  await writeFile(path.join(folderPath, "sample.txt"), "");
  await writeFile(path.join(folderPath, "input.txt"), "");

  console.log(`Folder and files created successfully in ${folderPath}`);
} catch (error) {
  console.error("Error creating folder and files:", error);
}
