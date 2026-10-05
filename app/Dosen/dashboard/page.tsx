"use client";

import Link from "next/link";
import { useMemo, useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";


import { LayoutDashboard,
  FolderKanban,
  UserPlus,
  FileSpreadsheet,
  FileText,
  BarChart3,
  Sparkles,
  Printer,
  User,
  Shield,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Search,
  ArrowUpDown,
  Upload,
  Save,
  Calculator,
  Edit,
  MoreVertical,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Send,
  RotateCcw,
  ChevronLeft,
} from "lucide-react";




export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F5F7FB] p-8">
      <h1 className="text-3xl font-bold text-slate-900">
        Dashboard Dosen
      </h1>

      <p className="mt-2 text-slate-500">
        Selamat datang di Dashboard Gradia.
      </p>

      <button
        type="button"
        onClick={() => router.push("/input-nilai")}
        className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
      >
        Input Rekap Nilai
      </button>
    </div>
  );
}

/* =========================================================
   TYPE
========================================================= */

type ScoreField = "tugas" | "uts" | "uas";

type StudentStatus =
  | "Tersimpan"
  | "Perlu remedial"
  | "Belum lengkap";

type ActiveTab = "Semua" | "Lulus" | "Remedial";

type Grade =
  | "A"
  | "A-"
  | "B+"
  | "B"
  | "C+"
  | "C"
  | "D"
  | "E"
  | "-";

type Student = {
  id: number;
  nim: string;
  name: string;
  type: string;
  avatar: string;
  tugas: number | null;
  uts: number | null;
  uas: number | null;
  aiFeedback: string;
  status: StudentStatus;
};

type FinalGrade = {
  score: number | null;
  grade: Grade;
};

/* =========================================================
   DATA AWAL
========================================================= */

const INITIAL_STUDENTS: Student[] = [
  {
    id: 1,
    nim: "2204101801",
    name: "Aditya Rizky Pratama",
    type: "Informatika - Reguler",
    avatar: "AR",
    tugas: 88.0,
    uts: 82.5,
    uas: 89.0,
    aiFeedback:
      "Pemahaman konsep arsitektur RESTful API sangat baik dan...",
    status: "Tersimpan",
  },
  {
    id: 2,
    nim: "2204101805",
    name: "Budi Santoso",
    type: "Informatika - Reguler",
    avatar: "BS",
    tugas: 76.0,
    uts: 78.5,
    uas: 80.0,
    aiFeedback:
      "Pemahaman materi cukup baik, namun masih perlu peningkatan...",
    status: "Tersimpan",
  },
  {
    id: 3,
    nim: "2204101809",
    name: "Citra Lestari",
    type: "Informatika - Reguler",
    avatar: "CL",
    tugas: 92.0,
    uts: 90.0,
    uas: 94.0,
    aiFeedback:
      "Menunjukkan kemampuan analisis yang sangat baik dan...",
    status: "Tersimpan",
  },
  {
    id: 4,
    nim: "2204101812",
    name: "Dewi Anggraini",
    type: "Informatika - Reguler",
    avatar: "DA",
    tugas: 70.0,
    uts: 68.0,
    uas: 74.0,
    aiFeedback:
      "Perlu meningkatkan pemahaman terhadap konsep dasar...",
    status: "Tersimpan",
  },
  {
    id: 5,
    nim: "2204101814",
    name: "Dimas Wahyu Nugroho",
    type: "Informatika - Reguler",
    avatar: "DW",
    tugas: 85.0,
    uts: 80.0,
    uas: null,
    aiFeedback: "Nilai UAS belum diinputkan pengajar",
    status: "Belum lengkap",
  },
];

/* =========================================================
   BOBOT NILAI
========================================================= */

const BOBOT = {
  tugas: 0.25,
  uts: 0.35,
  uas: 0.4,
} as const;

/* =========================================================
   KOMPONEN UTAMA
========================================================= */


