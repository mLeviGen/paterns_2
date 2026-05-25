import { User, Admin, UserDataBase } from './classes.js';
import { Order } from './order.js';

document.body.innerHTML = '<pre id="output"></pre>';
const output = document.getElementById('output');
const print = (text) => output.innerText += text + '\n';

print("=== Результати Лабораторної №2 ===\n");

const db1 = UserDataBase.getInstance();
const db2 = new UserDataBase();
print(`Тест Singleton: Чи об'єкти однакові? ${db1 === db2}`); 

const admin = new Admin("Олександр", "alex@dev.de", "pass123");
db1.createUser(admin);
print(`Користувача додано: ${admin.name} (Role: ${admin.role})`);

print("\n--- Розрахунок замовлення (Рефакторинг) ---");
const items = [
    { name: "Хліб", price: 20, type: "food" },
    { name: "Телефон", price: 5000, type: "electronics" }
];

const order = new Order(items, admin.name);
print(`Замовник: ${order.customer}`);
items.forEach(item => print(`- ${item.name}: ${item.price} грн`));
print(`---------------------------`);
print(`ЗАГАЛЬНА СУМА: ${order.calculateTotal().toFixed(2)} грн`);
