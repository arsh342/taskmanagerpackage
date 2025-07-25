const assert = require('assert');
const Task = require('../lib/task');

describe('Task', function() {
  it('should create a task with a unique id', function() {
    const t1 = new Task('Title1');
    const t2 = new Task('Title2');
    assert.notStrictEqual(t1.id, t2.id);
  });

  it('should serialize and deserialize correctly', function() {
    const t = new Task('Title', 'Desc');
    t.completed = true;
    const obj = t.toJSON();
    const t2 = Task.fromJSON(obj);
    assert.strictEqual(t2.title, 'Title');
    assert.strictEqual(t2.description, 'Desc');
    assert.strictEqual(t2.completed, true);
    assert.strictEqual(t2.id, t.id);
  });
});