function InputNilaiPage() {
  const [students, setStudents] =
    useState<Student[]>(INITIAL_STUDENTS);

  const [activeTab, setActiveTab] =
    useState<ActiveTab>("Semua");

  const [searchQuery, setSearchQuery] =
    useState<string>("");

  const [selectedIds, setSelectedIds] =
    useState<number[]>([]);

  const [showToast, setShowToast] =
    useState<boolean>(false);

  const [toastMessage, setToastMessage] =
    useState<string>("");

  /* =========================================================
     HITUNG NILAI AKHIR
  ========================================================= */

  const calculateFinalGrade = (
    tugas: number | null,
    uts: number | null,
    uas: number | null
  ): FinalGrade => {
    if (
      tugas === null ||
      uts === null ||
      uas === null
    ) {
      return {
        score: null,
        grade: "-",
      };
    }

    const score =
      tugas * BOBOT.tugas +
      uts * BOBOT.uts +
      uas * BOBOT.uas;

    let grade: Grade = "E";

    if (score >= 85) {
      grade = "A";
    } else if (score >= 80) {
      grade = "A-";
    } else if (score >= 75) {
      grade = "B+";
    } else if (score >= 70) {
      grade = "B";
    } else if (score >= 65) {
      grade = "C+";
    } else if (score >= 60) {
      grade = "C";
    } else if (score >= 50) {
      grade = "D";
    }

    return {
      score,
      grade,
    };
  };

  /* =========================================================
     TOAST
  ========================================================= */

  const notify = (msg: string): void => {
    setToastMessage(msg);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  /* =========================================================
     UBAH NILAI
  ========================================================= */

  const handleScoreChange = (
    id: number,
    field: ScoreField,
    val: string
  ): void => {
    const parsedValue =
      val === ""
        ? null
        : Number.parseFloat(val);

    const num =
      parsedValue !== null &&
      Number.isNaN(parsedValue)
        ? null
        : parsedValue;

    setStudents((prevStudents) =>
      prevStudents.map((item) => {
        if (item.id !== id) {
          return item;
        }

        const updated: Student = {
          ...item,
        };

        updated[field] = num;

        if (
          updated.tugas !== null &&
          updated.uts !== null &&
          updated.uas !== null
        ) {
          const result = calculateFinalGrade(
            updated.tugas,
            updated.uts,
            updated.uas
          );

          if (
            result.score !== null &&
            result.score < 65
          ) {
            updated.status = "Perlu remedial";
          } else {
            updated.status = "Tersimpan";
          }
        } else {
          updated.status = "Belum lengkap";
        }

        return updated;
      })
    );
  };

  /* =========================================================
     SELECT SEMUA
  ========================================================= */

  const handleSelectAll = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    if (e.target.checked) {
      setSelectedIds(
        filteredStudents.map((student) => student.id)
      );
    } else {
      setSelectedIds([]);
    }
  };

  /* =========================================================
     SELECT SATU MAHASISWA
  ========================================================= */

  const handleSelectOne = (id: number): void => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter(
          (selectedId) => selectedId !== id
        );
      }

      return [...prev, id];
    });
  };

  /* =========================================================
     FILTER DATA
  ========================================================= */

  const filteredStudents = useMemo<Student[]>(() => {
    return students.filter((student) => {
      const search = searchQuery
        .toLowerCase()
        .trim();

      const matchesSearch =
        student.name
          .toLowerCase()
          .includes(search) ||
        student.nim
          .toLowerCase()
          .includes(search);

      const finalResult = calculateFinalGrade(
        student.tugas,
        student.uts,
        student.uas
      );

      let matchesTab = true;

      if (activeTab === "Lulus") {
        matchesTab =
          finalResult.score !== null &&
          finalResult.score >= 65;
      }

      if (activeTab === "Remedial") {
        matchesTab =
          finalResult.score !== null &&
          finalResult.score < 65;
      }

      return matchesSearch && matchesTab;
    });
  }, [students, searchQuery, activeTab]);

  /* =========================================================
     STATISTIK RATA-RATA
  ========================================================= */

  const averages = useMemo(() => {
    const getAverage = (
      field: ScoreField
    ): string => {
      const values = students
        .map((student) => student[field])
        .filter(
          (value): value is number =>
            value !== null
        );

      if (values.length === 0) {
        return "0.0";
      }

      const total = values.reduce(
        (sum, value) => sum + value,
        0
      );

      return (total / values.length).toFixed(1);
    };

    return {
      tugas: getAverage("tugas"),
      uts: getAverage("uts"),
      uas: getAverage("uas"),
    };
  }, [students]);

  /* =========================================================
     STATISTIK MAHASISWA
  ========================================================= */

  const totalStudents = students.length;

  const completedStudents = students.filter(
    (student) =>
      student.tugas !== null &&
      student.uts !== null &&
      student.uas !== null
  ).length;

  const incompleteStudents =
    totalStudents - completedStudents;

  const remedialStudents = students.filter(
    (student) => {
      const result = calculateFinalGrade(
        student.tugas,
        student.uts,
        student.uas
      );

      return (
        result.score !== null &&
        result.score < 65
      );
    }
  ).length;

  const allFilteredSelected =
    filteredStudents.length > 0 &&
    selectedIds.length === filteredStudents.length;

  /* =========================================================
     SIMPAN
  ========================================================= */

  const handleSave = (): void => {
    notify(
      selectedIds.length > 0
        ? `${selectedIds.length} data nilai berhasil disimpan`
        : "Data nilai berhasil disimpan"
    );
  };

  /* =========================================================
     GENERATE AI FEEDBACK
  ========================================================= */

  const handleGenerateAI = (): void => {
    if (selectedIds.length === 0) {
      notify(
        "Pilih mahasiswa terlebih dahulu"
      );
      return;
    }

    setStudents((prevStudents) =>
      prevStudents.map((student) => {
        if (!selectedIds.includes(student.id)) {
          return student;
        }

        return {
          ...student,
          aiFeedback:
            "Hasil analisis AI menunjukkan perkembangan akademik mahasiswa cukup baik. Tetap tingkatkan konsistensi dalam memahami materi dan menyelesaikan tugas.",
        };
      })
    );

    notify(
      `AI Feedback berhasil dibuat untuk ${selectedIds.length} mahasiswa`
    );
  };

  /* =========================================================
     RESET SELECTION
  ========================================================= */

  const handleResetSelection = (): void => {
    setSelectedIds([]);
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="min-h-screen bg-[#F5F7FB] text-slate-800">
      
      
      {/* SIDEBAR */}

      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-[250px] border-r border-slate-200 bg-white lg:block">
        <div className="flex h-full flex-col">
          {/* LOGO */}
          <div className="border-b border-slate-200 px-6 py-5">
            <div className="text-2xl font-bold text-[#5136D9]">
              Gradia
            </div>

            <div className="mt-1 text-xs text-slate-500">
              Portal Dosen
            </div>
          </div>

          {/* MENU */}
          <nav className="flex-1 overflow-y-auto px-4 py-5">
            <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Utama
            </p>

            <SidebarItem
              icon={<LayoutDashboard size={18} />}
              label="Dashboard"
            />

            <SidebarItem
              icon={<FolderKanban size={18} />}
              label="Manajemen Data Kelas"
            />

            <SidebarItem
              icon={<UserPlus size={18} />}
              label="Tambah Kelas & Mahasiswa"
            />

            <p className="mb-3 mt-7 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Penilaian & Evaluasi
            </p>

            <SidebarItem
              icon={<FileSpreadsheet size={18} />}
              label="Input Rekap Nilai"
              active
            />

            <SidebarItem
              icon={<Upload size={18} />}
              label="Import Nilai Excel"
            />

            <p className="mb-3 mt-7 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Kecerdasan Buatan & Laporan
            </p>

            <SidebarItem
              icon={<BarChart3 size={18} />}
              label="Analitik & AI Feedback"
            />

            <SidebarItem
              icon={<Sparkles size={18} />}
              label="Generate AI Feedback"
              badge="Baru"
            />

            <SidebarItem
              icon={<Printer size={18} />}
              label="Cetak PDF & Laporan"
            />

            <p className="mb-3 mt-7 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Pengaturan Akun
            </p>

            <SidebarItem
              icon={<User size={18} />}
              label="Kelola Profil"
            />

            <SidebarItem
              icon={<Shield size={18} />}
              label="Keamanan & Akun"
            />
          </nav>

          {/* FOOTER SIDEBAR */}
          <div className="border-t border-slate-200 p-4">
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5136D9] text-sm font-bold text-white">
                DH
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">
                  Dr. Hendra
                </p>

                <p className="truncate text-xs text-slate-500">
                  Dosen
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="lg:ml-[250px]">
        {/* HEADER */}
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex min-h-[76px] items-center justify-between px-5 py-4 lg:px-8">
            <div>
              <div className="mb-1 flex items-center gap-2 text-xs text-slate-400">
                <span>Portal</span>

                <ChevronRight size={13} />

                <span>Sistem Akademik</span>

                <ChevronRight size={13} />

                <span className="text-slate-600">
                  Input Rekap Nilai
                </span>
              </div>

              <h1 className="text-xl font-bold text-slate-900">
                Input Rekap Nilai Mahasiswa
              </h1>
            </div>

            <div className="hidden items-center gap-3 sm:flex">
              <button
                type="button"
                className="rounded-lg border border-slate-200 p-2.5 text-slate-500 transition hover:bg-slate-50"
              >
                <HelpCircle size={19} />
              </button>

              <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EDE9FE] font-semibold text-[#5136D9]">
                  DH
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Dr. Hendra
                  </p>

                  <p className="text-xs text-slate-500">
                    Dosen
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="px-5 py-6 lg:px-8">
          {/* INFO CARD */}
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#EDE9FE] px-3 py-1 text-xs font-semibold text-[#5136D9]">
                    Semester Ganjil 2024/2025
                  </span>

                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                    Aktif
                  </span>
                </div>

                <h2 className="text-lg font-bold text-slate-900">
                  Pemrograman Web Lanjut
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Informatika - Reguler
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatCard
                  label="Mahasiswa"
                  value={String(totalStudents)}
                  icon={<User size={17} />}
                />

                <StatCard
                  label="Lengkap"
                  value={String(completedStudents)}
                  icon={<CheckCircle2 size={17} />}
                />

                <StatCard
                  label="Belum Lengkap"
                  value={String(incompleteStudents)}
                  icon={<AlertTriangle size={17} />}
                />

                <StatCard
                  label="Remedial"
                  value={String(remedialStudents)}
                  icon={<XCircle size={17} />}
                />
              </div>
            </div>
          </div>

          {/* TOOLBAR */}
          <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              {/* SEARCH */}
              <div className="relative w-full xl:max-w-md">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  placeholder="Cari nama atau NIM mahasiswa..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-[#5136D9] focus:bg-white focus:ring-2 focus:ring-[#5136D9]/10"
                />
              </div>

              {/* BUTTON */}
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleGenerateAI}
                  className="flex items-center gap-2 rounded-xl border border-[#DDD6FE] bg-[#F5F3FF] px-4 py-2.5 text-sm font-semibold text-[#5136D9] transition hover:bg-[#EDE9FE]"
                >
                  <Sparkles size={17} />
                  Generate AI Feedback
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  className="flex items-center gap-2 rounded-xl bg-[#5136D9] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4528C4]"
                >
                  <Save size={17} />
                  Simpan Nilai
                </button>
              </div>
            </div>

            {/* TABS */}
            <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4">
              {(
                [
                  "Semua",
                  "Lulus",
                  "Remedial",
                ] as ActiveTab[]
              ).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    activeTab === tab
                      ? "bg-[#5136D9] text-white"
                      : "text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* BOBOT */}
          <div className="mb-5 rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <Calculator size={18} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Komposisi Nilai
                  </p>

                  <p className="text-xs text-slate-500">
                    Perhitungan nilai akhir otomatis
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 text-xs">
                <WeightItem
                  label="Tugas"
                  value="25%"
                />

                <WeightItem
                  label="UTS"
                  value="35%"
                />

                <WeightItem
                  label="UAS"
                  value="40%"
                />
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* TABLE HEADER */}
            <div className="flex flex-col justify-between gap-3 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center">
              <div>
                <h3 className="font-bold text-slate-900">
                  Daftar Nilai Mahasiswa
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  {filteredStudents.length} mahasiswa ditampilkan
                </p>
              </div>

              {selectedIds.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-slate-500">
                    {selectedIds.length} dipilih
                  </span>

                  <button
                    type="button"
                    onClick={handleGenerateAI}
                    className="flex items-center gap-2 rounded-lg bg-[#F5F3FF] px-3 py-2 text-xs font-semibold text-[#5136D9]"
                  >
                    <Sparkles size={14} />
                    AI Feedback
                  </button>

                  <button
                    type="button"
                    onClick={handleResetSelection}
                    className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600"
                  >
                    <RotateCcw size={14} />
                    Batal
                  </button>
                </div>
              )}
            </div>

            {/* DESKTOP TABLE */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[1050px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="w-[50px] px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={allFilteredSelected}
                        onChange={handleSelectAll}
                        className="h-4 w-4 rounded border-slate-300 text-[#5136D9] focus:ring-[#5136D9]"
                      />
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                      Mahasiswa
                    </th>

                    <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wide text-slate-500">
                      <div className="flex items-center justify-center gap-1">
                        Tugas
                        <ArrowUpDown size={13} />
                      </div>
                    </th>

                    <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wide text-slate-500">
                      UTS
                    </th>

                    <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wide text-slate-500">
                      UAS
                    </th>

                    <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wide text-slate-500">
                      Nilai Akhir
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                      AI Feedback
                    </th>

                    <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wide text-slate-500">
                      Status
                    </th>

                    <th className="w-[50px] px-4 py-3" />
                  </tr>
                </thead>

                <tbody>
                  {filteredStudents.map((student) => {
                    const result =
                      calculateFinalGrade(
                        student.tugas,
                        student.uts,
                        student.uas
                      );

                    return (
                      <tr
                        key={student.id}
                        className="border-b border-slate-100 transition hover:bg-slate-50"
                      >
                        {/* CHECKBOX */}
                        <td className="px-4 py-4">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(
                              student.id
                            )}
                            onChange={() =>
                              handleSelectOne(
                                student.id
                              )
                            }
                            className="h-4 w-4 rounded border-slate-300 text-[#5136D9] focus:ring-[#5136D9]"
                          />
                        </td>

                        {/* MAHASISWA */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EDE9FE] text-xs font-bold text-[#5136D9]">
                              {student.avatar}
                            </div>

                            <div>
                              <p className="text-sm font-semibold text-slate-800">
                                {student.name}
                              </p>

                              <p className="mt-0.5 text-xs text-slate-400">
                                {student.nim}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* TUGAS */}
                        <td className="px-4 py-4">
                          <ScoreInput
                            value={student.tugas}
                            onChange={(value) =>
                              handleScoreChange(
                                student.id,
                                "tugas",
                                value
                              )
                            }
                          />
                        </td>

                        {/* UTS */}
                        <td className="px-4 py-4">
                          <ScoreInput
                            value={student.uts}
                            onChange={(value) =>
                              handleScoreChange(
                                student.id,
                                "uts",
                                value
                              )
                            }
                          />
                        </td>

                        {/* UAS */}
                        <td className="px-4 py-4">
                          <ScoreInput
                            value={student.uas}
                            onChange={(value) =>
                              handleScoreChange(
                                student.id,
                                "uas",
                                value
                              )
                            }
                          />
                        </td>

                        {/* NILAI AKHIR */}
                        <td className="px-4 py-4 text-center">
                          <div className="inline-flex flex-col items-center">
                            <span className="text-base font-bold text-slate-800">
                              {result.score !== null
                                ? result.score.toFixed(1)
                                : "-"}
                            </span>

                            <span
                              className={`mt-1 rounded-md px-2 py-0.5 text-[11px] font-bold ${
                                result.grade === "A" ||
                                result.grade === "A-"
                                  ? "bg-emerald-50 text-emerald-600"
                                  : result.grade === "B+" ||
                                    result.grade === "B"
                                  ? "bg-blue-50 text-blue-600"
                                  : result.grade === "-"
                                  ? "bg-slate-100 text-slate-500"
                                  : "bg-red-50 text-red-600"
                              }`}
                            >
                              {result.grade}
                            </span>
                          </div>
                        </td>

                        {/* AI FEEDBACK */}
                        <td className="max-w-[240px] px-4 py-4">
                          <div className="flex items-start gap-2">
                            <Sparkles
                              size={15}
                              className="mt-0.5 shrink-0 text-[#5136D9]"
                            />

                            <p className="line-clamp-2 text-xs leading-5 text-slate-500">
                              {student.aiFeedback}
                            </p>
                          </div>
                        </td>

                        {/* STATUS */}
                        <td className="px-4 py-4 text-center">
                          <StatusBadge
                            status={student.status}
                          />
                        </td>

                        {/* ACTION */}
                        <td className="px-4 py-4 text-center">
                          <button
                            type="button"
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                          >
                            <MoreVertical
                              size={17}
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARD */}
            <div className="divide-y divide-slate-100 md:hidden">
              {filteredStudents.map((student) => {
                const result =
                  calculateFinalGrade(
                    student.tugas,
                    student.uts,
                    student.uas
                  );

                return (
                  <div
                    key={student.id}
                    className="p-4"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(
                            student.id
                          )}
                          onChange={() =>
                            handleSelectOne(
                              student.id
                            )
                          }
                          className="h-4 w-4 rounded border-slate-300 text-[#5136D9]"
                        />

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EDE9FE] text-xs font-bold text-[#5136D9]">
                          {student.avatar}
                        </div>

                        <div>
                          <p className="text-sm font-semibold">
                            {student.name}
                          </p>

                          <p className="text-xs text-slate-400">
                            {student.nim}
                          </p>
                        </div>
                      </div>

                      <StatusBadge
                        status={student.status}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <MobileScore
                        label="Tugas"
                        value={student.tugas}
                        onChange={(value) =>
                          handleScoreChange(
                            student.id,
                            "tugas",
                            value
                          )
                        }
                      />

                      <MobileScore
                        label="UTS"
                        value={student.uts}
                        onChange={(value) =>
                          handleScoreChange(
                            student.id,
                            "uts",
                            value
                          )
                        }
                      />

                      <MobileScore
                        label="UAS"
                        value={student.uas}
                        onChange={(value) =>
                          handleScoreChange(
                            student.id,
                            "uas",
                            value
                          )
                        }
                      />
                    </div>

                    <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 p-3">
                      <div>
                        <p className="text-xs text-slate-400">
                          Nilai Akhir
                        </p>

                        <p className="mt-1 text-lg font-bold text-slate-800">
                          {result.score !== null
                            ? result.score.toFixed(1)
                            : "-"}
                        </p>
                      </div>

                      <span className="rounded-lg bg-white px-3 py-2 text-sm font-bold text-[#5136D9] shadow-sm">
                        {result.grade}
                      </span>
                    </div>

                    <div className="mt-3 flex items-start gap-2">
                      <Sparkles
                        size={15}
                        className="mt-0.5 shrink-0 text-[#5136D9]"
                      />

                      <p className="text-xs leading-5 text-slate-500">
                        {student.aiFeedback}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* EMPTY */}
            {filteredStudents.length === 0 && (
              <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                  <Search
                    size={24}
                    className="text-slate-400"
                  />
                </div>

                <h3 className="font-semibold text-slate-800">
                  Data tidak ditemukan
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Coba gunakan kata pencarian atau filter
                  yang berbeda.
                </p>
              </div>
            )}

            {/* PAGINATION */}
            <div className="flex flex-col justify-between gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center">
              <p className="text-xs text-slate-500">
                Menampilkan{" "}
                <span className="font-semibold text-slate-700">
                  {filteredStudents.length}
                </span>{" "}
                dari{" "}
                <span className="font-semibold text-slate-700">
                  {students.length}
                </span>{" "}
                mahasiswa
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-lg border border-slate-200 p-2 text-slate-400"
                >
                  <ChevronLeft size={16} />
                </button>

                <button
                  type="button"
                  className="rounded-lg bg-[#5136D9] px-3 py-2 text-xs font-semibold text-white"
                >
                  1
                </button>

                <button
                  type="button"
                  className="rounded-lg border border-slate-200 p-2 text-slate-400"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* AVERAGE */}
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <AverageCard
              label="Rata-rata Tugas"
              value={averages.tugas}
              icon={<FileText size={18} />}
            />

            <AverageCard
              label="Rata-rata UTS"
              value={averages.uts}
              icon={<FileSpreadsheet size={18} />}
            />

            <AverageCard
              label="Rata-rata UAS"
              value={averages.uas}
              icon={<BarChart3 size={18} />}
            />
          </div>

          {/* FOOTER INFO */}
          <div className="mt-6 flex flex-col justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Butuh bantuan?
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Lihat panduan input dan pengelolaan nilai
                mahasiswa.
              </p>
            </div>

            <button
              type="button"
              className="flex items-center gap-2 text-sm font-semibold text-[#5136D9]"
            >
              Buka Panduan
              <ExternalLink size={15} />
            </button>
          </div>
        </div>
      </main>

      {/* =====================================================
          TOAST
      ===================================================== */}

      {showToast && (
        <div className="fixed bottom-5 right-5 z-50 flex max-w-sm items-center gap-3 rounded-xl bg-slate-900 px-5 py-4 text-white shadow-2xl">
          <CheckCircle2
            size={19}
            className="shrink-0 text-emerald-400"
          />

          <p className="text-sm font-medium">
            {toastMessage}
          </p>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   SIDEBAR ITEM
========================================================= */

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: string;
};

function SidebarItem({
  icon,
  label,
  active = false,
  badge,
}: SidebarItemProps) {
  return (
    <button
      type="button"
      className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
        active
          ? "bg-[#F0EDFF] text-[#5136D9]"
          : "text-slate-600 hover:bg-slate-50"
      }`}
    >
      <span
        className={
          active
            ? "text-[#5136D9]"
            : "text-slate-400"
        }
      >
        {icon}
      </span>

      <span className="flex-1">
        {label}
      </span>

      {badge && (
        <span className="rounded-full bg-[#EDE9FE] px-2 py-0.5 text-[9px] font-bold text-[#5136D9]">
          {badge}
        </span>
      )}
    </button>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

type StatCardProps = {
  label: string;
  value: string;
  icon: React.ReactNode;
};

function StatCard({
  label,
  value,
  icon,
}: StatCardProps) {
  return (
    <div className="min-w-[105px] rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
      <div className="mb-1 flex items-center gap-2 text-slate-400">
        {icon}

        <span className="text-[10px] font-medium">
          {label}
        </span>
      </div>

      <p className="text-lg font-bold text-slate-800">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   WEIGHT ITEM
========================================================= */

type WeightItemProps = {
  label: string;
  value: string;
};

function WeightItem({
  label,
  value,
}: WeightItemProps) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-sm">
      <span className="text-slate-500">
        {label}
      </span>

      <span className="font-bold text-blue-600">
        {value}
      </span>
    </div>
  );
}

/* =========================================================
   SCORE INPUT
========================================================= */

type ScoreInputProps = {
  value: number | null;
  onChange: (value: string) => void;
};

function ScoreInput({
  value,
  onChange,
}: ScoreInputProps) {
  return (
    <div className="mx-auto flex w-[75px] items-center rounded-lg border border-slate-200 bg-white focus-within:border-[#5136D9] focus-within:ring-2 focus-within:ring-[#5136D9]/10">
      <input
        type="number"
        min="0"
        max="100"
        step="0.1"
        value={value ?? ""}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full bg-transparent px-2 py-2 text-center text-sm font-semibold text-slate-700 outline-none"
      />
    </div>
  );
}

/* =========================================================
   MOBILE SCORE
========================================================= */

type MobileScoreProps = {
  label: string;
  value: number | null;
  onChange: (value: string) => void;
};

function MobileScore({
  label,
  value,
  onChange,
}: MobileScoreProps) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-slate-400">
        {label}
      </label>

      <input
        type="number"
        min="0"
        max="100"
        step="0.1"
        value={value ?? ""}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-center text-sm font-semibold outline-none focus:border-[#5136D9] focus:ring-2 focus:ring-[#5136D9]/10"
      />
    </div>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

type StatusBadgeProps = {
  status: StudentStatus;
};

function StatusBadge({
  status,
}: StatusBadgeProps) {
  if (status === "Tersimpan") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-600">
        <CheckCircle2 size={12} />
        Tersimpan
      </span>
    );
  }

  if (status === "Perlu remedial") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-600">
        <XCircle size={12} />
        Remedial
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-600">
      <AlertTriangle size={12} />
      Belum lengkap
    </span>
  );
}

/* =========================================================
   AVERAGE CARD
========================================================= */

type AverageCardProps = {
  label: string;
  value: string;
  icon: React.ReactNode;
};

function AverageCard({
  label,
  value,
  icon,
}: AverageCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0EDFF] text-[#5136D9]">
        {icon}
      </div>

      <div>
        <p className="text-xs text-slate-400">
          {label}
        </p>

        <p className="mt-1 text-xl font-bold text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}