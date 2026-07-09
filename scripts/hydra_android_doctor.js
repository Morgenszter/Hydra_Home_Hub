const fs = require("fs");
const path = require("path");

function exists(rel) {
  return fs.existsSync(path.join(process.cwd(), rel));
}

const checks = [
  "node_modules/@babel/parser",
  "node_modules/@babel/core",
  "node_modules/babel-preset-expo",
  "node_modules/metro",
  "node_modules/expo",
  "node_modules/react-native",
];

let ok = true;
for (const rel of checks) {
  const pass = exists(rel);
  console.log(`${pass ? "OK " : "MISS"} ${rel}`);
  if (!pass) ok = false;
}

process.exit(ok ? 0 : 1);
