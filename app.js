// STATE DATA SIMULASI (TERINTEGRASI LINTAS AKTOR)
let suratList = [
  {
    id: "SRT-2026-001",
    nim: "242410102024",
    nama: "Cindy Aulia Andriani",
    jenis: "Surat Tugas Lomba",
    detail: "GEMASTIK XIX — Divisi Pengembangan Perangkat Lunak (Ketua Tim)",
    lampiran: "Poster_Gemastik_2026.pdf (1.4 MB)",
    tanggalAjuan: "2026-11-21 09:15",
    status: "Ditolak/Revisi",
    catatanRevisi: "Lampiran Surat Pernyataan Orisinalitas karya belum ditandatangani. Silakan unggah ulang.",
    pejabat: "Wakil Dekan III",
    durasiJam: 26,
    hasFinalPdf: false
  },
  {
    id: "SRT-2026-002",
    nim: "242410102024",
    nama: "Cindy Aulia Andriani",
    jenis: "Surat Keterangan Aktif Kuliah",
    detail: "Keperluan Administrasi Tunjangan Orang Tua — Semester Ganjil 2026/2027",
    lampiran: "Bukti_Bayar_UKT_Ganjil.pdf (0.8 MB)",
    tanggalAjuan: "2026-11-20 13:40",
    status: "Soft File Tersedia",
    catatanRevisi: "",
    pejabat: "Wakil Dekan I",
    durasiJam: 18,
    hasFinalPdf: true
  },
  {
    id: "SRT-2026-003",
    nim: "242410102058",
    nama: "Tunggul Abdul Majid",
    jenis: "Surat Pengantar Magang",
    detail: "PT Telkom Indonesia (Persero) Tbk — Divisi Data Engineering (4 Bulan)",
    lampiran: "Proposal_Uraian_Tugas_Magang.pdf (1.7 MB)",
    tanggalAjuan: "2026-11-22 10:05",
    status: "Menunggu Tanda Tangan",
    catatanRevisi: "",
    pejabat: "Wakil Dekan I",
    durasiJam: 14,
    hasFinalPdf: false
  },
  {
    id: "SRT-2026-004",
    nim: "242410102006",
    nama: "Rafi Hadianto Aribowo",
    jenis: "Surat Rekomendasi Beasiswa",
    detail: "Beasiswa Bank Indonesia (GenBI) Tahun 2026 — IPK 3.88",
    lampiran: "Transkrip_Nilai_Sementara.pdf (1.1 MB)",
    tanggalAjuan: "2026-11-23 08:10",
    status: "Diajukan",
    catatanRevisi: "",
    pejabat: "Wakil Dekan III",
    durasiJam: 2,
    hasFinalPdf: false
  }
];

let mahasiswaUsers = [
  { nim: "242410102024", nama: "Cindy Aulia Andriani", prodi: "Teknologi Informasi", email: "242410102024@mail.unej.ac.id", aktif: true },
  { nim: "242410102058", nama: "Tunggul Abdul Majid", prodi: "Teknologi Informasi", email: "242410102058@mail.unej.ac.id", aktif: true },
  { nim: "242410102006", nama: "Rafi Hadianto Aribowo", prodi: "Teknologi Informasi", email: "242410102006@mail.unej.ac.id", aktif: true },
  { nim: "232410101013", nama: "Ezra Yuda Dwi Rismawan", prodi: "Teknologi Informasi", email: "232410101013@mail.unej.ac.id", aktif: true }
];

let notifications = {
  mahasiswa: [
    { id: 1, text: "SRT-2026-001 berstatus Ditolak/Revisi: Lampiran orisinalitas belum bertanda tangan.", time: "Baru saja" },
    { id: 2, text: "SRT-2026-002 berstatus Soft File Tersedia. PDF siap diunduh.", time: "1 jam lalu" }
  ],
  tu: [
    { id: 101, text: "Pengajuan baru SRT-2026-004 (Surat Rekomendasi Beasiswa) dari Rafi Hadianto.", time: "15 menit lalu" }
  ],
  pimpinan: [
    { id: 201, text: "SRT-2026-003 (Surat Pengantar Magang) menunggu persetujuan E-Approval WD I.", time: "30 menit lalu" }
  ]
};

