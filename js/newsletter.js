
const formNewsletter = document.querySelector("#form-newsletter");
const emailNewsletter = document.querySelector("#email-newsletter");
const checkboxNewsletter = document.querySelector("#newsletter-aktif");
const statusNewsletter = document.querySelector("#status-newsletter");

const STORAGE_KEY = "lunariaPreferensiNewsletter";

// Membaca preferensi yang tersimpan
function bacaPreferensi() {
  try {
    const dataTersimpan = localStorage.getItem(STORAGE_KEY);

    if (!dataTersimpan) {
      return null;
    }

    return JSON.parse(dataTersimpan);
  } catch (error) {
    console.error("Gagal membaca preferensi:", error);
    return null;
  }
}

// Mengisi form dari preferensi sebelumnya
function tampilkanPreferensi() {
  const preferensi = bacaPreferensi();

  if (preferensi) {
    emailNewsletter.value = preferensi.email || "";
    checkboxNewsletter.checked = preferensi.aktif === true;
  }
}

// Menyimpan preferensi newsletter
formNewsletter.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = emailNewsletter.value.trim();
  const aktif = checkboxNewsletter.checked;

  if (aktif && !emailNewsletter.checkValidity()) {
    statusNewsletter.textContent =
      "Masukkan alamat email yang valid untuk berlangganan.";
    emailNewsletter.focus();
    emailNewsletter.reportValidity();
    return;
  }

  const preferensi = {
    email: aktif ? email : "",
    aktif: aktif
  };

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(preferensi)
    );
    
    if (!aktif) {
      emailNewsletter.value = "";
        }

    statusNewsletter.textContent =
      "Preferensi newsletter berhasil disimpan.";

  } catch (error) {
    console.error("Gagal menyimpan preferensi:", error);

    statusNewsletter.textContent =
      "Preferensi gagal disimpan di browser.";
  }
});

// Memuat preferensi ketika halaman dibuka
tampilkanPreferensi();
