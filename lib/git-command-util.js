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
      console.log(error);
      if (stdout.toString().includes('fix conflicts and then commit the result')) {
        atom.notifications.addWarning('Fix conflicts and then commit the result.');
        return
      }

      if (error.toString().includes('Please commit your changes')) {
        atom.notifications.addWarning('Please commit your changes before merge.');
        return;
      }

      if (error.toString().includes('not possible because you have unmerged files')) {
        atom.notifications.addError('Merging not possible because of you have unmerged files.')
        return;
      }

      atom.notifications.addError('Execution Error', {detail: error});
      return;
    }
    if (stdout.toString().includes('Already up to date')) {
      atom.notifications.addSuccess(`Already up to date with ${branch}.`);
      return;
    }
    atom.notifications.addError('Unknown Error', {detail: stdout})
  });
}
