const { join } = require("path");

module.exports = {
  /** Return PNG and ICO icons paths. */
  getIcon: () => {
    const output = {
      ico: join(__dirname, "assets", "icon.png"),
      png: join(__dirname, "assets", "icon.png"),
    };
    /** For linux, do not return ico file. */
    if (process.platform === "linux") {
      output.ico = output.png;
    }
    return output;
  },
};
