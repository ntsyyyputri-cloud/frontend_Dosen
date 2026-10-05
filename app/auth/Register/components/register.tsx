"use client";

import Link from "next/link";
import {useState, type ChangeEvent, type FormEvent, type ReactNode,} from "react";

import {GraduationCap, User, UserCheck, UserPlus, Mail, Lock, LockKeyhole, Eye, EyeOff, ArrowRight, Building2, ShieldCheck, CheckCircle2, Check, Hash, ChevronDown, CircleHelp, FileText, BadgeCheck, Network, BrainCircuit, Clock3, Shield,} from "lucide-react";


export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    nidn: "",
    program: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name) {
      alert("Silakan isi nama lengkap.");
      return;
    }

    if (!formData.nidn) {
      alert("Silakan isi NIDN / NUPTK.");
      return;
    }

    if (!formData.program) {
      alert("Silakan pilih Program Studi / Fakultas.");
      return;
    }

    if (!formData.email) {
      alert("Silakan isi email resmi kampus.");
      return;
    }

    if (!formData.password) {
      alert("Silakan isi kata sandi.");
      return;
    }

    if (!agreed) {
      alert(
        "Silakan menyetujui Ketentuan Layanan dan Kebijakan Privasi."
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Konfirmasi kata sandi tidak sesuai.");
      return;
    }

    if (formData.password.length < 8) {
      alert("Kata sandi minimal 8 karakter.");
      return;
    }

    console.log("Data Register:", formData);

    alert("Pendaftaran berhasil!");

    // Setelah berhasil daftar, kembali ke halaman login
    window.location.href = "/auth/login";
  };

  return (
    <main className="min-h-screen bg-[#f3f6f9] p-2">
      <div className="min-h-[calc(100vh-16px)] w-full overflow-hidden rounded-md bg-white shadow-sm lg:grid lg:grid-cols-[59%_41%]">

        {/* =====================================================
            BAGIAN KIRI
        ====================================================== */}

        <section className="flex flex-col bg-white px-5 py-8 sm:px-8">

          {/* LOGO */}
          <div className="mb-9 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center text-[#0764dc]">
              <GraduationCap
                size={30}
                strokeWidth={2.2}
              />
            </div>

            <div>
              <h2 className="text-[16px] font-bold leading-[18px] text-[#192236]">
                Gradia
              </h2>

              <p className="mt-[2px] text-[9px] text-[#616979]">
                Sistem Informasi Akademik
              </p>
            </div>
          </div>

          {/* JUDUL */}
          <div className="mb-5">
            <h1 className="mb-2 text-[25px] font-bold leading-[31px] tracking-[-0.6px] text-[#172033]">
              Daftar Akun Dosen Baru
            </h1>

            <p className="max-w-[530px] text-[11px] leading-[17px] text-[#626a7a]">
              Registrasi akun pengajar dengan sinkronisasi NIDN
              dan database perguruan tinggi terpusat.
            </p>
          </div>

          {/* TAB LOGIN / REGISTER */}
          <div className="mb-[22px] grid h-[37px] grid-cols-2 rounded-[11px] bg-[#eef1f5] p-[3px]">

            {/* LOGIN */}
            <Link
              href="/auth/login"
              className="flex h-[31px] items-center justify-center gap-[7px] rounded-[9px] text-[11px] font-medium text-[#3f4655] transition hover:bg-white"
            >
              <User
                size={15}
                strokeWidth={1.7}
              />

              <span>
                Masuk / Login Dosen
              </span>
            </Link>

            {/* REGISTER AKTIF */}
            <div className="flex h-[31px] items-center justify-center gap-[7px] rounded-[9px] bg-[#191a22] text-[11px] font-medium text-white shadow-sm">
              <UserPlus
                size={16}
                strokeWidth={1.7}
              />

              <span>
                Daftar Akun Baru
              </span>
            </div>
          </div>

          {/* =====================================================
              FORM REGISTER
          ====================================================== */}

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-x-[14px] gap-y-3 sm:grid-cols-2"
          >

            {/* NAMA */}
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="mb-[7px] block text-[10.5px] font-medium text-[#20283a]"
              >
                Nama Lengkap Beserta Gelar
              </label>

              <div className="flex h-[38px] items-center gap-2 rounded-lg border border-[#edf0f4] bg-white px-[11px] transition focus-within:border-[#7b73ec] focus-within:ring-2 focus-within:ring-[#5146e5]/10">
                <User
                  size={17}
                  strokeWidth={1.6}
                  className="shrink-0 text-[#c5cfdf]"
                />

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Contoh: Dr. Ir. Hendra, M.T."
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="h-full w-full border-0 bg-transparent text-[10.5px] text-[#31394a] outline-none placeholder:text-[#c7d0de]"
                />
              </div>
            </div>

            {/* NIDN */}
            <div>
              <label
                htmlFor="nidn"
                className="mb-[7px] block text-[10.5px] font-medium text-[#20283a]"
              >
                NIDN / NUPTK
              </label>

              <div className="flex h-[38px] items-center gap-2 rounded-lg border border-[#edf0f4] bg-white px-[11px] transition focus-within:border-[#7b73ec] focus-within:ring-2 focus-within:ring-[#5146e5]/10">
                <Hash
                  size={17}
                  strokeWidth={1.6}
                  className="shrink-0 text-[#c5cfdf]"
                />

                <input
                  id="nidn"
                  name="nidn"
                  type="text"
                  inputMode="numeric"
                  placeholder="10 digit NIDN resmi"
                  value={formData.nidn}
                  onChange={handleChange}
                  required
                  className="h-full w-full border-0 bg-transparent text-[10.5px] outline-none placeholder:text-[#c7d0de]"
                />
              </div>
            </div>

            {/* PROGRAM STUDI */}
            <div>
              <label
                htmlFor="program"
                className="mb-[7px] block text-[10.5px] font-medium text-[#20283a]"
              >
                Program Studi / Fakultas
              </label>

              <div className="relative flex h-[38px] items-center gap-2 rounded-lg border border-[#edf0f4] bg-white px-[11px] transition focus-within:border-[#7b73ec] focus-within:ring-2 focus-within:ring-[#5146e5]/10">

                <Building2
                  size={17}
                  strokeWidth={1.6}
                  className="shrink-0 text-[#c5cfdf]"
                />

                <select
                  id="program"
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  required
                  className="h-full w-full cursor-pointer appearance-none border-0 bg-transparent pr-6 text-[10.5px] text-[#31394a] outline-none"
                >
                  <option value="" disabled>
                    Pilih Program Studi
                  </option>

                  <option value="teknik-informatika">
                    Teknik Informatika (S1)
                  </option>

                  <option value="sistem-informasi">
                    Sistem Informasi (S1)
                  </option>

                  <option value="teknik-komputer">
                    Teknik Komputer (S1)
                  </option>

                  <option value="teknologi-informasi">
                    Teknologi Informasi (D3)
                  </option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-[10px] text-[#b9c3d2]"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="mb-[7px] block text-[10.5px] font-medium text-[#20283a]"
              >
                Email Resmi Kampus (@kampus.ac.id)
              </label>

              <div className="flex h-[38px] items-center gap-2 rounded-lg border border-[#edf0f4] bg-white px-[11px] transition focus-within:border-[#7b73ec] focus-within:ring-2 focus-within:ring-[#5146e5]/10">

                <Mail
                  size={17}
                  strokeWidth={1.6}
                  className="shrink-0 text-[#c5cfdf]"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nama@kampus.ac.id"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-full w-full border-0 bg-transparent text-[10.5px] outline-none placeholder:text-[#c7d0de]"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label
                htmlFor="password"
                className="mb-[7px] block text-[10.5px] font-medium text-[#20283a]"
              >
                Kata Sandi Baru
              </label>

              <div className="flex h-[38px] items-center gap-2 rounded-lg border border-[#edf0f4] bg-white px-[11px] transition focus-within:border-[#7b73ec] focus-within:ring-2 focus-within:ring-[#5146e5]/10">

                <LockKeyhole
                  size={17}
                  strokeWidth={1.6}
                  className="shrink-0 text-[#c5cfdf]"
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimal 8 karakter"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  className="h-full w-full border-0 bg-transparent text-[10.5px] outline-none placeholder:text-[#c7d0de]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="flex h-6 w-6 shrink-0 items-center justify-center text-[#c0cad9] transition hover:text-[#646d7d]"
                >
                  {showPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* KONFIRMASI PASSWORD */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-[7px] block text-[10.5px] font-medium text-[#20283a]"
              >
                Konfirmasi Kata Sandi
              </label>

              <div className="flex h-[38px] items-center gap-2 rounded-lg border border-[#edf0f4] bg-white px-[11px] transition focus-within:border-[#7b73ec] focus-within:ring-2 focus-within:ring-[#5146e5]/10">

                <LockKeyhole
                  size={17}
                  strokeWidth={1.6}
                  className="shrink-0 text-[#c5cfdf]"
                />

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Ulangi kata sandi"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={8}
                  className="h-full w-full border-0 bg-transparent text-[10.5px] outline-none placeholder:text-[#c7d0de]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="flex h-6 w-6 shrink-0 items-center justify-center text-[#c0cad9] transition hover:text-[#646d7d]"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* AGREEMENT */}
            <div className="flex min-h-[27px] items-center gap-[7px] sm:col-span-2">

              <button
                type="button"
                onClick={() => setAgreed(!agreed)}
                className={`flex h-3 w-3 shrink-0 items-center justify-center rounded-[2px] border ${
                  agreed
                    ? "border-[#5146e5] bg-[#5146e5] text-white"
                    : "border-[#aeb5c1] bg-white"
                }`}
                aria-label="Setujui ketentuan"
              >
                {agreed && <Check size={11} />}
              </button>

              <p className="m-0 text-[9px] leading-[14px] text-[#666d7c]">
                Saya menyetujui{" "}
                <a
                  href="#"
                  className="text-[#5146e5] underline"
                >
                  Ketentuan Layanan
                </a>{" "}
                &{" "}
                <a
                  href="#"
                  className="text-[#5146e5] underline"
                >
                  Kebijakan Privasi
                </a>{" "}
                Portal Akademik Gradia.
              </p>

              <div className="ml-auto hidden items-center gap-[3px] whitespace-nowrap text-[9px] text-[#596173] sm:flex">
                <ShieldCheck size={14} />
                <span>256-bit TLS</span>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="flex h-9 items-center justify-center gap-[7px] rounded-lg border-0 bg-[#5146e5] text-[11px] font-semibold text-white shadow-[0_3px_8px_rgba(81,70,229,0.18)] transition hover:bg-[#463bdd] sm:col-span-2"
            >
              <span>
                Daftar & Verifikasi Akun
              </span>

              <ArrowRight size={18} />
            </button>

            {/* LOGIN */}
            <p className="m-0 text-center text-[9.5px] text-[#596173] sm:col-span-2">
              Sudah memiliki akun?{" "}

              <Link
                href="/auth/login"
                className="font-medium text-[#4d45e8] hover:underline"
              >
                Masuk ke Portal Dosen
              </Link>
            </p>
          </form>

          {/* FOOTER */}
          <footer className="mt-auto flex gap-[11px] pt-8 text-[8.5px] text-[#606879]">

            <a
              href="#"
              className="flex items-center gap-1 hover:text-[#5146e5]"
            >
              <CircleHelp size={13} />
              Bantuan Teknis
            </a>

            <span>•</span>

            <a
              href="#"
              className="flex items-center gap-1 hover:text-[#5146e5]"
            >
              <FileText size={13} />
              Protokol Privasi
            </a>
          </footer>
        </section>

        {/* =====================================================
            BAGIAN KANAN
        ====================================================== */}

        <section className="flex flex-col bg-gradient-to-b from-[#f8fafc] to-[#f4f7fa] px-6 py-8 sm:px-8">

          {/* BADGE */}
          <div className="flex justify-end">
            <div className="inline-flex items-center gap-[5px] rounded-full bg-white px-[11px] py-[6px] text-[8.5px] font-medium text-[#1f283a] shadow-sm">

              <BadgeCheck
                size={14}
                className="fill-[#5648e8] text-[#5648e8]"
              />

              <span>
                Mendukung Transformasi Digital Pendidikan
              </span>
            </div>
          </div>

          {/* GAMBAR */}
          <div className="mt-5 rounded-[13px] bg-white p-[10px] shadow-sm">
            <img
              src="/images/register-dosen.png"
              alt="Ilustrasi Gradia"
              className="block aspect-[2/1] w-full rounded-lg object-cover"
            />
          </div>

          {/* DESKRIPSI */}
          <div className="mt-5">

            <h2 className="mb-2 text-[18px] font-bold leading-6 tracking-[-0.35px] text-[#5146e5]">
              Sistem Informasi Akademik
              <br />
              Terintegrasi & AI Feedback Engine
            </h2>

            <p className="text-[9.5px] leading-[15px] text-[#0058a8]">
              Sistem yang dirancang untuk mengelola berbagai
              aktivitas akademik, seperti data mahasiswa, kelas,
              nilai, dan laporan pembelajaran dalam satu
              platform yang terhubung. Sistem ini dilengkapi
              dengan teknologi kecerdasan buatan (AI) yang
              mampu memberikan umpan balik, analisis, dan
              rekomendasi secara otomatis berdasarkan data
              akademik, sehingga dapat membantu dosen dan
              mahasiswa meningkatkan efektivitas proses belajar
              mengajar.
            </p>
          </div>

          {/* FEATURE */}
          <div className="mt-[22px] grid grid-cols-2 gap-2 sm:grid-cols-4">

            <FeatureCard
              icon={<Network size={18} />}
              title="Terintegrasi"
              description={
                <>
                  Semua data
                  <br />
                  akademik
                </>
              }
            />

            <FeatureCard
              icon={<BrainCircuit size={18} />}
              title="AI Feedback"
              description={
                <>
                  Analisis
                  <br />
                  berbasis data
                </>
              }
            />

            <FeatureCard
              icon={<Clock3 size={18} />}
              title="Lebih Efisien"
              description={
                <>
                  Pangkas
                  <br />
                  waktu proses
                </>
              }
            />

            <FeatureCard
              icon={<Shield size={18} />}
              title="Aman"
              description={
                <>
                  Standar
                  <br />
                  keamanan
                </>
              }
            />
          </div>

          {/* SLA */}
          <div className="mt-auto flex items-center justify-between pt-7 text-[8.5px] text-[#555d6d]">

            <span>
              SLA 99.98% Available
            </span>

            <span className="h-[6px] w-[6px] rounded-full bg-[#4e3de0]" />
          </div>
        </section>
      </div>
    </main>
  );
}

/* ============================================================
   FEATURE CARD
============================================================ */

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: ReactNode;
}) {
  return (
    <div className="flex min-h-[98px] flex-col items-center rounded-[9px] bg-white px-[6px] py-[10px] text-center shadow-sm">

      <div className="mb-[5px] flex h-7 w-7 items-center justify-center rounded-[7px] bg-[#f2efff] text-[#614cf1]">
        {icon}
      </div>

      <strong className="text-[9px] leading-3 text-[#20283a]">
        {title}
      </strong>

      <span className="mt-1 text-[7.5px] leading-[10px] text-[#6a7180]">
        {description}
      </span>
    </div>
  );
}