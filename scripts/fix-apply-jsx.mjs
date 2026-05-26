import fs from "fs";

const p = "app/apply/page.tsx";
const lines = fs.readFileSync(p, "utf8").split(/\r?\n/);
const motionClose = "</motion.div>";
const divClose = "</div>";

for (const i of [76, 120, 131, 141, 142]) {
  if (lines[i]?.includes(motionClose)) {
    lines[i] = lines[i].replace(motionClose, divClose);
  }
}

lines[77] = "          <div>";
lines[86] = lines[86]?.replace(motionClose, divClose) ?? lines[86];

lines[59] = lines[59]?.replace(
  '<motion.div className="fixed inset-0',
  '<div className="fixed inset-0'
);
lines[70] = lines[70]?.replace(motionClose, divClose);

fs.writeFileSync(p, lines.join("\n"));
console.log("Fixed JSX tags");
