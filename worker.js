import { exec } from 'child_process';
import { error } from 'console';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { stderr } from 'process';

const args = process.argv.slice(2);

const command = args[0];
const logsFolderLocation = args[1];
const logFileName = args[2];
const logWriteLocation = join( logsFolderLocation, logFileName );

const data = { command, logsFolderLocation, logFileName, logWriteLocation };
console.log( data );


exec( command, ( error, stdout, stderr ) => {
    writeFileSync( logWriteLocation, `${error} ${stdout} ${stderr}` );
})



// fetch('http://127.0.0.1/', { method: 'POST', body: JSON.stringify( data ) } ).then( () => {} )