let currentValidFile = "";

// NAVIGASI ANTAR-VIEW
function switchView(viewName) {
  document.querySelectorAll(".view-section").forEach(el => el.classList.remove("active"));
  document.getElementById("view-" + viewName).classList.add("active");

  document.querySelectorAll(".role-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.view === viewName);
  });

  renderAll();
}

function switchAuthTab(tab) {
  document.querySelectorAll(".tab-pill").forEach((el, idx) => {
    el.classList.toggle("active", (tab === "login" && idx === 0) || (tab === "profile" && idx === 1));
  });
  document.getElementById("form-login").classList.toggle("hidden", tab !== "login");
  document.getElementById("form-profile").classList.toggle("hidden", tab !== "profile");
}

function handleLogin(e) {
  e.preventDefault();
  const role = document.getElementById("loginRole").value;
  showToast("Login berhasil! Mengarahkan ke portal " + role.toUpperCase() + "...");
  switchView(role);
}

function handleLogout() {
  showToast("Anda telah keluar dari sesi sistem (Logout).");
  switchView("auth");
  switchAuthTab("login");
}

function handleSaveProfile(e) {
  e.preventDefault();
  showToast("Perubahan profil & kata sandi berhasil disimpan (FR-15).");
}

// FORM DINAMIS 4 JENIS SURAT (FR-02)
function renderDynamicFields() {
  const jenis = document.getElementById("jenisSurat").value;
  const container = document.getElementById("dynamicFieldsContainer");

  if (jenis === "Surat Rekomendasi Beasiswa") {
    container.innerHTML = `
      <div class="form-group">
        <label>Nama Program Beasiswa *</label>
        <input type="text" id="dynField1" placeholder="Contoh: Beasiswa Bank Indonesia / Djarum Beasiswa Plus" required />
      </div>
      <div class="form-group">
        <label>IPK Terakhir & Semester *</label>
        <input type="text" id="dynField2" placeholder="Contoh: IPK 3.85 — Semester 5" required />
      </div>`;
  } else if (jenis === "Surat Keterangan Aktif Kuliah") {
    container.innerHTML = `
      <div class="form-group">
        <label>Keperluan Pengajuan *</label>
        <input type="text" id="dynField1" placeholder="Contoh: Tunjangan Gaji Orang Tua / BPJS / Persyaratan Magang" required />
      </div>
      <div class="form-group">
        <label>Tahun Akademik *</label>
        <input type="text" id="dynField2" value="Ganjil 2026/2027" required />
      </div>`;
  } else if (jenis === "Surat Tugas Lomba") {
    container.innerHTML = `
      <div class="form-group">
        <label>Nama Kompetisi & Penyelenggara *</label>
        <input type="text" id="dynField1" placeholder="Contoh: GEMASTIK XIX — Kemendiktisaintek" required />
      </div>
      <div class="form-group">
        <label>Nama Anggota Tim (NIM - Nama) *</label>
        <input type="text" id="dynField2" placeholder="Contoh: 242410102024 - Cindy Aulia, 242410102058 - Tunggul" required />
      </div>`;
  } else {
    container.innerHTML = `
      <div class="form-group">
        <label>Nama Instansi / Mitra Tujuan Magang *</label>
        <input type="text" id="dynField1" placeholder="Contoh: PT Telkom Indonesia / Diskominfo Jember" required />
      </div>
      <div class="form-group">
        <label>Posisi & Durasi Pelaksanaan Magang *</label>
        <input type="text" id="dynField2" placeholder="Contoh: Backend Developer Intern (Februari – Juni 2027)" required />
      </div>`;
  }
}

// VALIDASI FILE & PREVIEW (NFR-05 & NFR-06)
function handleFileSelect(e) {
  const file = e.target.files[0];
  if (!file) return;
  const allowed = ["application/pdf", "image/jpeg", "image/png"];
  if (!allowed.includes(file.type)) {
    simulateFileError("format");
    e.target.value = "";
    return;
  }
  if (file.size > 2 * 1024 * 1024) {
    simulateFileError("size");
    e.target.value = "";
    return;
  }
  const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
  setValidFile(`${file.name} (${sizeMb} MB)`);
}

