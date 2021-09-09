const { readFileSync } = require("fs");
const { resolve } = require("path");

const currentEnvironment = process.env.APP_ENVIRONMENT || "production";

module.exports = JSON.parse(readFileSync(
  resolve(__dirname, "environments", `environment.${currentEnvironment}.json`),
  { encoding: "utf8" },
));
