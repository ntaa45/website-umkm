// DATA PRODUK KOPI NUSA
const produk = [
  {
    nama: "Kopi Tubruk Signature",
    kategori: "Minuman",
    harga: 18000,
    stok: 12,
    unggulan: true,
    deskripsi: "Kopi hitam dengan rasa kuat dan khas.",
    gambar: "img/5266/img/kopi-tubruk.jpg"
  },
  {
    nama: "Cold Brew Aren",
    kategori: "Minuman",
    harga: 22000,
    stok: 8,
    unggulan: true,
    deskripsi: "Kopi dingin dengan manis gula aren.",
    gambar: "img/5266/img/cold-brew.jpg"
  },
  {
    nama: "Taro Latte",
    kategori: "Minuman",
    harga: 20000,
    stok: 0,
    unggulan: false,
    deskripsi: "Minuman taro creamy dan menyegarkan.",
    gambar: "img/5266/img/taro-latte.jpg"
  },
  {
    nama: "Chicken Rice Bowl",
    kategori: "Makanan",
    harga: 25000,
    stok: 10,
    unggulan: true,
    deskripsi: "Nasi dengan ayam dan saus pilihan.",
    gambar: "img/5266/img/rice-bowl.jpg"
  },
  {
    nama: "French Fries",
    kategori: "Makanan",
    harga: 15000,
    stok: 15,
    unggulan: false,
    deskripsi: "Kentang goreng renyah.",
    gambar: "img/5266/img/french-fries.jpg"
  },
  {
    nama: "Brownies Cokelat",
    kategori: "Makanan",
    harga: 18000,
    stok: 0,
    unggulan: false,
    deskripsi: "Brownies cokelat lembut.",
    gambar: "img/5266/img/brownies.jpg"
  }
];

// FORMAT HARGA RUPIAH
const formatRupiah = (harga) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(harga);
};

// MENAMPILKAN DATA KE DOM
function renderProduk() {
  const tempatProduk = document.querySelector("#produk-dinamis");

  if (!tempatProduk) return;

  let hasilHTML = "";

  produk.forEach((item) => {

    // CONDITIONAL STATUS STOK
    let statusStok = item.stok > 0
  ? '<span class="status-stok tersedia">Tersedia</span>'
  : '<span class="status-stok tidak-tersedia">Tidak Tersedia</span>';

    // CONDITIONAL PRODUK UNGGULAN
    let badge = item.unggulan
      ? '<span class="demo-badge">Produk Unggulan</span>'
      : "";

    hasilHTML += `
      <article class="demo-product-card">
        ${badge}
        <h3>${item.nama}</h3>
        <p>${item.deskripsi}</p>
        <p>Kategori: ${item.kategori}</p>
        <p>Stok: ${statusStok}</p>
        <div class="card-actions">
          <strong>${formatRupiah(item.harga)}</strong>
        </div>
      </article>
    `;
  });

  tempatProduk.innerHTML = hasilHTML;
}

// MEMANGGIL FUNGSI RENDER PRODUK
renderProduk();

// MENAMPILKAN DATA DI CONSOLE
console.table(produk);

// TOMBOL GRID DAN FLEXBOX
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
// MENAMPILKAN GALERI PRODUK
function renderGaleri() {
  const tempatGaleri = document.querySelector("#galeri-dinamis");

  if (!tempatGaleri) return;

  let hasilGaleri = "";

  produk.forEach((item) => {
    hasilGaleri += `
      <figure class="product-card">
        <img src="${item.gambar}" alt="${item.nama}">
        <figcaption>
          <strong>${item.nama}</strong>
          <p>${item.deskripsi}</p>
        </figcaption>
      </figure>
    `;
  });

  tempatGaleri.innerHTML = hasilGaleri;
}

// MEMANGGIL FUNGSI GALERI
renderGaleri();