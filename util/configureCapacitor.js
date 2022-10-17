const promisify = require('util').promisify;
const ip = require('ip');
const access = promisify(require('fs').access);
const readFile = promisify(require('fs').readFile);
const writeFile = promisify(require('fs').writeFile);

module.exports = async (serve) => {
  try {
    const path = './capacitor.config.json';
    await access(path);
    let data = await readFile(path, 'utf-8');
    let json = JSON.parse(data);

    if (serve) {
      if (!json.hasOwnProperty('server')) {
        json.server = {};
      }
      json.server.url = `http://${ip.address()}:4200`;
    } else {
      if (json.hasOwnProperty('server')
          && json.server.hasOwnProperty('url')) {
            delete json.server.url;
      }
    }

    data = JSON.stringify(json, null, 2);
    await writeFile(path, data);
  }
  catch (err) {
    throw err;
  }
}
