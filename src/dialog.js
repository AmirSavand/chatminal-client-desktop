const { dialog, nativeImage } = require("electron");
const { getIcon } = require("./icon");

module.exports = {
  showDialog: (detail, buttons = ["ok"]) => {
    return dialog.showMessageBox({
      title: `Chatminal`,
      detail: detail.join("\n"),
      buttons,
      icon: nativeImage.createFromPath(getIcon().png),
    });
  }
};
