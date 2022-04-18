const path = require('path');

module.exports = {
  root: path.resolve(__dirname, '../'),
  outputPath: path.resolve(__dirname, '../', 'build'),
  entryPath: path.resolve(__dirname, '../', 'js/index.jsx'),
  templatePath: path.resolve(__dirname, '../', 'templates/index.php'),
  imagesFolder: 'build',
  fontsFolder: 'build',
  cssFolder: 'build',
  jsFolder: 'build'
};