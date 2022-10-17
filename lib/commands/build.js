module.exports = {
  name: 'cap:build',
  description: 'Build Ember project, sync capacitor app, and open capacitor project',
  works: 'insideProject',

  anonymousOptions: [
    '<targetPlatform>'
  ],

  availableOptions: [
    { name: 'environment', type: String, description: '(Default: development)'},
    { name: 'flavour', type: String, description: 'Used for project with multiple capacitor projects per theme/version of app'},
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
