const fs = require('fs');
const xml2js = require('xml2js');

module.exports = function(context) {
  let json = '';
  
  try {
    let configData = fs.readFileSync('platforms/android/res/xml/config.xml', 'utf8');
  } catch (e) {
    console.error('Error reading config.xml:');
    console.error(e);
    proccess.exit(-1);
  }

  let parser = new xml2js.Parser();
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

    fs.writeFileSync('platforms/android/cordova-plugin-dexkeep/keepfile.txt', classList);
}
