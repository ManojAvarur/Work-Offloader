import { exec } from 'child_process';
import { writeFileSync } from 'fs';
import { join } from 'path';

const args = process.argv.slice(2);

const command = args[0];
const logsFolderLocation = args[1];
const logFileName = args[2];
const logWriteLocation = join( logsFolderLocation, logFileName );

const data = { 'Currently Executing Command': command, 'Log File Name': logFileName };

writeFileSync( logWriteLocation, `Currently Executing Command : ${command}` );

exec( command, ( error, stdout, stderr ) => {
    if( logFileName !== 'null' ){
        error = ( error?.message )? `\n\nError : ${error.message.split('\n').join('\n\t')}` : '';
        stdout = ( stdout )? `\n\nStdout : ${stdout.split('\n').join('\n\t')}` : '';
        stderr = ( stderr )? `\n\nStderr : ${stderr.split('\n').join('\n\t')}` : '';

        writeFileSync( logWriteLocation, `Command : ${command} ${error} ${stdout} ${stderr}` );
    }
});