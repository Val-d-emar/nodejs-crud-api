import http from 'node:http'
import { db, User } from './db';
import { validate } from 'uuid';

export const rest_api = (req: http.IncomingMessage, res: http.ServerResponse) => {
    try {
        res.setHeader('Content-type', 'application/json');

        if (!req.url || !req.url.includes('api/users')) {
            res.statusCode = 404;
            res.end('{ "message": "requests to non-existing endpoints" }');
            return;
        }
        if (req.url.endsWith('api/users')) {
            switch (req.method) {
                case 'GET':
                    res.statusCode = 200;
                    res.end(JSON.stringify(db.get()));
                    break;
                case 'POST':
                    let data: string = '';
                    req.on('data', chunk => data = data.concat(chunk.toString()))
                        .on('end', () => {
                            try {
                                let user = JSON.parse(data);
                                if (User.check(user)) {
                                    db.add(user);
                                    res.statusCode = 201;
                                    res.end(JSON.stringify(user));
                                } else {
                                    res.statusCode = 400;
                                    res.end('{ "message": "request body does not contain required fields" }');
                                }
                            } catch {
                                res.statusCode = 400;
                                res.end('{ "message": "request body incorrect" }');
                            }
                        });
                    break;
                default:
                    res.statusCode = 400;
                    res.end('{ "message": "request incorrect" }');
            }
            return;
        }
        if (!req.url.includes('api/users/')) {
            res.statusCode = 404;
            res.end('{ "message": "Requests to non-existing endpoints" }');
            return;
        }
        let uid = req.url.replace(/^.+api\/users\//, '');
        if (uid.includes('/')) {
            res.statusCode = 404;
            res.end('{ "message": "Requests to non-existing endpoints" }');
            return;
        }
        if (!validate(uid)) {
            res.statusCode = 400;
            res.end('{ "message": "userId is invalid (not uuid) }');
            return;
        }

        if (req.method === 'GET') {
            const user = db.get(uid);
            if (user) {
                res.statusCode = 200
                res.end(JSON.stringify(user))
            } else {
                res.statusCode = 404
                res.end(`{ "message": "record with id === userId doesn't exist}`);
            }
            return;
        }

        if (req.method === 'PUT') {
            let data: string = '';
            req.on('data', chunk => data = data.concat(chunk.toString()))
                .on('end', () => {
                    try {
                        let user = JSON.parse(data);
                        if (User.check(user)) {
                            let user_ = db.update(uid, user);
                            if (user_) {
                                res.statusCode = 200;
                                res.end(JSON.stringify(user_));
                            } else {
                                res.statusCode = 404;
                                res.end(`{ "message": "record with id === userId doesn't exist}`);
                            }
                        } else {
                            res.statusCode = 400;
                            res.end('{ "message": "request body does not contain required fields" }');
                        }
                    } catch {
                        res.statusCode = 400;
                        res.end('{ "message": "request body incorrect" }');
                    }
                });
            return;
        }
        if (req.method === 'DELETE') {
            if (db.del(uid)) {
                res.statusCode = 204;
                res.end();
            } else {
                res.statusCode = 404;
                res.end(`{ "message": "record with id === userId doesn't exist}`);
            }
            return;
        }

        res.statusCode = 404;
        res.end('{ "message": "incorrect requests or non-existing endpoints" }');
        return;

    } catch (e) {
        res.statusCode = 500
        res.end(`{ 'message': , ${e} })`);
    }
}