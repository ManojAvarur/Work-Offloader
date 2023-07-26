import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath( new URL( '.', import.meta.url ) );
const settingsFileName = 'settings.json';
const settingsFileLocation = join( __dirname, settingsFileName );

export function config(){
    const settings = JSON.parse( readFileSync( settingsFileLocation ).toString() );
    process.localSettings = settings;
}