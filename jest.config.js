module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "localmodules/**/*.js",
    "assets/javascripts/**/*.js",
    "!assets/javascripts/**/main.js",
  ],
};
