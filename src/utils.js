const vscode = require('vscode');
const fs = require('fs');

exports.getCamelName = function getCamelName(name) {
  const Name = (name || '').replace(/[-_\s]+(\w)/ig, function (match, p) {
    return p.toUpperCase();
  });
  return Name[0].toUpperCase() + Name.slice(1);
}

exports.showMessage = function showMessage(message, type = 'error') {
  // vscode api
  // https://code.visualstudio.com/docs/extensionAPI/vscode-api
  vscode.window[`show${getCamelName(type)}Message`](message);
}

exports.showInputBox = async function showInputBox(baseDirectory) {
  try {
    const input = await vscode
      .window
      .showInputBox({
        prompt: `Enter name of React Component for Bisfish to be added under: ${baseDirectory}`,
        placeHolder: `React Component Name`
      });
    return input;
  } catch (e) {
    showMessage(e, 'error')
    return;
  }
}

exports.readFile = function (filePath) {
  return new Promise(function (res, rej) {
    fs.readFile(filePath, function (err, data) {
      if (err) {
        showMessage(err);
        rej(err)
      } else {
        res(data);
      }
    });
  });
}

exports.writeFile = function (filePath, data) {
  return new Promise(function (res, rej) {
    fs.writeFile(filePath, data, function (err) {
      if (err) {
        showMessage(err);
        rej(err)
      } else {
        res();
      }
    });
  });
}

