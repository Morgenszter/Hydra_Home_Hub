const fs = require("fs");
const path = require("path");

const root = process.cwd();
const targets = ["node_modules", "package-lock.json", ".expo", ".metro-cache"];
for (const target of targets) {
  const full = path.join(root, target);
  if (fs.existsSync(full)) {
    fs.rmSync(full, { recursive: true, force: true });
    console.log(`removed ${target}`);
  }
}

console.log("HYDRA Android clean complete.");
console.log("Next: npm install --legacy-peer-deps");
