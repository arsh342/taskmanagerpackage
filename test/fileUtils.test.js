const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { ensureDirectory, readFile, writeFile } = require('../lib/fileUtils');

describe('fileUtils', function() {
  const testDir = path.join(__dirname, 'tmp');
  const testFile = path.join(testDir, 'test.txt');

  before(function() {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true });
    }
  });

  after(function() {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true });
    }
  });

  it('should create a directory if it does not exist', function() {
    ensureDirectory(testDir);
    assert.ok(fs.existsSync(testDir));
  });

  it('should write and read a file', function() {
    const data = 'Hello, world!';
    writeFile(testFile, data);
    const read = readFile(testFile);
    assert.strictEqual(read, data);
  });

  it('should throw error when reading non-existent file', function() {
    assert.throws(() => readFile(path.join(testDir, 'nofile.txt')));
  });
});
