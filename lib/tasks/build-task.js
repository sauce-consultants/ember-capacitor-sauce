const Task = require('ember-cli/lib/models/task');

class BuildTask extends Task {
  constructor(...args) {
    super(...args);
    
  }
  async run() {
    console.log('yeah');
  }
}

module.exports = BuildTask;
