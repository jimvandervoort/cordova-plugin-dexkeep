const fs = require('fs');
const xml2js = require('xml2js');
const configXmlPath = 'platforms/android/res/xml/config.xml';
const keepfilePath = 'platforms/android/cordova-plugin-dexkeep/keepfile.txt';

module.exports = function(context) {
  let configData;

  try {
    configData = fs.readFileSync(configXmlPath, 'utf8');
  } catch (e) {
    console.error('Error reading config.xml:');
    console.error(e);
    proccess.exit(-1);
  }

  let parser = new xml2js.Parser();
  let json;

  parser.parseString(configData, function(err, result) {
    json = result;
  });

  const classList = json.widget.feature
    .map(feature => feature.param)
    .reduce((a, b) => a.concat(b))
    .map(param => param.$)
    .filter(param => param.name === 'android-package')
    .map((param) => {
      let value = param.value;
      value = value.replace(/\./g, '/');
      value += '.class';
      return value;
    })
    .join('\n');

    fs.writeFileSync(keepfilePath, classList);
}
