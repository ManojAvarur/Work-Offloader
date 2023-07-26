import { Command } from 'commander';
import { startChildProcess } from './work-offloader.js';
import { printLogNames, displayLog, deleteAllLogs, deleteLog } from './logHandler.js';

const program = new Command();

const options = program
    .name('workoffloader')
    .description('This program can be used to offload a long processing work to a child process ( new terminal window ) which helps in keeping the parent terminal free for any other execution.')
    .version('1.0')

    .option('-c, --command <command>', 'Command to execute')
    .option('-Cl, --create-log [yes / y / no / n]', 'Keep a log of the execution', 'yes')
    .option('-le, --log-expire [hours]', 'Log will be deleted after (default: 24 hours)', 24)
    .option('-ll, --list-logs', 'Lists all the logs')
    .option('-ld, --log-display <log-id>', 'Displayes the log by Id')
    .option('-dl, --delete-log <log-id>', 'Delete the log by Id')
    .option('-dal, --delete-all-logs', 'Delete All Logs')

    .parse( process.argv )
    .opts();

if( options.command ){
    startChildProcess( options );
} else if ( options.logDisplay ){
    displayLog( options.displayLog );
} else if ( options.deleteLog ){
    deleteLog( options.deleteLog )
} else if (options.deleteAllLogs){
    deleteAllLogs();
} else {
    printLogNames();
}

process.exit();