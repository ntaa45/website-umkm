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
console.log("Uji formatRupiah:");
console.log(formatRupiah(18000));
console.log(formatRupiah(25000));
console.log(formatRupiah(0));

// FUNGSI STATUS STOK
function statusStok(stok) {
  if (stok > 0) {
    return {
      label: "Tersedia",
      className: "tersedia"
    };
  } else {
    return {
      label: "Tidak Tersedia",
      className: "tidak-tersedia"
    };
  }
}

console.log("Uji statusStok:");
console.log(statusStok(10));
console.log(statusStok(0));
console.log(statusStok(-1));


// FUNGSI MEMBUAT KARTU PRODUK
function buatKartuProduk(item) {
  const stok = statusStok(item.stok);

  const badge = item.unggulan
    ? '<span class="demo-badge">Produk Unggulan</span>'
    : "";

  return `
    <article class="demo-product-card">
      ${badge}
      <h3>${item.nama}</h3>
      <p>${item.deskripsi}</p>
      <p>Kategori: ${item.kategori}</p>
      <p>Stok:
        <span class="status-stok ${stok.className}">
          ${stok.label}
        </span>
      </p>
      <div class="card-actions">
        <strong>${formatRupiah(item.harga)}</strong>
      </div>
    </article>
  `;
}

// UJI FUNGSI buatKartuProduk()
const hasilKartu = buatKartuProduk(produk[0]);

console.log("Uji buatKartuProduk:");
console.log(hasilKartu);

// UJI ARRAY METHODS

const hasilFilter = produk.filter(item => item.stok > 0);
console.log("Hasil filter:", hasilFilter);

const namaProduk = produk.map(item => item.nama);
console.log("Hasil map:", namaProduk);

const hasilFind = produk.find(item => item.unggulan === true);
console.log("Hasil find:", hasilFind);

// UJI FOREACH
console.log("Uji forEach:");

produk.forEach((item, index) => {
  console.log(index + 1, item.nama, item.stok);
});

// UJI CONSOLE TABLE
console.table(produk);


// MENAMPILKAN DATA KE DOM
function renderProduk() {
  const tempatProduk = document.querySelector("#produk-dinamis");

  if (!tempatProduk) return;

  const hasilHTML = produk
    .map((item) => buatKartuProduk(item))
    .join("");

  tempatProduk.innerHTML = hasilHTML;
}

// MENGHITUNG PRODUK YANG TERSEDIA DENGAN FILTER
const produkTersedia = produk.filter(item => item.stok > 0);

const tempatRingkasan = document.querySelector("#produk-ringkasan");

if (tempatRingkasan) {
  tempatRingkasan.innerHTML = `
    <p>Jumlah produk tersedia: <strong>${produkTersedia.length}</strong></p>
  `;
}

// MENCARI PRODUK UNGGULAN DENGAN FIND
const produkUnggulan = produk.find(item => item.unggulan === true);

const tempatUnggulan = document.querySelector("#produk-unggulan");

if (tempatUnggulan && produkUnggulan) {
  tempatUnggulan.innerHTML = `
    <h2>Produk Pilihan</h2>
    ${buatKartuProduk(produkUnggulan)}
  `;
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

// HAMBURGER MENU
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("#nav-menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const menuTerbuka =
      menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute(
      "aria-expanded",
      String(!menuTerbuka)
    );

    menuToggle.textContent = menuTerbuka ? "☰" : "✕";
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}

