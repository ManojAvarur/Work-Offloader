import { Command } from 'commander';
import { startChildProcess } from './work-offloader.js';
import { printLogNames, displayLog } from './logHandler.js';

const program = new Command();

const options = program
    .name('workoffloader')
    .description('This program can be used to offload a long processing work to a child process ( new terminal window ) which helps in keeping the parent terminal free for any other execution.')
    .version('1.0')

    .option('-c, --command <command>', 'Command to execute')
    .option('-Cl, --create-log [yes / y / no / n]', 'Keep a log of the execution', 'yes')
    .option('-le, --log-expire [hours]', 'Log will be deleted after (default: 24 hours)', 24)
    .option('-ll, --list-logs', 'Lists all the logs')
    .option('-dl, --display-log <log-id>', 'Displayes the log by Id')

    .parse( process.argv )
    .opts();

if( options.command ){
    startChildProcess( options );
} else if ( options.displayLog ){
    displayLog( options.displayLog );
} else {
    printLogNames();
}

process.exit();