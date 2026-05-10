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
}


export class Admin extends User {
    constructor(name, email, password) {
        super(name, email, password); 
        this.role = 'Admin';
    }
}


export class Moderator extends User {
    constructor(name, email, password) {
        super(name, email, password);
        this.role = 'Moderator';
    }
}


export class SuperAdmin extends Admin {
    constructor(name, email, password) {
        super(name, email, password);
        this.role = 'SuperAdmin';
    }
}


export class UserDataBase {
    static #instance = null; 
    #users = [];

    constructor() {
        if (UserDataBase.#instance) return UserDataBase.#instance; 
        this.#load();
        UserDataBase.#instance = this;
    }

    static getInstance() {
        if (!this.#instance) this.#instance = new UserDataBase();
        return this.#instance;
    }

    createUser(user) {
        this.#users.push(user);
        this.#save();
    }

    searchUser(name) {
        return this.#users.filter(u => u.name.includes(name));
    }

    #save() { localStorage.setItem('db_users', JSON.stringify(this.#users)); }
    #load() {
        const data = localStorage.getItem('db_users');
        this.#users = data ? JSON.parse(data) : [];
    }
}