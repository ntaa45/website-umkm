// DATA PRODUK LUNARIA COFFEE
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



// P11: MEMBUAT ELEMEN KARTU PRODUK
function buatElemenProduk(item) {
  const kartu = document.createElement("article");
  kartu.className = "demo-product-card";

  if (item.unggulan) {
    const badge = document.createElement("span");
    badge.className = "demo-badge";
    badge.textContent = "Produk Unggulan";
    kartu.append(badge);
  }

  const judul = document.createElement("h3");
  judul.textContent = item.nama;

  const deskripsi = document.createElement("p");
  deskripsi.textContent = item.deskripsi;

  const kategori = document.createElement("p");
  kategori.textContent = "Kategori: " + item.kategori;

  const infoStok = document.createElement("p");
  infoStok.textContent = "Stok: ";

  const stok = statusStok(item.stok);
  const labelStok = document.createElement("span");
  labelStok.className = "status-stok " + stok.className;
  labelStok.textContent = stok.label;
  infoStok.append(labelStok);

  const aksi = document.createElement("div");
  aksi.className = "card-actions";

  const harga = document.createElement("strong");
  harga.textContent = formatRupiah(item.harga);
  aksi.append(harga);

  kartu.append(judul, deskripsi, kategori, infoStok, aksi);

  return kartu;
}

// P11: EMPTY STATE
function buatEmptyState(kategori) {
  const pesan = document.createElement("div");
  pesan.className = "empty-state";
  pesan.textContent =
    "Belum ada produk untuk kategori " + kategori + ".";

  return pesan;
}

// P11: RENDER PRODUK BERDASARKAN KATEGORI
function renderProduk(kategoriAktif = "Semua") {
  const tempatProduk = document.querySelector("#produk-dinamis");
  const tempatRingkasan = document.querySelector("#produk-ringkasan");

  if (!tempatProduk || !tempatRingkasan) return;

  let hasilFilter;

  if (kategoriAktif === "Semua") {
    hasilFilter = produk;
  } else if (kategoriAktif === "Kopi") {
    hasilFilter = produk.filter(item =>
      item.nama.toLowerCase().includes("kopi") ||
      item.nama.toLowerCase().includes("brew")
    );
  } else {
    hasilFilter = produk.filter(item =>
      item.kategori === kategoriAktif
    );
  }

  // Membersihkan kartu sebelumnya
  tempatProduk.replaceChildren();

  // Menampilkan jumlah produk
  tempatRingkasan.textContent =
    "Kategori " + kategoriAktif + " menampilkan " +
    hasilFilter.length + " produk dari " +
    produk.length + " total produk.";

  // Menampilkan empty state jika tidak ada hasil
  if (hasilFilter.length === 0) {
    tempatProduk.append(buatEmptyState(kategoriAktif));
    return;
  }

  // Membuat dan memasukkan kartu produk
  hasilFilter.forEach(item => {
    const kartu = buatElemenProduk(item);
    tempatProduk.append(kartu);
  });
}

// P11: EVENT LISTENER TOMBOL FILTER
const tombolFilter = document.querySelectorAll("[data-filter]");

tombolFilter.forEach(tombol => {
  tombol.addEventListener("click", () => {
    tombolFilter.forEach(item => {
      item.classList.remove("is-active");
    });

    tombol.classList.add("is-active");

    const kategori = tombol.dataset.filter;
    renderProduk(kategori);
  });
});

// Menampilkan semua produk saat halaman dibuka
renderProduk("Semua");


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
function aktifkanHamburger() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector("#nav-menu");

  if (!menuToggle || !navMenu) return;

  function tutupMenu() {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
    navMenu.classList.remove("menu-terbuka");
  }

  menuToggle.addEventListener("click", () => {
    const menuTerbuka =
      menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute(
      "aria-expanded",
      String(!menuTerbuka)
    );

    menuToggle.textContent = menuTerbuka ? "☰" : "✕";
    navMenu.classList.toggle("menu-terbuka", !menuTerbuka);
  });

  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", tutupMenu);
  });

  window.addEventListener("pageshow", tutupMenu);
}

aktifkanHamburger();
