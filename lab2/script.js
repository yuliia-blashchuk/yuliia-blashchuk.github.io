const menuData = [
  // ПЕРШІ СТРАВИ
  { name: "Шурпа", category: "first", desc: "Ситний та пряний східний суп з бараниною.", weight: "400 г", price: "195 грн", img: "images/shyrpa-2.jpg", ingredients: ["Баранина", "Картопля", "Цибуля", "Морква", "Прянощі"] },
  { name: "Борщ зі сметаною", category: "first", desc: "Традиційний український борщ на м'ясному бульйоні.", weight: "400 г", price: "165 грн", img: "images/borshch-2.jpg", ingredients: ["Буряк", "Яловичина", "Капуста", "Картопля", "Сметана"] },
  { name: "Курячий бульйон", category: "first", desc: "Прозорий бульйон з домашньою локшиною та яйцем.", weight: "300 г", price: "120 грн", img: "images/kurjachiy-buljon.jpg", ingredients: ["Курка", "Домашня локшина", "Морква", "Перепелине яйце"] },
  { name: "Зелений борщ", category: "first", desc: "Весняний суп зі свіжим щавлем та яйцем.", weight: "350 г", price: "145 грн", img: "images/zelenyy-borshch.webp", ingredients: ["Щавель", "Картопля", "Яйце", "Свинина", "Зелень"] },
  { name: "Сирний крем-суп", category: "first", desc: "Ніжне поєднання сиру та вершків з грінками.", weight: "250 г", price: "185 грн", img: "images/krem-sup-sirniy.jpg", ingredients: ["Плавлені сирки", "Вершки", "Картопля", "Грінки"] },
  { name: "Рамен", category: "first", desc: "Класичний азійський суп зі свининою чашу.", weight: "500 г", price: "240 грн", img: "images/ramen.jpg", ingredients: ["Локшина рамен", "Свинина чашу", "Яйце", "Бамбук", "Бульйон"] },
  
  // САЛАТИ
  { name: "Салат «Цезар»", category: "salad", desc: "Курка гриль, пармезан та фірмовий соус.", weight: "280 г", price: "195 грн", img: "images/zezar.jpg", ingredients: ["Куряче філе", "Салат Айсберг", "Пармезан", "Соус Цезар", "Крутони"] },
  { name: "Грецький салат", category: "salad", desc: "Свіжі овочі, сир фета та оливки каламата.", weight: "300 г", price: "160 грн", img: "images/Greckyj-salat.jpg", ingredients: ["Помідори", "Огірки", "Перець", "Сир Фета", "Оливки"] },
  { name: "Салат з лососем", category: "salad", desc: "Лосось, авокадо та кунжутна заправка.", weight: "250 г", price: "245 грн", img: "images/losos.jpg", ingredients: ["Слабосолений лосось", "Авокадо", "Мікс салатів", "Кунжут"] },
  
  // ДЕСЕРТИ
  { name: "Тирамісу", category: "dessert", desc: "Десерт на основі савоярді та маскарпоне.", weight: "180 г", price: "135 грн", img: "images/tiramisu.jpg", ingredients: ["Печиво савоярді", "Сир маскарпоне", "Кава", "Какао"] },
  { name: "Чизкейк", category: "dessert", desc: "Вершковий чизкейк з ягідним соусом.", weight: "200 г", price: "150 грн", img: "images/chizkejk.png", ingredients: ["Сир вершковий", "Пісочне печиво", "Вершкове масло", "Ягідний джем"] }
];

function renderMenu() {
  const categories = {
    first: document.getElementById("first-course-container"),
    salad: document.getElementById("salad-container"),
    dessert: document.getElementById("dessert-container")
  };

  // Очищуємо контейнери перед рендером
  Object.values(categories).forEach(container => { if(container) container.innerHTML = ""; });

  for (let i = 0; i < menuData.length; i++) {
    const item = menuData[i];
    const container = categories[item.category];
    
    if (container) {
      let ingList = "<ul>";
      for (let j = 0; j < item.ingredients.length; j++) {
        ingList += `<li>${item.ingredients[j]}</li>`;
      }
      ingList += "</ul>";

      container.innerHTML += `
        <article class="menu-card">
          <img src="${item.img}" alt="${item.name}" />
          <h3>${item.name}</h3>
          <p>${item.desc}</p>
          
          <button class="ing-btn" onclick="toggleIngredients(${i})">Інгредієнти</button>
          <div id="ing-block-${i}" class="ingredients-block" style="display: none;">
            ${ingList}
          </div>

          <div class="card-footer">
            <span class="weight">${item.weight}</span>
            <span class="price">${item.price}</span>
          </div>
        </article>
      `;
    }
  }
}

function toggleIngredients(index) {
  const block = document.getElementById(`ing-block-${index}`);
  if (block) {
    block.style.display = (block.style.display === "none") ? "block" : "none";
  }
}

// Запуск рендеру
document.addEventListener("DOMContentLoaded", renderMenu);

// ПУНКТ 3: РОБОТА З ВІДГУКАМИ 
const commentForm = document.getElementById('comment-form');
const commentsList = document.getElementById('comments-list');

// Функція для відображення коментаря
function displayComment(name, text, date) {
  if (!commentsList) return;
  const newListItem = document.createElement('li');
  newListItem.className = 'comment-item';
  newListItem.innerHTML = `
    <strong>${name}</strong>
    <p>${text}</p>
    <small style="color: #888;">${date}</small>
  `;
  commentsList.prepend(newListItem);
}

// Завантаження коментарів при старті
window.addEventListener('DOMContentLoaded', () => {
  const savedComments = JSON.parse(localStorage.getItem('restaurantComments')) || [];
  savedComments.forEach(c => displayComment(c.name, c.text, c.date));
});

// Обробка форми
if (commentForm) {
  commentForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const nameInput = document.getElementById('user-name');
    const commentInput = document.getElementById('user-comment');
    const date = new Date().toLocaleDateString();

    if (nameInput.value.trim() !== "" && commentInput.value.trim() !== "") {
      const name = nameInput.value;
      const text = commentInput.value;

      // 1. Показуємо на сторінці
      displayComment(name, text, date);

      // 2. Зберігаємо в пам'ять
      const savedComments = JSON.parse(localStorage.getItem('restaurantComments')) || [];
      savedComments.push({ name, text, date });
      localStorage.setItem('restaurantComments', JSON.stringify(savedComments));

      // 3. Очищуємо поля
      nameInput.value = "";
      commentInput.value = "";
    } else {
      alert("Будь ласка, заповніть усі поля!");
    }
  });
}