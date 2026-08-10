const fs = require('fs');
const path = require('path');

const replacements = {
  'text-brand-200': 'text-brand-800 dark:text-brand-200',
  'text-brand-300': 'text-brand-700 dark:text-brand-300',
  'text-brand-400': 'text-brand-700 dark:text-brand-400',
  'text-accent-300': 'text-accent-800 dark:text-accent-300',
  'text-accent-400': 'text-accent-700 dark:text-accent-400',
  'text-orangex-400': 'text-orangex-700 dark:text-orangex-400',
  'text-emerald-400': 'text-emerald-700 dark:text-emerald-400',
  'text-rose-200': 'text-rose-800 dark:text-rose-200',
  'text-rose-300': 'text-rose-700 dark:text-rose-300',
  'text-rose-400': 'text-rose-700 dark:text-rose-400',
  'text-amber-400': 'text-amber-700 dark:text-amber-400',
  'text-slate-300': 'text-slate-700 dark:text-slate-300',
  'text-slate-400': 'text-slate-600 dark:text-slate-400',
};

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // We should be careful to only replace exact class matches, not already replaced ones.
  for (const [find, replace] of Object.entries(replacements)) {
    // Regex to match the class name only if it's not preceded by `dark:`
    const regex = new RegExp(`(?<!dark:)${find}\\b`, 'g');
    content = content.replace(regex, replace);
  }
  
  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
