import fs from 'fs';
import path from 'path';

const DB_FILE = path.resolve(process.cwd(), 'users_db.json');

export class User {
    #password;
    constructor(name, email, password) {
        this.id = Math.random().toString(36).substring(2, 11);
        this.name = name;
        this.email = email;
        this.#password = password;
        this.role = 'User';
    }
    getInfo() { return `ID: ${this.id}, Name: ${this.name}, Role: ${this.role}`; }
    checkPassword(input) { return this.#password === input; }
    getRole() { return this.role; }
}

export class UserDataBase {
    static #instance = null;
    #users = [];

    constructor() {
        if (UserDataBase.#instance) {
            return UserDataBase.#instance;
        }
        this.#load(); 
        UserDataBase.#instance = this;
    }

    static getInstance() {
        if (!this.#instance) {
            this.#instance = new UserDataBase();
        }
        return this.#instance;
    }

    createUser(user) {
        this.#users.push(user);
        this.#save();
        return user;
    }

    searchUser(criteria) {
        if (typeof criteria === 'string') {
            return this.#users.filter(u => u.name.toLowerCase().includes(criteria.toLowerCase()));
        }
        return this.#users.filter(criteria);
    }

    deleteUser(id) {
        const beforeCount = this.#users.length;
        this.#users = this.#users.filter(u => u.id !== id);
        if (this.#users.length < beforeCount) {
            this.#save();
            return true;
        }
        return false; 
    }

    deleteAllUsers(criteria) {
        const beforeCount = this.#users.length;
        if (typeof criteria === 'function') {
            this.#users = this.#users.filter(u => !criteria(u));
        } else if (typeof criteria === 'string') {
            this.#users = this.#users.filter(u => !u.name.toLowerCase().includes(criteria.toLowerCase()));
        } else {
            this.#users = []; 
        }
        if (this.#users.length !== beforeCount) {
            this.#save();
        }
        return true;
    }

    #save() {
        try {
            fs.writeFileSync(DB_FILE, JSON.stringify(this.#users, null, 2), 'utf-8');
        } catch (err) {
            console.error('[DB Error] Помилка збереження:', err);
        }
    }

    #load() {
        try {
            if (fs.existsSync(DB_FILE)) {
                const data = fs.readFileSync(DB_FILE, 'utf-8');
                this.#users = JSON.parse(data);
            }
        } catch (err) {
            console.error('[DB Error] Помилка завантаження:', err);
            this.#users = [];
        }
    }
}
