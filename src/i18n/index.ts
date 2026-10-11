import { readonly, ref } from 'vue'

export type Lang = 'id' | 'en'

const STORAGE_KEY = 'mikuri.lang'

function initialLang(): Lang {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'id' || stored === 'en') return stored
  return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'id'
}

const lang = ref<Lang>(initialLang())

const messages = {
  id: {
    'app.name': 'Mikuri',
    'app.tagline': 'Belajar koding, seru dan ramah anak',

    'nav.home': 'Beranda',
    'nav.learn': 'Belajar',
    'nav.play': 'Latihan',
    'nav.about': 'Untuk Orang Tua',
    'nav.cta': 'Mulai belajar',

    'lang.switch': 'Ganti bahasa',
    'lang.id': 'Indonesia',
    'lang.en': 'English',

    'common.minutes': 'menit',
    'common.lessons': 'pelajaran',
    'common.tracks': 'jalur',
    'common.startTrack': 'Mulai jalur ini',
    'common.continue': 'Lanjut belajar',
    'common.next': 'Berikutnya',
    'common.prev': 'Sebelumnya',
    'common.back': 'Kembali',
    'common.openLesson': 'Buka pelajaran',
    'common.done': 'Selesai',
    'common.review': 'Ulangi',
    'common.correct': 'Tepat sekali!',
    'common.tryAgain': 'Coba lagi',
    'common.check': 'Periksa',
    'common.reset': 'Ulangi',
    'common.track': 'Jalur',
    'common.lesson': 'Pelajaran',
    'common.progress': 'Progres',
    'common.notFound': 'Halaman tidak ditemukan',
    'common.backHome': 'Kembali ke beranda',

    'home.hero.eyebrow': 'Untuk usia 7-12 tahun',
    'home.hero.title': 'Belajar koding sambil bermain',
    'home.hero.lead':
      'Ikuti Kuri menelusuri blok logika, Python, sampai membuat halaman web sendiri. Semua pelajaran singkat, berwarna, dan penuh gambar.',
    'home.hero.cta': 'Mulai belajar gratis',
    'home.hero.secondary': 'Lihat cara kerjanya',
    'home.hero.mascotAlt': 'Kuri, maskot kucing yang mengajak belajar koding',
    'home.hero.bubble': 'Hai! Aku Kuri. Ayo belajar bersama!',

    'home.tracks.eyebrow': 'Pilih petualanganmu',
    'home.tracks.title': 'Tiga jalur untuk memulai',
    'home.tracks.lead':
      'Setiap jalur punya warna dan maskotnya sendiri. Mulai dari mana saja, lanjutkan kapan saja.',
    'home.tracks.open': 'Buka jalur',

    'home.how.title': 'Caranya mudah',
    'home.how.1.title': 'Tonton dan tirukan',
    'home.how.1.body': 'Setiap pelajaran dibuka dengan cerita pendek dan gambar yang jelas.',
    'home.how.2.title': 'Coba langsung',
    'home.how.2.body': 'Susun blok kode atau tulis baris pertamamu, lalu lihat hasilnya.',
    'home.how.3.title': 'Kumpulkan bintang',
    'home.how.3.body': 'Kuis kecil di akhir pelajaran membuat belajar terasa seperti bermain.',

    'home.why.title': 'Dibuat dengan hati untuk anak',
    'home.why.1.title': 'Aman dan tanpa iklan',
    'home.why.1.body': 'Tanpa iklan, tanpa pelacakan. Fokus hanya pada belajar.',
    'home.why.2.title': 'Teks besar dan berwarna',
    'home.why.2.body': 'Tombol lebar dan warna lembut memudahkan jari kecil menekan.',
    'home.why.3.title': 'Dua bahasa',
    'home.why.3.body': 'Ganti bahasa Indonesia atau Inggris kapan saja dalam satu klik.',

    'home.quotes.title': 'Kata orang tua',
    'home.quotes.lead': 'Cerita singkat dari keluarga yang memakai Mikuri di rumah.',
    'home.quotes.1.text':
      'Anak saya minta belajar tiap sore. Katanya mau menyusul Kuri ke pelajaran berikutnya.',
    'home.quotes.1.name': 'Ratna Puspita',
    'home.quotes.1.role': 'Ibu dari Bima, 9 tahun',
    'home.quotes.2.text':
      'Materinya runtut dan bahasanya mudah. Saya ikut mendampingi tanpa harus paham koding.',
    'home.quotes.2.name': 'Andi Nugroho',
    'home.quotes.2.role': 'Ayah dari Salma, 8 tahun',
    'home.quotes.3.text':
      'Walau lewat ponsel, tampilannya rapi dan nyaman. Anak betah berlama-lama.',
    'home.quotes.3.name': 'Dewi Anggraini',
    'home.quotes.3.role': 'Guru kelas 4 SD',

    'home.cta.title': 'Siap bermain dengan kode?',
    'home.cta.lead': 'Gabung gratis, tanpa kartu kredit. Mulai dari pelajaran pertama hari ini.',
    'home.cta.button': 'Mulai sekarang',

    'learn.eyebrow': 'Katalog',
    'learn.title': 'Semua jalur belajar',
    'learn.lead': 'Pilih jalur, buka pelajaran, kumpulkan bintang.',
    'learn.progressLabel': 'Progres kamu',
    'learn.progressEmpty': 'Belum ada pelajaran selesai. Yuk mulai satu!',

    'track.about': 'Tentang jalur ini',
    'track.lessonsTitle': 'Daftar pelajaran',
    'track.lessonDone': 'Selesai',
    'track.lessonNew': 'Baru',
    'track.empty': 'Belum ada pelajaran di jalur ini.',

    'lesson.breadcrumb': 'Belajar',
    'lesson.teachTitle': 'Yang akan kamu pelajari',
    'lesson.codeTitle': 'Contoh kode',
    'lesson.exerciseTitle': 'Ayo coba susun',
    'lesson.exercisePrompt': 'Susun blok di bawah agar urutannya benar.',
    'lesson.exerciseHint': 'Ketuk blok untuk memindahkannya ke urutan.',
    'lesson.exerciseSuccess': 'Susunanmu benar!',
    'lesson.quizTitle': 'Kuis singkat',
    'lesson.finish': 'Tandai pelajaran selesai',
    'lesson.finished': 'Pelajaran ditandai selesai',
    'lesson.nextLesson': 'Pelajaran berikutnya',
    'lesson.lastLesson': 'Ini pelajaran terakhir di jalur ini',

    'play.eyebrow': 'Playground',
    'play.title': 'Panggung latihan',
    'play.lead': 'Pilih contoh, susun bloknya, lalu jalankan untuk melihat hasil.',
    'play.chooseExample': 'Pilih contoh',
    'play.blocks': 'Blok yang tersedia',
    'play.workspace': 'Urutanmu',
    'play.workspaceEmpty': 'Ketuk blok di atas untuk menambah ke urutan.',
    'play.run': 'Jalankan',
    'play.reset': 'Bersihkan',
    'play.output': 'Hasil',
    'play.outputEmpty': 'Tekan Jalankan untuk melihat hasilnya di sini.',
    'play.hint': 'Susun blok sampai urutannya pas, lalu tekan Jalankan.',

    'about.eyebrow': 'Untuk orang tua & guru',
    'about.title': 'Belajar yang tenang dan aman',
    'about.lead':
      'Mikuri dirancang bersama guru dan orang tua agar anak belajar dengan nyaman, tanpa gangguan.',
    'about.method.title': 'Pendekatan belajar',
    'about.method.body':
      'Setiap pelajaran mengikuti pola lihat, tirukan, lalu coba sendiri. Konsep diperkenalkan dalam porsi kecil dengan banyak contoh visual.',
    'about.safety.title': 'Keamanan',
    'about.safety.1': 'Tanpa iklan dan tanpa pelacakan.',
    'about.safety.2': 'Progres disimpan di perangkatmu sendiri.',
    'about.safety.3': 'Tanpa akun, tanpa data pribadi anak.',
    'about.age.title': 'Untuk usia berapa?',
    'about.age.body':
      'Paling pas untuk usia 7-12 tahun. Anak yang lebih kecil tetap bisa ikut dengan pendampingan orang tua.',
    'about.faq.title': 'Pertanyaan umum',
    'about.faq.1.q': 'Apakah perlu memasang aplikasi?',
    'about.faq.1.a': 'Tidak. Mikuri berjalan di peramban ponsel, tablet, maupun komputer.',
    'about.faq.2.q': 'Apakah anak harus bisa membaca lancar?',
    'about.faq.2.a':
      'Tidak perlu. Banyak pelajaran memakai gambar dan blok warna sehingga bisa diikuti sambil belajar membaca.',
    'about.faq.3.q': 'Bahasa pemrograman apa yang dipakai?',
    'about.faq.3.a':
      'Soal dan penjelasan tersedia dalam dua bahasa, sedangkan kode selalu ditulis dalam bahasa Inggris seperti aslinya.',

    'footer.tagline': 'Belajar koding dasar, gratis untuk semua anak.',
    'footer.explore': 'Jelajahi',
    'footer.about': 'Tentang',
    'footer.rights': 'Dibuat dengan sabar untuk belajar yang menyenangkan.',
    'footer.mascotAlt': 'Kuri melambai',
  },
  en: {
    'app.name': 'Mikuri',
    'app.tagline': 'Learn to code, fun and kid friendly',

    'nav.home': 'Home',
    'nav.learn': 'Learn',
    'nav.play': 'Practice',
    'nav.about': 'For Parents',
    'nav.cta': 'Start learning',

    'lang.switch': 'Switch language',
    'lang.id': 'Indonesian',
    'lang.en': 'English',

    'common.minutes': 'min',
    'common.lessons': 'lessons',
    'common.tracks': 'tracks',
    'common.startTrack': 'Start this track',
    'common.continue': 'Keep learning',
    'common.next': 'Next',
    'common.prev': 'Previous',
    'common.back': 'Back',
    'common.openLesson': 'Open lesson',
    'common.done': 'Done',
    'common.review': 'Review',
    'common.correct': 'Spot on!',
    'common.tryAgain': 'Try again',
    'common.check': 'Check',
    'common.reset': 'Reset',
    'common.track': 'Track',
    'common.lesson': 'Lesson',
    'common.progress': 'Progress',
    'common.notFound': 'Page not found',
    'common.backHome': 'Back to home',

    'home.hero.eyebrow': 'For ages 7-12',
    'home.hero.title': 'Learn to code through play',
    'home.hero.lead':
      'Follow Kuri through logic blocks, Python, and building your own web page. Every lesson is short, colorful, and full of pictures.',
    'home.hero.cta': 'Start learning free',
    'home.hero.secondary': 'See how it works',
    'home.hero.mascotAlt': 'Kuri, the cat mascot who guides you through coding',
    'home.hero.bubble': 'Hi! I am Kuri. Let us learn together!',

    'home.tracks.eyebrow': 'Pick your adventure',
    'home.tracks.title': 'Three tracks to begin',
    'home.tracks.lead':
      'Each track has its own color and mascot. Start anywhere, continue anytime.',
    'home.tracks.open': 'Open track',

    'home.how.title': 'Easy as one, two, three',
    'home.how.1.title': 'Watch and copy',
    'home.how.1.body': 'Every lesson opens with a short story and clear pictures.',
    'home.how.2.title': 'Try it yourself',
    'home.how.2.body': 'Stack code blocks or write your first line, then see it work.',
    'home.how.3.title': 'Collect stars',
    'home.how.3.body': 'A small quiz at the end turns learning into play.',

    'home.why.title': 'Made with care for kids',
    'home.why.1.title': 'Safe and ad free',
    'home.why.1.body': 'No ads, no tracking. Just learning.',
    'home.why.2.title': 'Big, colorful text',
    'home.why.2.body': 'Wide buttons and soft colors are easy for small fingers.',
    'home.why.3.title': 'Two languages',
    'home.why.3.body': 'Switch between Indonesian and English in one tap.',

    'home.quotes.title': 'Words from parents',
    'home.quotes.lead': 'Short stories from families learning with Mikuri at home.',
    'home.quotes.1.text':
      'My child asks to study every afternoon. She wants to catch up with Kuri to the next lesson.',
    'home.quotes.1.name': 'Ratna Puspita',
    'home.quotes.1.role': 'Mother of Bima, age 9',
    'home.quotes.2.text':
      'The material flows well and the language is simple. I can guide without knowing code.',
    'home.quotes.2.name': 'Andi Nugroho',
    'home.quotes.2.role': 'Father of Salma, age 8',
    'home.quotes.3.text':
      'Even on a phone the layout is tidy and comfortable. Kids settle in for a long time.',
    'home.quotes.3.name': 'Dewi Anggraini',
    'home.quotes.3.role': 'Grade 4 teacher',

    'home.cta.title': 'Ready to play with code?',
    'home.cta.lead': 'Join free, no credit card. Start your first lesson today.',
    'home.cta.button': 'Start now',

    'learn.eyebrow': 'Catalog',
    'learn.title': 'All learning tracks',
    'learn.lead': 'Pick a track, open a lesson, collect stars.',
    'learn.progressLabel': 'Your progress',
    'learn.progressEmpty': 'No finished lessons yet. Start one!',

    'track.about': 'About this track',
    'track.lessonsTitle': 'Lesson list',
    'track.lessonDone': 'Done',
    'track.lessonNew': 'New',
    'track.empty': 'No lessons in this track yet.',

    'lesson.breadcrumb': 'Learn',
    'lesson.teachTitle': 'What you will learn',
    'lesson.codeTitle': 'Example code',
    'lesson.exerciseTitle': 'Try to build it',
    'lesson.exercisePrompt': 'Arrange the blocks below in the right order.',
    'lesson.exerciseHint': 'Tap a block to move it into the order.',
    'lesson.exerciseSuccess': 'Your order is correct!',
    'lesson.quizTitle': 'Quick quiz',
    'lesson.finish': 'Mark lesson as done',
    'lesson.finished': 'Lesson marked as done',
    'lesson.nextLesson': 'Next lesson',
    'lesson.lastLesson': 'This is the last lesson in the track',

    'play.eyebrow': 'Playground',
    'play.title': 'Practice stage',
    'play.lead': 'Pick an example, arrange the blocks, then run it to see the result.',
    'play.chooseExample': 'Choose an example',
    'play.blocks': 'Available blocks',
    'play.workspace': 'Your order',
    'play.workspaceEmpty': 'Tap a block above to add it to your order.',
    'play.run': 'Run',
    'play.reset': 'Clear',
    'play.output': 'Output',
    'play.outputEmpty': 'Press Run to see the result here.',
    'play.hint': 'Arrange the blocks until the order fits, then press Run.',

    'about.eyebrow': 'For parents & teachers',
    'about.title': 'Calm and safe learning',
    'about.lead':
      'Mikuri is designed with teachers and parents so kids learn comfortably, free of distraction.',
    'about.method.title': 'Learning approach',
    'about.method.body':
      'Each lesson follows a watch, copy, then try-it-yourself flow. Concepts come in small pieces with plenty of visual examples.',
    'about.safety.title': 'Safety',
    'about.safety.1': 'No ads and no tracking.',
    'about.safety.2': 'Progress is stored on your own device.',
    'about.safety.3': 'No account, no personal data from children.',
    'about.age.title': 'What age is it for?',
    'about.age.body':
      'Best suited for ages 7-12. Younger kids can still join with a parent alongside.',
    'about.faq.title': 'Common questions',
    'about.faq.1.q': 'Do I need to install an app?',
    'about.faq.1.a': 'No. Mikuri runs in the browser on phones, tablets, and computers.',
    'about.faq.2.q': 'Does my child need to read fluently?',
    'about.faq.2.a':
      'Not at all. Many lessons use pictures and colored blocks, so kids can follow while still learning to read.',
    'about.faq.3.q': 'Which programming language is used?',
    'about.faq.3.a':
      'Questions and explanations are in two languages, while code is always written in English as it truly is.',

    'footer.tagline': 'Learn basic coding, free for every child.',
    'footer.explore': 'Explore',
    'footer.about': 'About',
    'footer.rights': 'Built patiently for joyful learning.',
    'footer.mascotAlt': 'Kuri waving',
  },
} as const

export type MessageKey = keyof (typeof messages)['id']

export function useI18n() {
  function t(key: MessageKey): string {
    return messages[lang.value][key] ?? messages.id[key] ?? key
  }

  function pick(field: { id: string; en: string }): string {
    return field[lang.value] ?? field.id
  }

  function setLang(next: Lang) {
    lang.value = next
    localStorage.setItem(STORAGE_KEY, next)
    document.documentElement.lang = next
  }

  function toggleLang() {
    setLang(lang.value === 'id' ? 'en' : 'id')
  }

  return { lang: readonly(lang), t, pick, setLang, toggleLang }
}
