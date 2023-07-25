import { readdirSync, unlinkSync, readFileSync } from 'fs';
import { config } from 'dotenv';
import { join } from 'path'
import moment from 'moment';


config();
const logsLocation = join( process.cwd(), process.env.LOGS_LOC );

export function retriveAllLogs(){
    const logsList = {};

    readdirSync( logsLocation ).forEach( logCompleteName =>{ 
        const logNameSplit = logCompleteName.split('-');

        const expireDate = logNameSplit[ logNameSplit.length - 1 ].split('.')[0];
        const createdDate = logNameSplit[ logNameSplit.length - 2 ];
        const logId = logNameSplit.slice( 0, logNameSplit.length - 2 ).join('-');

        if( moment().unix() > expireDate ){
            unlinkSync( join( logsLocation, logCompleteName ) );
            return;
        }

        logsList[logId] = { logCompleteName, createdDate, expireDate };
    });

    
    return logsList;
}


export function displayLog( logId ){
    const log = retriveAllLogs()[logId];

    if( !log ){
        console.log(`\n\t---- No log found < Log Id : ${logId} > ----`);
        return;
    }

    console.log( '\n' + readFileSync( join( logsLocation, log.logCompleteName ) ).toString() );
}


export function printLogNames(){
    const logsList = retriveAllLogs();

    if( Object.keys( logsList ).length <= 0 ){
        console.log('\n\t---- No Logs To Display ----');
        return;
    }

    console.log('\nSl No. \t Log Id \t\t\t\t Created Date \t\t\t Expire Date');
    console.log('------ \t ------  \t\t\t\t ------------ \t\t\t -----------');

    Object.keys( logsList ).forEach( ( value, index ) => {
        console.log(`${++index})\t ${value} \t ${moment.unix( logsList[value].createdDate ).format( process.env.DATE_TIME_DISPLAY_FORMAT )} \t ${moment.unix( logsList[value].expireDate ).format( process.env.DATE_TIME_DISPLAY_FORMAT )}`);
    })
}