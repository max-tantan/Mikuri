# Mikuri

Website belajar pemrograman dasar untuk anak (7-12 tahun) dengan tema lucu dan ramah anak.

Dibangun dengan **Vue 3 + TypeScript + Vite**, **Vue Router**, dan **CSS murni + design tokens** (tanpa framework UI). Mobile-first.

## Menjalankan

```bash
npm install
npm run dev      # server pengembangan
npm run build    # typecheck (vue-tsc) + build produksi
npm run preview  # pratinjau hasil build
```

## Struktur

```
src/
  router/index.ts        # definisi route + pengelolaan fokus & progress bar
  i18n/index.ts          # kamus dua bahasa (id/en) + useI18n (mendukung {param})
  data/tracks.ts         # jalur + pelajaran
  data/playground.ts     # contoh latihan playground
  composables/useAuth.ts      # sesi lokal demo (nama + PIN, di localStorage)
  composables/useProgress.ts  # progres belajar (localStorage)
  composables/useRewards.ts   # bintang, streak harian, lencana
  composables/useSettings.ts  # preferensi (suara, getar, baca nyaring, teks, gerak)
  composables/useSound.ts     # efek suara via Web Audio (default mati)
  composables/useHaptics.ts   # getaran (default mati)
  composables/useSpeech.ts    # baca nyaring via Web Speech API
  composables/useConfetti.ts  # perayaan canvas-confetti (impor dinamis)
  composables/useSwipe.ts     # geser antar-pelajaran di mobile
  directives/reveal.ts   # scroll reveal (IntersectionObserver)
  components/brand/      # Mascot "Kuri" (berekspresi), SpeechBubble
  components/ui/         # AppButton, AppCard, ProgressBar, LanguageToggle,
                         # ReadAloudButton, SkeletonBlock, ErrorBoundary
  components/layout/     # TopNav, BottomNav, AppFooter, SettingsSheet, RouteProgress,
                         # PageHeader (header konten per-halaman)
  components/lesson/     # BlockSorter (urutkan ulang), QuizCard, StepIndicator
  views/                 # Home, Learn, Track, Lesson, Playground, Collection,
                         # About, NotFound
  style.css              # design tokens + base
```

## Halaman

- `/masuk` Masuk (gerbang sebelum aplikasi)
- `/daftar` Daftar
- `/` Beranda (dengan kartu "Lanjut belajar")
- `/belajar` Katalog jalur
- `/belajar/:track` Detail jalur
- `/belajar/:track/:lesson` Pelajaran (materi, latihan susun blok, kuis, step indicator)
- `/latihan` Playground (susun blok + output simulasi)
- `/koleksi` Bintang, streak, dan lencana
- `/tentang` Untuk orang tua & guru

## UX

- **Gerbang masuk**: halaman `/masuk` & `/daftar` (nama + PIN 4 angka) tampil sebelum halaman utama. Semua route lain dijaga; belum masuk akan diarahkan ke `/masuk`. Ini **sesi lokal demo**: tidak ada server, akun hanya tersimpan di perangkat. Keluar lewat panel Pengaturan.
- **Kuri berekspresi** (`idle/happy/cheer/think/oops`) dengan balon ucapan untuk petunjuk dan pujian.
- **Header konten** seragam di semua halaman (kecuali Beranda) via `PageHeader`: pita gradien lembut beraksen warna, chip ikon, eyebrow pill, dan breadcrumb opsional.
- **Reward**: bintang per pelajaran, streak harian, lencana jalur. Perayaan confetti saat berhasil.
- **Latihan**: blok bisa diurutkan ulang (drag di desktop, tombol naik/turun untuk aksesibilitas).
- **Pengaturan** (ikon roda gigi di header): bahasa, suara, getaran, baca nyaring, ukuran teks, kurangi gerak, reset progres. Suara & getaran **default mati**.
- **Baca nyaring** memakai Web Speech API (fallback aman bila tidak didukung).
- Menghormati `prefers-reduced-motion` dan menyediakan override manual.

## Catatan

Teks UI tersedia dalam dua bahasa (ID default + EN). Kode contoh selalu ditulis dalam bahasa Inggris. Progres, bintang, dan pengaturan disimpan di `localStorage` perangkat. Python di playground masih berupa **output tersimulasi** (belum mengeksekusi Python nyata).
