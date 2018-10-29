const { exec } = require('child_process');

const { getCamelName, showInputBox, showMessage, readFile, writeFile } = require('./utils');

async function populateTemplate(type, srcName, targetName, pathToStore) {
  try {
    const content = await readFile(`${__dirname}/templates/${type}Component/${srcName}`);
    // file content
    const fileContent = String(content).replace(/<%= Name %>/igm, targetName);
    // write file
    await writeFile(`${pathToStore}/${srcName.replace(/__Name__/ig, targetName)}`, fileContent);
  } catch (err) {
    console.log('populateTemplate', err);
  }
}

module.exports = function fileGenerator(type) {
  return async function (file) {
    const dir = file.fsPath;
    // Display a message box to the user
    const targetName = getCamelName(await showInputBox(type, dir));
    if (targetName) {
      exec(`cd ${dir} && mkdir ${targetName} && cd ${targetName}`, (error, stdout, stderr) => {
        ['index.js', '__Name__.js', '__Name__.less'].forEach((srcName) => {
          populateTemplate(type, srcName, targetName, `${dir}/${targetName}`)
        });
        if (error) {
          showMessage(error, 'error')
        } else {
          showMessage(`${type}Component ${filename} has been generated.`)
        }
      });
    }
  };
}
