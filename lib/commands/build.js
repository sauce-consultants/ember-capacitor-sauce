module.exports = {
  name: 'cap:build',
  description: 'Build Ember project, sync capacitor app, and open capacitor project',
  works: 'insideProject',

  anonymousOptions: [
    '<targetPlatform>'
  ],

  availableOptions: [
    { name: 'environment', type: String, description: '(Default: development)'},
    { name: 'distribution', type: String, description: 'TODO'},
  ],

  run: function(commandOptions, rawArgs) {
    commandOptions.targetPlatform = rawArgs.shift();

    var BuildTask = require('../tasks/build-task');
    var build = new BuildTask({
      commandOptions: commandOptions,
      targetPlatform: commandOptions.targetPlatform,
    });

    return build.run();
  }
}
