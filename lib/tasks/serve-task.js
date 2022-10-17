const createWorker = require('../../util/createWorker');
const configureCapacitor = require('../../util/configureCapacitor');
const chalk = require('chalk');

class ServeTask {
  constructor(options) {
    this.commandOptions = options.commandOptions || {};
    this.targetPlatform = options.targetPlatform;
  }

  async run() {
    process.on("SIGINT", () => {
      console.log(chalk.red("Interrupt signal recieved, quitting..."));
      process.exit(0);
    });
    if (!this.targetPlatform) {
      console.log(chalk.red('ember-capacitor-sauce: <targetPlatform> has not been specified'));
      return;
    }
    let buildArgs = ['--environment'];
    let environment = this.commandOptions.environment || 'development';
    buildArgs.push(environment);

    let flavour = this.commandOptions.flavour || '';
    let env = {CAPACITOR: true, FLAVOUR: flavour};
    try {
      console.log(chalk.green(`ember-capacitor-sauce: ember build --environment=${environment}; env vars = ${JSON.stringify(env)}`));
      createWorker('ember build', buildArgs, env);
      console.log(chalk.green('ember-capacitor-sauce: capacitor.config.json configure server url'));
      await configureCapacitor(true);
      console.log(chalk.green('ember-capacitor-sauce: sync capacitor projects'));
      createWorker('npx cap sync', [this.targetPlatform]);
      console.log(chalk.green(`ember-capacitor-sauce: opening ${this.targetPlatform} project`));
      createWorker('npx cap open', [this.targetPlatform]);
      console.log(chalk.green(`ember-capacitor-sauce: ember serve --environment=${environment}; env vars = ${JSON.stringify(env)}`));
      createWorker('ember serve', buildArgs, env);
    } catch(err) {
      if (err.command) {
        console.log(chalk.red(`ember-capacitor-sauce: failed to execute command '${err.command}':\n${err.error}`));
      } else {
        // must be thrown from configureCapacitor
        console.log(chalk.red('ember-capacitor-sauce: failed to configure capacitor.config.json:\n' + err));        
      }

    }
  }
}

module.exports = ServeTask;

