// Entry point for the npm package
const TaskManager = require('./lib/taskManager');
const Task = require('./lib/task');
const fileUtils = require('./lib/fileUtils');

module.exports = {
  TaskManager,
  Task,
  fileUtils
};
