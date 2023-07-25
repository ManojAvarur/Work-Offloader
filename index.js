import { Command } from 'commander';
import { startChildProcess } from './work-offloader.js';

const program = new Command();

const options = program
    .name('offloadwork')
    .description('This program can be used to offload a long processing work to a child process ( new terminal window ) which helps in keeping the parent terminal free for any other execution.')
    .version('1.0')

    .option('-c, --command <command>', 'Command to execute')
    // .option('-n, --new-terminal <boolean>', 'Offload the process to a new terminal', true)
    .option('-cl, --create-log', 'Keep a log of the execution', true)
    .option('-le, --log-expire', 'Log will be deleted after (default: 24 hours)', 24)
    .option('-ll, --list-logs', 'Lists all the logs')
    .option('-dl, --display-log <log-id>', 'Displayes the log by Id')

    .parse()
    .opts();

if( options.command ){
    startChildProcess( options );
} else if ( options.displayLog ){
    console.log('Display log');
} else {
    console.log('list of logs');
}

process.exit();



// startChildProcess();
// process.exit();
