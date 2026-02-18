const gallery = document.getElementById("gallery");
const buttons = document.querySelectorAll(".buttons button");
const searchInput = document.getElementById("searchInput");

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.getElementById("close");

const categories = ["nature", "city", "people", "technology"];
const IMAGE_COUNT = 8;

/* Load Images from Unsplash Source */
function loadImages(category) {
  gallery.innerHTML = "";

  const cats = category === "all" ? categories : [category];

  cats.forEach(cat => {
    for (let i = 0; i < IMAGE_COUNT / cats.length; i++) {
      const img = document.createElement("img");

      // Unique URL to avoid caching same image
      img.src = `https://source.unsplash.com/600x400/?${cat}&sig=${Math.random()}`;

      img.onclick = () => {
        modal.style.display = "flex";
        modalImg.src = img.src;
      };

      gallery.appendChild(img);
    }
  });
}

/* Category Filter */
buttons.forEach(btn => {
  btn.onclick = () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    loadImages(btn.dataset.category);
  };
});

/* Search (REAL keyword search) */
searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter" && searchInput.value.trim()) {
    loadImages(searchInput.value.trim());
  }
});

/* Modal Close */
closeBtn.onclick = () => modal.style.display = "none";
modal.onclick = e => e.target === modal && (modal.style.display = "none");

/* Initial Load */
loadImages("all");
