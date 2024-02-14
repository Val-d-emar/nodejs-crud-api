import 'dotenv/config';
import http from 'node:http'
import { rest_api } from './rest';

export const str: string = 'Hello';

export let PORT: number = process.env.port ?
    parseInt(process.env.port) ?
        parseInt(process.env.port)
        : 4000
    : 4000;

// Create a local server to receive data from
const server = http.createServer(rest_api);

export const crud_server = server.listen(PORT,
    () => console.log(`Listening port = ${PORT}`)).
    on('error', (e) => {
        if (e.name === 'EADDRINUSE') {
            console.error('Address in use, retrying...');
            setTimeout(() => {
                server.close();
                server.listen(++PORT);
            }, 1000);
        } else {
            console.log(e);
        }
    });    
