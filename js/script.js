document.addEventListener("DOMContentLoaded", () => {
  const catalog = document.getElementById("catalog");
  const status = document.getElementById("layoutStatus");
  const buttons = document.querySelectorAll("[data-layout]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.dataset.layout;

      catalog.classList.remove("layout-grid", "layout-flex");
      catalog.classList.add("layout-" + mode);

      status.textContent = mode === "grid"
        ? "Mode aktif: Grid dua dimensi"
        : "Mode aktif: Flexbox satu dimensi dengan wrapping";
    });
  });
});
alert("TOMBOL SCRIPT TERBACA");