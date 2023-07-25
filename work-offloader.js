import { spawn } from 'child_process';
import { v4 } from 'uuid';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import moment from 'moment';

const logFolderName = 'Logs';
const logsFolderLocation = join( process.cwd(), logFolderName );

export function startChildProcess({ command, createLog, logExpire }) {

    const uuidv4 = v4();
    let logName = null;

    if( createLog ){
        logName = `${uuidv4}-${moment().unix()}-${moment().add(logExpire, 'h').unix()}.log`;

        if( !existsSync( logsFolderLocation ) ){
            mkdirSync( logsFolderLocation );
        }
    }

    const childCommand = 'node worker.js'; 
    const childArgs = [ `"${command}"`, `"${logsFolderLocation}"`, `"${logName}"` ]; 

    // Spawn the child process
    const childProcess = spawn( 
        childCommand, 
        childArgs, 
        { 
            detached: true,
            stdio: 'ignore',
            shell: true
        }
    );

    console.log( childArgs );
    childProcess.unref();
    // console.log(`Process has been offloaded to a new terminal ${( createLog )? `< Log Id : ${uuidv4} >` : ``}`);
}