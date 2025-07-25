const fs = require('fs');
const path = require('path');
const Task = require('./task');

class TaskManager {
  constructor(storageType = 'memory', filePath = 'tasks.json') {
    this.storageType = storageType;
    this.filePath = filePath;
    this.tasks = [];
    if (storageType === 'file') {
      this.loadFromFile();
    }
  }

  createTask(title, description = '') {
    const task = new Task(title, description);
    this.tasks.push(task);
    this.save();
    return task;
  }

  getTaskById(id) {
    return this.tasks.find(task => task.id === id) || null;
  }

  getAllTasks() {
    return this.tasks;
  }

  updateTask(id, updates) {
    const task = this.getTaskById(id);
    if (!task) return null;
    Object.assign(task, updates);
    this.save();
    return task;
  }

  deleteTask(id) {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index === -1) return false;
    this.tasks.splice(index, 1);
    this.save();
    return true;
  }

  save() {
    if (this.storageType === 'file') {
      try {
        fs.writeFileSync(this.filePath, JSON.stringify(this.tasks, null, 2));
      } catch (err) {
        throw new Error('Failed to save tasks: ' + err.message);
      }
    }
  }

  loadFromFile() {
    try {
      if (fs.existsSync(this.filePath)) {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        this.tasks = JSON.parse(data).map(Task.fromJSON);
      }
    } catch (err) {
      this.tasks = [];
    }
  }
}

module.exports = TaskManager;
