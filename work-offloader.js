import { spawn } from 'child_process';
import { v4 } from 'uuid';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import moment from 'moment';
import { config } from './settingsParser.js';
import { fileURLToPath } from 'url';

config();
const __dirname = fileURLToPath( new URL( '.', import.meta.url ) );
const logsFolderLocation = join( __dirname, process.localSettings.LOGS_LOC );

/**
 * Starts a new detached terminal and execute the command passed by the user
 * @param {cmd | Terminal} command 
 * @param {yes | no | y | n} createLog 
 * @param {Integer} logExpire 
 */
export function startChildProcess({ command, createLog, logExpire }) {

    const uuidv4 = v4();
    let logName = null;

    if( ['yes', 'y'].includes( createLog.toLowerCase() ) ){
        logName = `${uuidv4}-${moment().unix()}-${moment().add(logExpire, 'h').unix()}.log`;

        if( !existsSync( logsFolderLocation ) ){
            mkdirSync( logsFolderLocation );
        }
    }

    const childCommand = `node`; 
    const childArgs = [ `"${join(__dirname, 'worker.js')}"`, `"${command}"`, `"${logsFolderLocation}"`, `"${logName}"` ]; 

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

    childProcess.unref();
    console.log(`\n\tProcess has been offloaded to a new terminal ${( createLog )? `< Log Id : ${uuidv4} >` : ``}\n`);
}