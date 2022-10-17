module.exports = {
  name: 'cap:serve',
  description: 'Build Ember project, sync capacitor app, serve Ember, and open capacitor project',
  works: 'insideProject',

  anonymousOptions: [
    '<targetPlatform>'
  ],

  availableOptions: [
    { name: 'environment', type: String, description: '(Default: development)'},
    { name: 'flavour', type: String, description: '(Some apps are themable based on the flavour, this flag passes down an environment variable FLAVOUR to the ember app, Default: None)'},
  ],

  run: function(commandOptions, rawArgs) {
    commandOptions.targetPlatform = rawArgs.shift();

    var ServeTask = require('../tasks/serve-task');
    var serve = new ServeTask({
      commandOptions: commandOptions,
      targetPlatform: commandOptions.targetPlatform,
    });

    return serve.run();
  }
}
