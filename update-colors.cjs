const fs = require('fs');
const path = require('path');

const walk = (dir, callback) => {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walk(dirPath, callback);
    } else {
      if (dirPath.endsWith('.jsx') || dirPath.endsWith('.css') || dirPath.endsWith('.js')) {
        callback(dirPath);
      }
    }
  });
};

const replaceColors = (content) => {
  // Tailwind Arbitrary values -> Theme values
  let newContent = content
    .replace(/bg-\[#062f34\]/g, 'bg-secondary')
    .replace(/text-\[#062f34\]/g, 'text-secondary')
    
    .replace(/bg-\[#088395\]/g, 'bg-primary')
    .replace(/text-\[#088395\]/g, 'text-primary')
    .replace(/from-\[#088395\]/g, 'from-primary')
    .replace(/to-\[#088395\]/g, 'to-primary')
    .replace(/shadow-\[#088395\]/g, 'shadow-primary')
    
    .replace(/bg-\[#E8E2DB\]/g, 'bg-textMain')
    .replace(/text-\[#E8E2DB\]/g, 'text-textMain')
    .replace(/from-\[#E8E2DB\]/g, 'from-textMain')
    .replace(/to-\[#E8E2DB\]/g, 'to-textMain')
    .replace(/via-\[#E8E2DB\]/g, 'via-textMain')
    
    .replace(/text-\[#b7c6c4\]/g, 'text-textMuted')
    .replace(/bg-\[#b7c6c4\]/g, 'bg-textMuted')
    .replace(/text-\[#b8c8c6\]/g, 'text-textMuted') // Portofolio has this
    .replace(/text-\[#d7deda\]/g, 'text-textMuted')
    .replace(/text-\[#d8d6d2\]/g, 'text-textMuted')

    // Replace JS inline strings & SweetAlert configs
    .replace(/['"]#088395['"]/g, "'var(--color-primary)'")
    .replace(/['"]#062f34['"]/g, "'var(--color-secondary)'")
    .replace(/['"]#E8E2DB['"]/g, "'var(--color-text-main)'")
    
    // Replace raw CSS hex codes in components (e.g. inline style or css files)
    // We only replace if they are raw CSS values (like `#088395` not wrapped in quotes or brackets)
    // But safely we can just do a direct string replace for leftover hexes (since they shouldn't appear randomly)
    .replace(/#062f34/g, 'var(--color-secondary)')
    .replace(/#088395/g, 'var(--color-primary)')
    .replace(/#E8E2DB/g, 'var(--color-text-main)')
    .replace(/#b7c6c4/g, 'var(--color-text-muted)');
    
  return newContent;
};

walk('./src', (filePath) => {
  // skip index.css because we will manually edit it, and we don't want the node script to mess up the variables
  if (filePath.endsWith('index.css')) return;
  
  const originalContent = fs.readFileSync(filePath, 'utf8');
  const modifiedContent = replaceColors(originalContent);
  if (originalContent !== modifiedContent) {
    fs.writeFileSync(filePath, modifiedContent, 'utf8');
    console.log('Updated:', filePath);
  }
});
