'use babel';

// module.exports.getBranch = getBranch;
path = atom.project.getPaths()[0];
const childprocess = require('child_process');

exports.getBranch = function getBranch(dir=path) {
  cmd = 'git branch';
  stdout = childprocess.execSync(cmd, {cwd: dir}, (error, stdout, stderr) => {
    if (error) {
      atom.notifications.addError(`exec error: ${error}`);
      return;
    }
  });
  output = stdout.toString().match(/(\w+)|\*/g);
  id = output.indexOf('*');
  thisBranch = output[id + 1];
  output.splice(id, 2);
  output.unshift(thisBranch);
  return output.toString().match(/\w+/g);
}

exports.merge = function merge(branch, dir=path) {
  cmd = `git merge ${branch}`;
  childprocess.exec(cmd, {cwd: dir}, (error, stdout, stderr) => {
    if (error) {
      if (`${stdout}`.includes('fix conflicts and then commit the result')) {
        atom.notifications.addWarning('Fix conflicts and then commit the result');
        return;
      }
      console.log(stdout);

      atom.notifications.addError(`exec error: ${error}`);
      return;
    }
    atom.notifications.addSuccess(stdout.toString().match(/Already up to date/)[0] + ` with ${branch}.`);
  });
}
