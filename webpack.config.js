const path = require("path");

module.exports = {
  entry: "./assets/javascripts/main.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "public/javascripts"),
  },
  target: ["web", "es5"],
};