function simulateFileError(type) {
  const errBox = document.getElementById("fileErrorBox");
  const prevBox = document.getElementById("filePreviewBox");
  prevBox.classList.add("hidden");
  errBox.classList.remove("hidden");
  currentValidFile = "";

  if (type === "size") {
    errBox.textContent = "❌ Gagal Unggah (NFR-06): Ukuran berkas melebihi batas maksimal 2 MB. Silakan kompres dokumen Anda terlebih dahulu.";
  } else {
    errBox.textContent = "❌ Gagal Unggah (NFR-06): Format berkas tidak didukung. Sistem hanya menerima berkas berformat PDF, JPG, atau PNG.";
  }
}

function simulateValidFile() {
  setValidFile("Persyaratan_Lengkap_Cindy_2026.pdf (1.20 MB)");
}

function setValidFile(label) {
  currentValidFile = label;
  document.getElementById("fileErrorBox").classList.add("hidden");
  const prevBox = document.getElementById("filePreviewBox");
  prevBox.classList.remove("hidden");
  document.getElementById("previewFileName").textContent = label;
  document.getElementById("modalPreviewTitle").textContent = label;
}

function openModalPreview(customTitle) {
  if (customTitle) document.getElementById("modalPreviewTitle").textContent = customTitle;
  document.getElementById("modalPreview").classList.remove("hidden");
}

// SUBMIT PENGAJUAN / REVISI MAHASISWA (FR-02, FR-07)
function submitPengajuanMhs(e) {
  e.preventDefault();
  if (!currentValidFile) {
    simulateFileError("size");
    document.getElementById("fileErrorBox").textContent = "⚠️ Harap unggah berkas persyaratan yang valid (maks. 2 MB) sebelum mengirim pengajuan.";
    return;
  }

  const editId = document.getElementById("editSuratId").value;
  const jenis = document.getElementById("jenisSurat").value;
  const f1 = document.getElementById("dynField1").value;
  const f2 = document.getElementById("dynField2").value;
  const pejabat = (jenis === "Surat Keterangan Aktif Kuliah" || jenis === "Surat Pengantar Magang") ? "Wakil Dekan I" : "Wakil Dekan III";

  if (editId) {
    const idx = suratList.findIndex(s => s.id === editId);
    if (idx !== -1) {
      suratList[idx].jenis = jenis;
      suratList[idx].detail = `${f1} — ${f2}`;
      suratList[idx].lampiran = currentValidFile;
      suratList[idx].status = "Diajukan";
      suratList[idx].catatanRevisi = "";
      pushNotification("tu", `Revisi pengajuan ${editId} telah dikirim ulang oleh Cindy Aulia Andriani.`);
      showToast(`Revisi surat ${editId} berhasil dikirim ulang (FR-07)!`);
    }
  } else {
    const newId = "SRT-2026-00" + (suratList.length + 1);
    suratList.unshift({
      id: newId,
      nim: "242410102024",
      nama: "Cindy Aulia Andriani",
      jenis,
      detail: `${f1} — ${f2}`,
      lampiran: currentValidFile,
      tanggalAjuan: "2026-11-23 03:50",
      status: "Diajukan",
      catatanRevisi: "",
      pejabat,
      durasiJam: 0,
      hasFinalPdf: false
    });
    pushNotification("tu", `Pengajuan baru ${newId} (${jenis}) masuk dari Cindy Aulia Andriani.`);
    showToast(`Pengajuan ${newId} berhasil dikirim! Notifikasi terkirim ke Staff TU.`);
  }

  resetFormMhs();
  renderAll();
}

