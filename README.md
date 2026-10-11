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
  router/index.ts        # definisi route
  i18n/index.ts          # kamus dua bahasa (id/en) + composable useI18n
  data/tracks.ts         # jalur + pelajaran
  data/playground.ts     # contoh latihan playground
  composables/useProgress.ts  # progres belajar (localStorage)
  directives/reveal.ts   # scroll reveal (IntersectionObserver)
  components/brand/Mascot.vue # maskot "Kuri"
  components/ui/         # AppButton, AppCard, ProgressBar, LanguageToggle
  components/layout/     # TopNav, BottomNav, AppFooter
  components/lesson/     # BlockSorter, QuizCard
  views/                 # Home, Learn, Track, Lesson, Playground, About, NotFound
  style.css              # design tokens + base
```

## Halaman

- `/` Beranda
- `/belajar` Katalog jalur
- `/belajar/:track` Detail jalur
- `/belajar/:track/:lesson` Pelajaran (materi, latihan susun blok, kuis)
- `/latihan` Playground (susun blok + output simulasi)
- `/tentang` Untuk orang tua & guru

## Catatan

Teks UI tersedia dalam dua bahasa (ID default + EN, tombol ganti bahasa di header). Kode contoh selalu ditulis dalam bahasa Inggris. Progres belajar disimpan di `localStorage` perangkat.
