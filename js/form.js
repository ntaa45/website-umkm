
const form = document.querySelector("#form-kontak");
const preview = document.querySelector("#preview");
const statusForm = document.querySelector("#status-form");

// Menghubungkan input dengan pesan error masing-masing
const fieldErrors = {
  nama: document.querySelector("#error-nama"),
  email: document.querySelector("#error-email"),
  telepon: document.querySelector("#error-telepon"),
  paket: document.querySelector("#error-paket"),
  pesan: document.querySelector("#error-pesan"),
  topik: document.querySelector("#error-topik")
};

// Menentukan pesan berdasarkan hasil validasi browser
function getErrorMessage(input) {
  if (input.validity.valueMissing) {
    return "Bagian ini wajib diisi.";
  }
  if (input.validity.customError) {
  return input.validationMessage;
  }

  if (input.validity.typeMismatch) {
    return "Masukkan alamat email dengan format yang benar.";
  }

  if (input.validity.tooShort) {
    return `Minimal ${input.minLength} karakter.`;
  }

  return "Periksa kembali bagian ini.";
}

// Menghapus pesan error dari satu input
function clearError(input, errorElement) {
  errorElement.textContent = "";
  input.setAttribute("aria-invalid", "false");
}

// Menampilkan pesan error pada satu input
function showError(input, errorElement) {
  errorElement.textContent = getErrorMessage(input);
  input.setAttribute("aria-invalid", "true");
}

// Memvalidasi satu input
function validateInput(input, errorElement) {
  input.setCustomValidity("");

  if (input.name === "telepon" && input.value.trim() !== "") {
    const polaTelepon = /^(\+62|62|0)8[1-9][0-9]{7,11}$/;

    if (!polaTelepon.test(input.value.trim())) {
      input.setCustomValidity("Gunakan format nomor HP Indonesia yang benar.");
    }
  }

  if (!input.checkValidity()) {
    showError(input, errorElement);
    return false;
  }

  clearError(input, errorElement);
  return true;
}
// Memvalidasi pilihan topik
function validateTopik() {
  const topik = form.querySelector('input[name="topik"]');
  const error = fieldErrors.topik;

  if (!topik.checkValidity()) {
    error.textContent = "Silakan pilih topik pertanyaan.";
    topik.setAttribute("aria-invalid", "true");
    return false;
  }

  error.textContent = "";
  topik.setAttribute("aria-invalid", "false");
  return true;
}

// Memeriksa input ketika pengguna mulai memperbaikinya
["nama", "email", "telepon", "paket", "pesan"].forEach((name) => {
  const input = form.elements[name];
  const error = fieldErrors[name];

  input.addEventListener("input", () => {
    validateInput(input, error);
  });

  input.addEventListener("change", () => {
    validateInput(input, error);
  });
});

// Menghapus error topik ketika pilihan berubah
form.querySelectorAll('input[name="topik"]').forEach((radio) => {
  radio.addEventListener("change", validateTopik);
});

// Proses ketika form dikirim
form.addEventListener("submit", (event) => {
  event.preventDefault();

  statusForm.textContent = "";

  const inputs = [
    form.elements.nama,
    form.elements.email,
    form.elements.telepon,
    form.elements.paket,
    form.elements.pesan
  ];

  let firstInvalid = null;

  // Validasi semua input
  inputs.forEach((input) => {
    const valid = validateInput(input, fieldErrors[input.name]);

    if (!valid && !firstInvalid) {
      firstInvalid = input;
    }
  });

  // Validasi pilihan topik
  if (!validateTopik() && !firstInvalid) {
    firstInvalid = form.querySelector('input[name="topik"]');
  }

  // Jika ada kesalahan, fokus ke bagian pertama yang salah
  if (firstInvalid) {
    firstInvalid.focus();
    firstInvalid.reportValidity();
    statusForm.textContent = "Periksa kembali data yang masih belum benar.";
    return;
  }

  // Menampilkan data yang sudah valid pada preview
  const data = new FormData(form);

  preview.textContent = [
    "Nama: " + data.get("nama"),
    "Email: " + data.get("email"),
    "WhatsApp: " + (data.get("telepon") || "-"),
    "Waktu: " + (data.get("waktu") || "-"),
    "Channel kontak: " + (data.get("channel") || "-"),
    "Paket: " + data.get("paket"),
    "Topik: " + data.get("topik"),
    "Pesan: " + data.get("pesan")
  ].join("\n");

  statusForm.textContent =
    "Data berhasil divalidasi dan ditampilkan pada preview.";

  form.reset();

  // Mengembalikan status aksesibilitas setelah form direset
  inputs.forEach((input) => {
    clearError(input, fieldErrors[input.name]);
  });

  fieldErrors.topik.textContent = "";
  form.querySelector('input[name="topik"]').setAttribute("aria-invalid", "false");
});
