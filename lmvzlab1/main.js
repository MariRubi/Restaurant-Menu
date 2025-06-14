document.addEventListener("DOMContentLoaded", () => {
  const favoriteButtons = document.querySelectorAll(".favorite-btn");

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  favoriteButtons.forEach(button => {
    const dishItem = button.closest(".dish-item");
    const title = dishItem.querySelector("h3").textContent;

    if (favorites.some(fav => fav.title === title)) {
      button.textContent = "🧡";
    }

    button.addEventListener("click", () => {
      const price = dishItem.querySelector(".price").textContent;
      const description = dishItem.querySelector(".description").textContent;
      const imageUrl = dishItem.querySelector("img").src; // Отримуємо URL зображення
      const dishData = { title, price, description, imageUrl };

      const existingIndex = favorites.findIndex(fav => fav.title === title);
      if (existingIndex === -1) {
        favorites.push(dishData);
        button.textContent = "🧡";
      } else {
        favorites.splice(existingIndex, 1);
        button.textContent = "🤍";
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
    });
  });

  document.getElementById("cart-btn").addEventListener("click", () => {
    window.location.href = "favorites.html";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const dishItems = document.querySelectorAll(".dish-item");

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();

    dishItems.forEach(item => {
      const title = item.querySelector("h3").textContent.toLowerCase();

      if (title.includes(searchTerm)) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  });
});

document.getElementById("help-button").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("help-modal").style.display = "block";
});

document.getElementById("close-help-modal").addEventListener("click", function () {
  document.getElementById("help-modal").style.display = "none";
});

window.addEventListener("click", function (e) {
  if (e.target === document.getElementById("help-modal")) {
    document.getElementById("help-modal").style.display = "none";
  }
});
