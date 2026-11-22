# SI-SURAT FASILKOM UNEJ
**Sistem Informasi Pengajuan dan Pelacakan Surat Administratif Fakultas Ilmu Komputer — Universitas Jember**

Prototipe web interaktif ini dikembangkan sebagai artefak pendukung **Validasi Kebutuhan** pada Proyek Akhir mata kuliah **Rekayasa Kebutuhan (Requirements Engineering)**.

---

## 📁 Struktur Direktori

Pastikan ketiga berkas utama berada dalam **satu direktori (folder) yang sama**:

```text
si-surat-fasilkom/
├── index.html      # Struktur antarmuka lintas aktor (Auth, Mahasiswa, Staff TU, Pimpinan)
├── style.css       # Styling tampilan responsif, status stepper, dan modal
├── app.js          # Logika simulasi alur surat, validasi NFR-05/NFR-06, dan notifikasi Pusher
└── README.md       # Dokumentasi penggunaan dan skenario validasi prototipe
```

---

## 🚀 Cara Menjalankan Mockup

Karena prototipe ini dibangun menggunakan *HTML, CSS, dan Vanilla JavaScript* tanpa dependensi eksternal maupun *database* backend, aplikasi dapat dijalankan langsung di *browser*:

1. **Cara Langsung (Double-Click):**
   - Buka folder proyek di File Explorer / Finder.
   - Klik dua kali pada berkas **`index.html`** untuk membukanya melalui Google Chrome, Microsoft Edge, atau Firefox.
2. **Menggunakan VS Code Live Server (Disarankan):**
   - Buka folder proyek di **Visual Studio Code**.
   - Klik kanan pada berkas **`index.html`**, lalu pilih **Open with Live Server**.

---

## 👥 Simulasi Peran & Cakupan Kebutuhan

Gunakan bilah navigasi hitam di bagian paling atas layar (**Simulasi Peran**) untuk berpindah antarmuka sesuai aktor pada *Use Case Diagram*:

1. **1. Login & Profil (`FR-01`, `FR-15`, `NFR-03`)**
   - Simulasi masuk menggunakan akun akademik sesuai peran pengguna.
   - Manajemen profil dan pembaruan kata sandi.
   - Indikator *timer* sesi otomatis 30 menit inaktif (`NFR-03`).
2. **2. Mahasiswa — Cindy Aulia Andriani / `242410102024` (`FR-02`, `FR-03`, `FR-07`, `FR-10`, `FR-14`, `NFR-05`, `NFR-06`)**
   - Formulir dinamis untuk **4 jenis layanan surat**:
     1. Surat Rekomendasi Beasiswa
     2. Surat Keterangan Aktif Kuliah
     3. Surat Tugas Lomba
     4. Surat Pengantar Magang
   - Simulasi validasi unggahan berkas maksimal **2 MB** (format PDF/JPG/PNG) beserta pesan galat berbahasa Indonesia dan fitur pratinjau dokumen sebelum dikirim.
   - Pelacakan status surat secara *real-time*, pengajuan ulang berkas revisi (`FR-07`), serta pengunduhan surat final berformat PDF (`FR-14`).
3. **3. Staff Tata Usaha (`FR-04`, `FR-05`, `FR-06`, `FR-11`, `FR-13`, `FR-16`)**
   - Pencarian dan penyaringan antrean pengajuan masuk (`FR-11`).
   - Pemrosesan berkas dan pembaruan status dengan kewajiban pengisian catatan alasan apabila surat ditolak/dikembalikan untuk revisi (`FR-06`).
   - Manajemen akun mahasiswa (Tambah, Ubah, dan Impor Massal CSV — `FR-16`).
4. **4. Pimpinan Fakultas — Wakil Dekan I & III (`FR-08`, `FR-09`, `FR-12`)**
   - Antrean pengesahan surat (*E-Approval*) sesuai pembagian wewenang Wakil Dekan I dan Wakil Dekan III (`FR-08`).
   - Dashboard kalkulasi rata-rata *Turnaround Time* layanan (`FR-09`) dan ekspor rekapitulasi laporan ke format CSV/Excel (`FR-12`).

---

## 🧪 Panduan Skenario Walkthrough (Validasi)

1. **Uji Validasi Unggahan (`NFR-05` & `NFR-06`):** Masuk ke peran **Mahasiswa**, klik tombol *Simulasi File > 2MB* atau *Simulasi Format .EXE* untuk melihat penolakan otomatis sistem, lalu gunakan tombol *Gunakan Berkas Valid (1.2 MB PDF)* dan klik *Kirim Pengajuan Surat*.
2. **Uji Verifikasi TU (`FR-05` & `FR-06`):** Beralih ke peran **Staff TU**, buka notifikasi lonceng, lalu ubah status surat baru menjadi **Menunggu Tanda Tangan** (atau uji penolakan tanpa catatan untuk memverifikasi validasi `FR-06`).
3. **Uji Pengesahan Pimpinan (`FR-08`):** Beralih ke peran **Pimpinan Fakultas**, klik **Setujui & Bubuhkan TTE** pada surat yang masuk.
4. **Uji Unduh Dokumen & Laporan (`FR-14`, `FR-09`, `FR-12`):** Kembali ke peran **Mahasiswa** untuk mengunduh PDF final, lalu cek tab **Laporan & Rekapitulasi** untuk melihat pembaruan metrik *turnaround time*.

---

## ✍️ Tim Penyusun

* **Cindy Aulia Andriani** — `242410102024`
* **Tunggul Abdul Majid** — `242410102058`
* **Rafi Hadianto Aribowo** — `242410102006`
* **Ezra Yuda Dwi Rismawan** — `232410101013`
