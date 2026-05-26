import { User, UserDataBase } from './classes.js';
import { Order } from './order.js';

const output = document.getElementById('output');
output.innerHTML = '';
const print = (t) => console.log(t);

print("=== Тест Singleton ===");
const db1 = UserDataBase.getInstance();
const db2 = new UserDataBase();
print(`db1 === db2? ${db1 === db2}`);

print("\n=== Тест API базы данных ===");
const u1 = new User("Олександр", "root@dev.ua", "pass1");
const u2 = new User("Дмитро", "dima@test.com", "pass2");
const u3 = new User("Олена", "olena@test.com", "pass3");

db1.createUser(u1);
db1.createUser(u2);
db1.createUser(u3);

print("\nПошук за ім'ям 'Дмитро':");
const found = db1.searchUser("Дмитро");
found.forEach(u => print(`  → ${u.getInfo()}`));

print("\nВидалення користувача (Дмитро):");
const isDeleted = db1.deleteUser(u2.id);
print(`  ${isDeleted ? 'Успішно видалений' : 'Не знайдено'}`);
print(`  Лишилось в базі: ${db1.searchUser('').length}`);

print("\nВидалення користувачів з 'О':");
db1.deleteAllUsers("О");
print(`  Осталось в базе: ${db1.searchUser('').length}`);

print("\n=== Тест Рефакторинга ===");
const items = [
    { name: "Хліб", price: 20, type: "food" },
    { name: "Телефон", price: 5000, type: "electronics" }
];
const myOrder = new Order(items, "Олександр");
print(`Повна сума: ${myOrder.calculateTotal().toFixed(2)} грн`);
