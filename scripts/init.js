const { execSync } = require('child_process');

function runCommand(command, cwd) {
  execSync(command, { stdio: 'inherit', cwd });
}

runCommand('yarn', './site');
runCommand('yarn');
runCommand('yarn icon');
runCommand('yarn build');
