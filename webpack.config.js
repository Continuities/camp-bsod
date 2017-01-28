var path = require('path');

module.exports = {
  entry: {
    "src/control-panel/www/index": "./src/control-panel/www/index.js"
  },
  output: {
    path: "./",
    filename: "[name].b.js"
  }
};