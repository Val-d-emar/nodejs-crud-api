import {v4, validate} from 'uuid';

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
            return this._db;
        }
        if (validate(uid)) {
            return this._db.get(uid);
        }
        return false;
    }
    public add(record: Record) {
        record.id = v4();                
        return this._db.set(record.id, record).get(record.id);
    }
    public update(uid: string, record: Record) {
        if (validate(uid)) {
            if (this.get(uid)){
                return false;
            }    
            record.id == uid            
            return this._db.set(uid, record);
        }
        return false;
    }
    public del(uid: string) {
        if (validate(uid)) {
            return this._db.delete(uid);
        }
        return false;
    }
}

export const db = new DB_api(User);
