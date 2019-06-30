'use babel';

const childprocess = require('child_process');

exports.getBranch = function getBranch(dir) {
  cmd = 'git branch';
  stdout = childprocess.execSync(cmd, {cwd: dir});
  output = stdout.toString().match(/(\S+)|\*/g);
  id = output.indexOf('*');
  thisBranch = output[id + 1];
  output.splice(id, 2);
  output.unshift(thisBranch);
  return output
}

exports.merge = function merge(branch, dir) {
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

      if (error.toString().includes('Your local changes to the following files would be overwritten by merge')) {
        atom.notifications.addWarning('Please commit your changes before merge.');
        return;
      }

      if (error.toString().includes('not possible because you have unmerged files')) {
        atom.notifications.addError('Merging not possible because of you have unmerged files.')
        return;
      }

      if (error.toString().includes('not a git repository')) {
        atom.notifications.addError('Not in a git repository.')
        return;
      }

      atom.notifications.addError('Execution Error', {detail: error});
      return;
    }
    if (stdout.toString().includes('Already up to date')) {
      atom.notifications.addSuccess(`Already up to date with ${branch}.`);
      return;
    }
    atom.notifications.addSuccess('Unknown Error', {detail: stdout})
  });
}
