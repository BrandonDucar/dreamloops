#!/usr/bin/env node
import process from "node:process";
import { exportDreamLoops } from "./index.js";

function value(args, flag) {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : undefined;
}

const args = process.argv.slice(2);
exportDreamLoops({ sourceDirectory: value(args, "--source"), outputDirectory: value(args, "--output") })
  .then((result) => console.log(JSON.stringify(result, null, 2)))
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
