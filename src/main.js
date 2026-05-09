import { User, UserDataBase } from './classes.js';
import { Order } from './order.js';

const display = document.getElementById('output');
display.innerHTML = ''; 

function print(text) {
    display.innerText += text + '\n';
}

// --- ТЕСТ SINGLETON ---
print("--- Тест Singleton (Одинак) ---");
const db1 = UserDataBase.getInstance();
const db2 = new UserDataBase();
print(`Чи db1 === db2? ${db1 === db2}`); 

// --- ТЕСТ API БАЗИ ДАНИХ ---
print("\n--- Тест API бази даних ---");
const newUser = new User("Дмитро", "dima@test.com", "pass123");
db1.createUser(newUser);
const found = db1.searchUser("Дмитро");
print(`Знайдено користувача: ${found[0].name} (${found[0].email})`);

// --- ТЕСТ РЕФАКТОРИНГУ ---
print("\n--- Тест Рефакторингу (Order) ---");
const items = [
    { name: "Хліб", price: 20, type: "food" },
    { name: "Телефон", price: 5000, type: "electronics" }
];
const myOrder = new Order(items, "Олександр");

const total = myOrder.calculateTotal().toFixed(2);

print(`Замовлення для: ${myOrder.customer}`);
items.forEach(item => print(`- ${item.name}: ${item.price} грн`));
print(`---------------------------`);
print(`ЗАГАЛЬНА СУМА: ${total} грн`);