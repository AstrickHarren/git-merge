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
  return stdout.toString().match(/\w+/g);
}

exports.merge = function merge(branch) {
  dir = path;
  cmd = `git merge ${branch}`;
  stdout = childprocess.execSync(cmd, {cwd: dir}, (error, stdout, stderr) => {
    if (error) {
      atom.notifications.addError(`exec error: ${error}`);
      return;
    }
  });
  atom.notifications.addSuccess(stdout.toString() + `with ${branch}`);
}