function startEditRevisi(id) {
  const s = suratList.find(item => item.id === id);
  if (!s) return;
  document.getElementById("editSuratId").value = s.id;
  document.getElementById("jenisSurat").value = s.jenis;
  renderDynamicFields();
  const parts = s.detail.split(" — ");
  document.getElementById("dynField1").value = parts[0] || "";
  document.getElementById("dynField2").value = parts[1] || "";
  setValidFile(s.lampiran);

  document.getElementById("formMhsTitle").textContent = `Perbaiki Pengajuan Revisi (${s.id})`;
  document.getElementById("btnSubmitMhs").textContent = "Kirim Ulang Hasil Revisi";
  document.getElementById("btnCancelEdit").classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetFormMhs() {
  document.getElementById("editSuratId").value = "";
  document.getElementById("formMhsTitle").textContent = "Ajukan Surat Administratif Baru";
  document.getElementById("btnSubmitMhs").textContent = "Kirim Pengajuan Surat";
  document.getElementById("btnCancelEdit").classList.add("hidden");
  document.getElementById("filePreviewBox").classList.add("hidden");
  document.getElementById("fileErrorBox").classList.add("hidden");
  currentValidFile = "";
  renderDynamicFields();
}

// RENDER DAFTAR SURAT MAHASISWA (FR-03, FR-07, FR-10, FR-14)
function renderMahasiswaSurat() {
  const myList = suratList.filter(s => s.nim === "242410102024");
  const container = document.getElementById("mhsSuratList");

  const revSurat = myList.find(s => s.status === "Ditolak/Revisi");
  const banner = document.getElementById("mhsRevisionBanner");
  if (revSurat) {
    banner.classList.remove("hidden");
    document.getElementById("mhsRevisionText").textContent = `${revSurat.id} (${revSurat.jenis}) perlu diperbaiki.`;
    document.getElementById("btnJumpRevision").onclick = () => startEditRevisi(revSurat.id);
  } else {
    banner.classList.add("hidden");
  }

  container.innerHTML = myList.map(s => {
    const badgeClass = s.status === "Ditolak/Revisi" ? "danger"
      : (s.status === "Soft File Tersedia" || s.status === "Selesai") ? "success" : "info";

    const steps = ["Diajukan", "Diproses TU", "Menunggu Tanda Tangan", "Soft File Tersedia", "Selesai"];
    const curIdx = steps.indexOf(s.status);

    const stepperHtml = s.status === "Ditolak/Revisi"
      ? `<div class="stepper"><div class="step revisi">Status: Ditolak / Perlu Revisi Berkas</div></div>`
      : `<div class="stepper">${steps.map((st, i) => {
          const cls = i < curIdx ? "done" : (i === curIdx ? "active" : "");
          return `<div class="step ${cls}">${st}</div>`;
        }).join("")}</div>`;

    return `
      <div class="surat-card">
        <div class="surat-top">
          <div>
            <span class="surat-id">${s.id} • Diajukan: ${s.tanggalAjuan}</span>
            <div class="surat-title">${s.jenis}</div>
          </div>
          <span class="badge ${badgeClass}">${s.status}</span>
        </div>
        <div class="surat-meta">${s.detail}<br/>Lampiran: <strong>${s.lampiran}</strong></div>
        ${stepperHtml}
        ${s.status === "Ditolak/Revisi" ? `<div class="revisi-note-box"><strong>Catatan Staff TU:</strong> ${s.catatanRevisi}</div>` : ""}
        <div class="surat-actions">
          ${s.status === "Ditolak/Revisi" ? `<button class="btn btn-warning sm" onclick="startEditRevisi('${s.id}')">✏️ Edit & Ajukan Ulang (FR-07)</button>` : ""}
          ${s.hasFinalPdf ? `<button class="btn btn-success sm" onclick="downloadPdfFinal('${s.id}', '${s.jenis}')">⬇️ Unduh PDF Final (FR-14)</button>` : ""}
        </div>
      </div>`;
  }).join("");
}

function downloadPdfFinal(id, jenis) {
  const content = `UNIVERSITAS JEMBER - FAKULTAS ILMU KOMPUTER\nDOKUMEN RESMI: ${jenis.toUpperCase()}\nNomor Registrasi: ${id}\nMahasiswa: Cindy Aulia Andriani (242410102024)\nStatus: SAH / TERTANDATANGANI ELEKTRONIK`;
  const blob = new Blob([content], { type: "application/pdf" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${id}_${jenis.replace(/\s+/g, "_")}.pdf`;
  a.click();
  showToast(`Mengunduh dokumen resmi ${id}.pdf (FR-14)...`);
}

// STAFF TU LOGIC (FR-04..FR-06, FR-11, FR-13, FR-16)
function switchTuTab(tab) {
  document.querySelectorAll(".subtab").forEach(b => b.classList.toggle("active", b.dataset.tutab === tab));
  document.querySelectorAll(".tu-tab-content").forEach(c => c.classList.add("hidden"));
  document.getElementById("tu-tab-" + tab).classList.remove("hidden");
}

function renderTuTable() {
  const q = (document.getElementById("tuSearchInput")?.value || "").toLowerCase();
  const fJenis = document.getElementById("tuFilterJenis")?.value || "";
  const fStatus = document.getElementById("tuFilterStatus")?.value || "";

  const filtered = suratList.filter(s => {
    const matchQ = s.nama.toLowerCase().includes(q) || s.nim.includes(q) || s.id.toLowerCase().includes(q);
    const matchJ = !fJenis || s.jenis === fJenis;
    const matchS = !fStatus || s.status === fStatus;
    return matchQ && matchJ && matchS;
  });

  document.getElementById("tuSuratTbody").innerHTML = filtered.map(s => {
    const badgeClass = s.status === "Ditolak/Revisi" ? "danger"
      : (s.status === "Soft File Tersedia" || s.status === "Selesai") ? "success" : "info";
    return `
      <tr>
        <td><strong>${s.id}</strong><br/><small>${s.tanggalAjuan}</small></td>
        <td><strong>${s.nama}</strong><br/><small>${s.nim}</small></td>
        <td><strong>${s.jenis}</strong><br/><small>${s.detail}</small></td>
        <td><button class="btn btn-outline sm" onclick="openModalPreview('${s.lampiran}')">👁️ ${s.lampiran.split(" ")[0]}</button></td>
        <td><span class="badge ${badgeClass}">${s.status}</span></td>
        <td><button class="btn btn-primary sm" onclick="openTuModal('${s.id}')">Proses / Ubah Status</button></td>
      </tr>`;
  }).join("");
}

function openTuModal(id) {
  const s = suratList.find(item => item.id === id);
  if (!s) return;
  document.getElementById("tuActionSuratId").value = s.id;
  document.getElementById("tuActionInfo").textContent = `${s.id} — ${s.nama} (${s.nim}) • ${s.jenis}`;
  document.getElementById("tuNewStatus").value = s.status;
  document.getElementById("tuRevisiNote").value = s.catatanRevisi || "";
  toggleTuStatusFields();
  document.getElementById("modalTuAction").classList.remove("hidden");
}

function toggleTuStatusFields() {
  const st = document.getElementById("tuNewStatus").value;
  document.getElementById("tuRevisiNoteGroup").classList.toggle("hidden", st !== "Ditolak/Revisi");
  document.getElementById("tuUploadFinalGroup").classList.toggle("hidden", st !== "Soft File Tersedia");
}

function saveTuStatus(e) {
  e.preventDefault();
  const id = document.getElementById("tuActionSuratId").value;
  const newStatus = document.getElementById("tuNewStatus").value;
  const note = document.getElementById("tuRevisiNote").value.trim();

  if (newStatus === "Ditolak/Revisi" && !note) {
    alert("Sesuai FR-06, catatan alasan penolakan/revisi wajib diisi agar mahasiswa mengetahui bagian yang harus diperbaiki!");
    return;
  }

  const s = suratList.find(item => item.id === id);
  if (s) {
    s.status = newStatus;
    s.catatanRevisi = newStatus === "Ditolak/Revisi" ? note : "";
    if (newStatus === "Soft File Tersedia" || newStatus === "Selesai") s.hasFinalPdf = true;

    pushNotification("mahasiswa", `Status ${s.id} (${s.jenis}) diperbarui menjadi "${newStatus}".`);
    if (newStatus === "Menunggu Tanda Tangan") {
      pushNotification("pimpinan", `${s.id} (${s.jenis}) siap untuk pengesahan E-Approval (${s.pejabat}).`);
    }
    showToast(`Status ${s.id} diperbarui menjadi "${newStatus}".`);
  }

  closeModal("modalTuAction");
  renderAll();
}

// CRUD DATA MAHASISWA (FR-16)
function renderUsersTable() {
  document.getElementById("tuUsersTbody").innerHTML = mahasiswaUsers.map((u, idx) => `
    <tr>
      <td>${u.nim}</td>
      <td><strong>${u.nama}</strong></td>
      <td>${u.prodi}</td>
      <td>${u.email}</td>
      <td><span class="badge success">Aktif</span></td>
      <td><button class="btn btn-outline sm" onclick="openUserModal(${idx})">✏️ Ubah Data</button></td>
    </tr>`).join("");
}

function openUserModal(idx = -1) {
  document.getElementById("editUserIndex").value = idx;
  if (idx >= 0) {
    const u = mahasiswaUsers[idx];
    document.getElementById("modalUserTitle").textContent = "Ubah Data Mahasiswa (Use Case: Mengubah Data Mahasiswa)";
    document.getElementById("usrNim").value = u.nim;
    document.getElementById("usrNama").value = u.nama;
    document.getElementById("usrProdi").value = u.prodi;
    document.getElementById("usrEmail").value = u.email;
  } else {
    document.getElementById("modalUserTitle").textContent = "Tambah Data Mahasiswa (Use Case: Menambah Data Mahasiswa)";
    document.getElementById("usrNim").value = "";
    document.getElementById("usrNama").value = "";
    document.getElementById("usrEmail").value = "";
  }
  document.getElementById("modalUser").classList.remove("hidden");
}

function saveUserMahasiswa(e) {
  e.preventDefault();
  const idx = parseInt(document.getElementById("editUserIndex").value, 10);
  const data = {
    nim: document.getElementById("usrNim").value,
    nama: document.getElementById("usrNama").value,
    prodi: document.getElementById("usrProdi").value,
    email: document.getElementById("usrEmail").value,
    aktif: true
  };
  if (idx >= 0) mahasiswaUsers[idx] = data;
  else mahasiswaUsers.push(data);

  closeModal("modalUser");
  renderUsersTable();
  showToast("Data akun mahasiswa berhasil disimpan (FR-16).");
}

function importMassalMahasiswa() {
  mahasiswaUsers.push({
    nim: "2424101030" + Math.floor(10 + Math.random() * 89),
    nama: "Mahasiswa Impor Batch #1",
    prodi: "Informatika",
    email: "batch.unej@mail.unej.ac.id",
    aktif: true
  });
  renderUsersTable();
  showToast("Berhasil mengimpor akun mahasiswa secara massal (FR-16).");
}

// PIMPINAN E-APPROVAL & LAPORAN (FR-08, FR-09, FR-12)
function renderPimpinanApproval() {
  const list = suratList.filter(s => s.status === "Menunggu Tanda Tangan");
  const tbody = document.getElementById("pimpinanApprovalTbody");
  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:#64748b;">Tidak ada antrean surat yang menunggu tanda tangan saat ini.</td></tr>`;
    return;
  }
  tbody.innerHTML = list.map(s => `
    <tr>
      <td><strong>${s.id}</strong></td>
      <td>${s.nama} (${s.nim})</td>
      <td>${s.jenis}</td>
      <td><span class="badge info">${s.pejabat}</span></td>
      <td>${s.durasiJam} jam</td>
      <td><button class="btn btn-success sm" onclick="approveEsign('${s.id}')">✍️ Setujui & Bubuhkan TTE (FR-08)</button></td>
    </tr>`).join("");
}

function approveEsign(id) {
  const s = suratList.find(item => item.id === id);
  if (!s) return;
  s.status = "Soft File Tersedia";
  s.hasFinalPdf = true;
  pushNotification("mahasiswa", `${s.id} telah disahkan oleh ${s.pejabat}. Soft file PDF tersedia!`);
  pushNotification("tu", `${s.id} telah disahkan oleh ${s.pejabat}.`);
  showToast(`Pengesahan E-Approval berhasil untuk ${s.id} (FR-08)!`);
  renderAll();
}

function renderSharedLaporan() {
  const avgTurnaround = (suratList.reduce((acc, s) => acc + s.durasiJam, 0) / suratList.length).toFixed(1);
  const selesaiCount = suratList.filter(s => s.status === "Soft File Tersedia" || s.status === "Selesai").length;

  const html = `
    <div class="card">
      <div class="card-header">
        <h2>Laporan & Kalkulasi Turnaround Time Layanan (FR-09 • FR-12)</h2>
        <div class="btn-group">
          <button class="btn btn-outline sm" onclick="exportCsvLaporan()">📊 Ekspor Excel / CSV (FR-12)</button>
          <button class="btn btn-primary sm" onclick="window.print()">🖨️ Cetak / Simpan PDF</button>
        </div>
      </div>
      <div class="kpi-grid">
        <div class="kpi-card"><small>Total Pengajuan Masuk</small><strong>${suratList.length} Surat</strong></div>
        <div class="kpi-card"><small>Rata-rata Turnaround Time (FR-09)</small><strong>${avgTurnaround} Jam</strong></div>
        <div class="kpi-card"><small>Surat Selesai / Terbit PDF</small><strong>${selesaiCount} Surat</strong></div>
        <div class="kpi-card"><small>Tingkat Ketersediaan Sistem</small><strong>99.4% (24/7)</strong></div>
      </div>
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID Surat</th>
              <th>Jenis Layanan Surat</th>
              <th>Mahasiswa</th>
              <th>Pejabat Pengesah</th>
              <th>Turnaround Time</th>
              <th>Status Akhir</th>
            </tr>
          </thead>
          <tbody>
            ${suratList.map(s => `
              <tr>
                <td>${s.id}</td>
                <td>${s.jenis}</td>
                <td>${s.nama} (${s.nim})</td>
                <td>${s.pejabat}</td>
                <td><strong>${s.durasiJam} jam</strong></td>
                <td>${s.status}</td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div>
    </div>`;

  document.getElementById("sharedLaporanTU").innerHTML = html;
  document.getElementById("sharedLaporanPimpinan").innerHTML = html;
}

function exportCsvLaporan() {
  const rows = [["ID Surat", "NIM", "Nama", "Jenis Surat", "Pejabat", "Turnaround (Jam)", "Status"]];
  suratList.forEach(s => rows.push([s.id, s.nim, s.nama, s.jenis, s.pejabat, s.durasiJam, s.status]));
  const csv = rows.map(r => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "Rekap_Layanan_Persuratan_FASILKOM_UNEJ.csv";
  a.click();
  showToast("Rekapitulasi laporan berhasil diekspor (FR-12).");
}

// NOTIFIKASI (MELIHAT & MENGHAPUS NOTIFIKASI — API PUSHER)
function pushNotification(role, text) {
  notifications[role].unshift({ id: Date.now() + Math.random(), text, time: "Baru saja" });
  renderNotifications();
}

function toggleNotif(role) {
  document.getElementById("notifPanel-" + role).classList.toggle("hidden");
}

function deleteNotifItem(role, id) {
  notifications[role] = notifications[role].filter(n => n.id !== id);
  renderNotifications();
}

function clearAllNotif(role) {
  notifications[role] = [];
  renderNotifications();
  showToast("Seluruh notifikasi dihapus.");
}

function renderNotifications() {
  ["mahasiswa", "tu", "pimpinan"].forEach(role => {
    const list = notifications[role];
    document.getElementById("notifCount-" + role).textContent = list.length;
    const el = document.getElementById("notifList-" + role);
    if (list.length === 0) {
      el.innerHTML = `<div class="notif-item" style="color:#64748b;">Tidak ada notifikasi baru.</div>`;
    } else {
      el.innerHTML = list.map(n => `
        <div class="notif-item">
          <div>${n.text}<small>${n.time}</small></div>
          <button class="btn-link danger" onclick="deleteNotifItem('${role}', ${n.id})" title="Hapus Notifikasi">✕</button>
        </div>`).join("");
    }
  });
}

// UTILITIES
function closeModal(id) {
  document.getElementById(id).classList.add("hidden");
}

function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.remove("hidden");
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => t.classList.add("hidden"), 3200);
}

// SIMULASI TIMER SESI (NFR-03: 30 MENIT)
let secondsLeft = 29 * 60 + 59;
setInterval(() => {
  if (secondsLeft > 0) secondsLeft--;
  const m = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const s = String(secondsLeft % 60).padStart(2, "0");
  const el = document.getElementById("sessionTimer");
  if (el) el.textContent = `Sesi: ${m}:${s}`;
}, 1000);

function renderAll() {
  renderMahasiswaSurat();
  renderTuTable();
  renderUsersTable();
  renderPimpinanApproval();
  renderSharedLaporan();
  renderNotifications();
}

// INIT
renderDynamicFields();
renderAll();