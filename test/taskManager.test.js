const assert = require('assert');
const fs = require('fs');
const path = require('path');
const TaskManager = require('../lib/taskManager');

describe('TaskManager', function() {
  const testFile = path.join(__dirname, 'tasks_test.json');

  afterEach(function() {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  it('should create a task and assign a unique id', function() {
    const tm = new TaskManager('memory');
    const task = tm.createTask('Test', 'Desc');
    assert.ok(task.id);
    assert.strictEqual(task.title, 'Test');
    assert.strictEqual(task.description, 'Desc');
  });

  it('should perform CRUD operations in memory', function() {
    const tm = new TaskManager('memory');
    const task = tm.createTask('A');
    assert.strictEqual(tm.getAllTasks().length, 1);
    const found = tm.getTaskById(task.id);
    assert.strictEqual(found.title, 'A');
    tm.updateTask(task.id, { completed: true });
    assert.strictEqual(tm.getTaskById(task.id).completed, true);
    tm.deleteTask(task.id);
    assert.strictEqual(tm.getAllTasks().length, 0);
  });

  it('should persist and load tasks from file', function() {
    const tm1 = new TaskManager('file', testFile);
    const task = tm1.createTask('Persisted');
    const id = task.id;
    const tm2 = new TaskManager('file', testFile);
    const loaded = tm2.getTaskById(id);
    assert.ok(loaded);
    assert.strictEqual(loaded.title, 'Persisted');
  });
});
