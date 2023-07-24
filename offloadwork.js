import { spawn } from 'child_process';

function startChildProcess() {
  const childCommand = 'node'; // Replace this with the command you want to run in the child process
  const childArgs = ['worker.js']; // Replace this with the path to your child script

  // Spawn the child process
    const childProcess = spawn( 
        childCommand, 
        childArgs, 
        { 
            detached: true,
            stdio: 'ignore',
            shell: true, // Required for Windows
        }
    );

    childProcess.unref();
}

startChildProcess();
process.exit();
