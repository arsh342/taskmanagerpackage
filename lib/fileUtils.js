const fs = require('fs');
const path = require('path');

function ensureDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (err) {
    throw new Error('Failed to read file: ' + err.message);
  }
}

function writeFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, data);
  } catch (err) {
    throw new Error('Failed to write file: ' + err.message);
  }
}

module.exports = {
  ensureDirectory,
  readFile,
  writeFile
};
