// Toggle Hamburger Menu untuk HP
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Otomatis Render Progress Lingkaran Keahlian (Skills)
document.querySelectorAll(".circular-progress").forEach((progress) => {
  const percent = progress.getAttribute("data-percent");
  const degree = (percent / 100) * 360;
  progress.style.background = `conic-gradient(#ff5722 ${degree}deg, #141414 0deg)`;
});

// Filter Portfolio
const filterBtns = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Hapus kelas aktif dari semua tombol
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    portfolioItems.forEach((item) => {
      if (filter === "all" || item.getAttribute("data-category") === filter) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});
