
# taskmanagerutil


A robust task management package for Node.js with CRUD operations, search, file and directory utilities, and data persistence.

## Features
- Task creation with unique ID generation
- CRUD operations (Create, Read, Update, Delete)
- Task search by ID
- Data persistence (in-memory and JSON file storage)
- Reading and writing JSON/text files
- Directory creation and management
- File operations with error handling
- Data serialization and deserialization


## Installation
```bash
npm install taskmanagerutil
```

## Usage
tmFile.createTask('File Task');

```js
const { TaskManager, Task, fileUtils } = require('taskmanagerutil');

// In-memory usage
const tm = new TaskManager('memory');
const task = tm.createTask('My Task', 'Description');
console.log(tm.getTaskById(task.id));

// File-based usage
const tmFile = new TaskManager('file', 'tasks.json');
tmFile.createTask('File Task');

// File utilities
fileUtils.ensureDirectory('./data');
fileUtils.writeFile('./data/example.txt', 'Hello!');
const content = fileUtils.readFile('./data/example.txt');
```


## Testing
```bash
npm test

```


## License
MIT
