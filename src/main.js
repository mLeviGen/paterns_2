import { User, UserDataBase } from './classes.js';
import { Order } from './order.js';

const print = (text) => console.log(text);

print("=== Тест Singleton ===");
const db1 = UserDataBase.getInstance();
const db2 = new UserDataBase();
print(`db1 === db2? ${db1 === db2}`); 

print("\n=== Тест API базы данных ===");
const u1 = new User("Олександр", "root@dev.ua", "pass1");
const u2 = new User("Дмитро", "dima@test.com", "pass2");
db1.createUser(u1);
db1.createUser(u2);

print("\nПошук за ім'ям 'Дмитро':");
const found = db1.searchUser("Дмитро");
found.forEach(u => print(` → ${u.getInfo()}`));

print("\n=== Тест Рефакторинга ===");
const items = [
    { name: "Хліб", price: 20, type: "food" },
    { name: "Телефон", price: 5000, type: "electronics" }
];
const myOrder = new Order(items, "Олександр");
myOrder.printReceipt(); 
