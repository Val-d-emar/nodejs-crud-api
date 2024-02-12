import { v4 } from 'uuid';

export class Record {
    constructor(
        public id?: string,
    ) { };
}

export class User extends Record {
    constructor(
        public username: string,
        public age: number,
        public hobbies: string[],
    ) {
        super();
    };
    static check(user: Object) {
        return ('username' in user) &&
            ('age' in user) &&
            ('hobbies' in user) &&
            (typeof user.username === 'string') &&
            (typeof user.age === 'number') &&
            (user.hobbies instanceof Array) &&
            (user.hobbies.find((item) => !(typeof item === 'string')) === undefined) &&
            ('id' in user ? typeof user.id === 'string' : true) &&
            Object.keys(user).length <= 4;
    }
}

export class DB_api {
    private _db: Map<string, Record>;
    constructor(
        public record_type: Object,
    ) {
        this._db = new Map<string, Record>();
    }
    public get(uid?: string) {
        if (uid === undefined) {
            let a: Record[] = [];
            this._db.forEach(val => {
                a.push(val);
            });
            return a;
        }
        return this._db.get(uid);
    }
    public add(record: Record) {
        record.id = v4();
        this._db.set(record.id, record)
        return this._db.get(record.id);
    }
    public update(uid: string, record: Record) {
        if (this.get(uid)) {
            record.id = uid;
            this._db.set(uid, record);
            return this._db.get(uid);
        }
        return false;
    }
    public del(uid: string) {
        return this._db.delete(uid);
    }
}

export const db = new DB_api(User);
