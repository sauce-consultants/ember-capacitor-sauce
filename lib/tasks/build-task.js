const createWorker = require('../../util/createWorker');
const configureCapacitor = require('../../util/configureCapacitor');
const chalk = require('chalk');

class BuildTask {
  constructor(options) {
    this.commandOptions = options.commandOptions || {};
    this.targetPlatform = options.targetPlatform;
  }

  async run() {
    if (!this.targetPlatform) {
      console.log(chalk.red('ember-capacitor-sauce: <targetPlatform> has not been specified'));
      return;
    }
    let buildArgs = ['--environment'];
    let environment = this.commandOptions.environment || 'development';
    buildArgs.push(environment);

    try {
      console.log(chalk.green(`ember-capacitor-sauce: ember build --environment=${environment}`));
      createWorker('ember build', buildArgs);
      console.log(chalk.green('ember-capacitor-sauce: capacitor.config.json configure server url'));
      await configureCapacitor(false);
      console.log(chalk.green('ember-capacitor-sauce: sync capacitor projects'));
      createWorker('npx cap sync', [this.targetPlatform]);
      console.log(chalk.green(`ember-capacitor-sauce: opening ${this.targetPlatform} project`));
      createWorker('npx cap open', [this.targetPlatform]);
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

module.exports = BuildTask;

