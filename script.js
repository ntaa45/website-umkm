// Menghitung produk pada tabel jika tabel tersedia
const rows = document.querySelectorAll("tbody tr");
const caption = document.querySelector("caption");

console.log("Jumlah produk pada tabel:", rows.length);

if (caption) {
  console.log("Caption tabel:", caption.textContent);
}

// Tombol Grid dan Flexbox
const catalog = document.querySelector("#catalog");
const status = document.querySelector("#layoutStatus");

document.querySelectorAll("[data-layout]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!catalog || !status) return;

    const mode = button.dataset.layout;

    catalog.classList.remove("layout-grid", "layout-flex");
    catalog.classList.add("layout-" + mode);

    status.textContent = mode === "grid"
      ? "Mode aktif: Grid dua dimensi"
      : "Mode aktif: Flexbox satu dimensi dengan wrapping";
  });
});