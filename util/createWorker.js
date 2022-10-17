const { spawnSync } = require('child_process');

module.exports = (command, args, env) => {
  env = env || {};
  let worker = spawnSync(
    command, args,
    {shell:true, stdio: ['inherit', 'inherit', 'pipe'],
     env: {...process.env, ...env}}
  );
  if (worker.status) {
    throw {command: command, error: worker.stderr};
  }
};
