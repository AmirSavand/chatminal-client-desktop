const { readFileSync } = require("fs");
const { resolve } = require("path");

/** Current environment from environment variables (default is production). */
const currentEnvironment = process.env.APP_ENVIRONMENT || "production";

/** Export the environment as JSON object. */
module.exports = JSON.parse(readFileSync(
  resolve(__dirname, "environments", `environment.${currentEnvironment}.json`),
  { encoding: "utf8" },
));
