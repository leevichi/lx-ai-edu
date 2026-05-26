import fs from "fs";

const files = [
  "app/apply/page.tsx",
  "components/apply/CourseCart.tsx",
  "components/apply/CourseCatalog.tsx",
  "components/apply/CurriculumResult.tsx",
];

const motionClose = "</motion.div>";
const divClose = "</motion.div>";

// Fix known wrong patterns: opened with <motion.div but closed with motionClose incorrectly
// Strategy: replace lines that are ONLY whitespace + wrong close when previous logic says div

for (const file of files) {
  let text = fs.readFileSync(file, "utf8");

  // Fix: <motion.div ...> ... </motion.div> where inner should be div - use targeted replacements

  const pairs = [
    // CourseCart
    [
      `<motion.div className="w-8 h-8 shrink-0 rounded-lg bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-300 font-mono">\n                  {idx + 1}\n                </motion.div>`,
      `<motion.div className="w-8 h-8 shrink-0 rounded-lg bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-300 font-mono">\n                  {idx + 1}\n                </motion.div>`,
    ],
  ];

  // Global fix: </motion.div> that should be </motion.div> - replace wrong closing tag string
  // Wrong tag is literally: </motion.div>
  const wrong = "</" + "motion.div>";
  const right = "</" + "motion.div>";

  // Only replace wrong closes that follow a line ending with </motion.div> pattern - too broad

  // Targeted fixes per file content
  if (file.includes("CourseCart")) {
    text = text
      .replace(
        /(<motion.div className="w-8[^>]*>[\s\S]*?\{idx \+ 1\})\s*<\/motion\.div>/,
        "$1</div>"
      )
      .replace(
        /(<motion.div className="flex-1 overflow-y-auto[^>]*>[\s\S]*?<\/AnimatePresence>)\s*<\/motion\.motion\.div>/,
        "$1</div>"
      );
  }

  fs.writeFileSync(file, text);
}

console.log("Use manual rewrite");
