const { v4: uuidv4 } = require('uuid');

class Task {
  constructor(title, description = '', id = null) {
    this.id = id || uuidv4();
    this.title = title;
    this.description = description;
    this.completed = false;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      completed: this.completed
    };
  }

  static fromJSON(data) {
    const task = new Task(data.title, data.description, data.id);
    task.completed = data.completed || false;
    return task;
  }
}

module.exports = Task;
