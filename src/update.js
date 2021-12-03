const { Octokit } = require("@octokit/rest");
const { showDialog } = require("./dialog");
const { app, shell } = require("electron");

const version = `v${app.getVersion()}`;

const octokit = new Octokit();

module.exports = {
  /**
   * Check for update of the application by comparing the current
   * version with the latest GitHub release version.
   *
   * If there's a new version, show a dialog about it and once clicked
   * for download, redirect to the release page.
   *
   * If there's no update, based on the parameter, show dialog or not.
   *
   * @param ignoreNoUpdate When false, shows dialog that says no update
   * available when there's no update.
   */
  checkForUpdate: (ignoreNoUpdate = true) => {
    octokit.rest.repos.getLatestRelease({
      owner: "AmirSavand",
      repo: "chatminal-client-desktop",
    }).then((response) => {
      if (version !== response.data.tag_name) {
        showDialog(
          [
            `There's a new version available for download: ${response.data.tag_name}`,
            `Current version: ${version}`,
          ],
          ["View Release", "Close"]
        ).then(data => {
          if (data.response === 0) {
            shell.openExternal(response.data.html_url);
          }
        });
      } else if (!ignoreNoUpdate) {
        showDialog([`You're currently using the latest version.`]);
      }
    });
  }
};
