// Toggle Hamburger Menu untuk HP
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Tutup menu hamburger saat salah satu link diklik
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("active"));
});

// Filter Portfolio
const filterBtns = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");
const portfolioEmpty = document.getElementById("portfolioEmpty");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Hapus kelas aktif dari semua tombol
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");
    let visible = 0;

    portfolioItems.forEach((item) => {
      if (
        filter === "all" ||
        item.getAttribute("data-category") === filter
      ) {
        item.style.display = "block";
        visible++;
      } else {
        item.style.display = "none";
      }
    });

    portfolioEmpty.hidden = visible > 0;
  });
});

// Modal Detail Proyek + Galeri Gambar
const modal = document.getElementById("projectModal");
const modalTag = document.getElementById("modalTag");
const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalCounter = document.getElementById("modalCounter");
const modalThumbs = document.getElementById("modalThumbs");
const modalDesc = document.getElementById("modalDesc");
const modalTech = document.getElementById("modalTech");
const modalClose = document.getElementById("modalClose");
const galleryPrev = document.getElementById("galleryPrev");
const galleryNext = document.getElementById("galleryNext");

let gallery = [];
let currentIndex = 0;
let lastFocused = null;

function renderGallery() {
  modalImage.src = gallery[currentIndex];
  modalImage.alt = modalTitle.textContent;
  modalCounter.textContent = `${currentIndex + 1} / ${gallery.length}`;

  // Highlight thumbnail aktif
  modalThumbs.querySelectorAll("button").forEach((btn, i) => {
    btn.classList.toggle("active", i === currentIndex);
  });

  // Sembunyikan tombol navigasi jika hanya ada 1 gambar
  const single = gallery.length < 2;
  galleryPrev.hidden = single;
  galleryNext.hidden = single;
}

function setImage(index) {
  currentIndex = (index + gallery.length) % gallery.length;
  renderGallery();
}

function openModal(item) {
  lastFocused = document.activeElement;

  modalTag.textContent = item.getAttribute("data-tag") || "";
  modalTitle.innerHTML = item.getAttribute("data-title") || "";

  // Deskripsi dipisahkan dengan tanda "|"
  const desc = (item.getAttribute("data-desc") || "")
    .split("|")
    .filter((p) => p.trim() !== "")
    .map((p) => `<p>${p.trim()}</p>`)
    .join("");
  modalDesc.innerHTML = desc;

  // Daftar teknologi
  const tech = (item.getAttribute("data-tech") || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => `<span>${t}</span>`)
    .join("");
  modalTech.innerHTML = tech;

  // Daftar gambar
  gallery = (item.getAttribute("data-images") || "")
    .split("|")
    .map((src) => src.trim())
    .filter(Boolean);

  // Thumbnail
  modalThumbs.innerHTML = gallery
    .map(
      (src, i) =>
        `<button type="button" aria-label="Gambar ${i + 1}"><img src="${src}" alt="" loading="lazy" /></button>`
    )
    .join("");

  modalThumbs.querySelectorAll("button").forEach((btn, i) => {
    btn.addEventListener("click", () => setImage(i));
  });

  currentIndex = 0;
  renderGallery();

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  modalClose.focus();
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (lastFocused) lastFocused.focus();
}

// Buka modal saat kartu portfolio diklik
portfolioItems.forEach((item) => {
  item.setAttribute("tabindex", "0");
  item.setAttribute("role", "button");

  item.addEventListener("click", () => openModal(item));
  item.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openModal(item);
    }
  });
});

modalClose.addEventListener("click", closeModal);
modal.querySelector("[data-close]").addEventListener("click", closeModal);
galleryPrev.addEventListener("click", () => setImage(currentIndex - 1));
galleryNext.addEventListener("click", () => setImage(currentIndex + 1));

// Kontrol keyboard saat modal terbuka
document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("open")) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowLeft") setImage(currentIndex - 1);
  if (e.key === "ArrowRight") setImage(currentIndex + 1);
});

// Geser gambar (swipe) di perangkat sentuh
let touchStartX = 0;
const galleryBox = document.querySelector(".modal-gallery");

galleryBox.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].screenX;
  },
  { passive: true }
);

galleryBox.addEventListener(
  "touchend",
  (e) => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 50) setImage(currentIndex + (diff < 0 ? 1 : -1));
  },
  { passive: true }
);

// Efek muncul saat section masuk ke layar
const revealTargets = document.querySelectorAll(
  ".service-card, .skill-box, .portfolio-item, .about-text, .about-image"
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  revealTargets.forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
}
