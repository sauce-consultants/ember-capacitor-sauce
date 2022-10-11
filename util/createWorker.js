const { spawnSync } = require('child_process');

module.exports = (command, args) => {
  let worker = spawnSync(command, args, {shell:true, stdio: ['inherit', 'inherit', 'pipe']});
  if (worker.status) {
    throw {command: command, error: worker.stderr};
  }
};
