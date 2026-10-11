export type Bi = { id: string; en: string }

export type TrackColor = 'mint' | 'sky' | 'sunny' | 'grape' | 'coral'

export interface CodeSample {
  lang: string
  text: string
}

export interface ExerciseBlock {
  id: string
  label: Bi
  code: string
}

export interface Exercise {
  prompt: Bi
  blocks: ExerciseBlock[]
  solution: string[]
}

export interface Quiz {
  question: Bi
  options: { id: string; label: Bi }[]
  answer: string
  explain: Bi
}

export interface Lesson {
  slug: string
  title: Bi
  summary: Bi
  minutes: number
  teach: Bi[]
  code?: CodeSample
  exercise?: Exercise
  quiz: Quiz
}

export interface Track {
  slug: string
  color: TrackColor
  icon: string
  title: Bi
  tagline: Bi
  about: Bi
  lessons: Lesson[]
}

export const tracks: Track[] = [
  {
    slug: 'blok-logika',
    color: 'mint',
    icon: 'PuzzlePiece',
    title: { id: 'Blok Logika', en: 'Logic Blocks' },
    tagline: {
      id: 'Susun perintah seperti menyusun lego.',
      en: 'Stack orders like building blocks.',
    },
    about: {
      id: 'Jalur pertama untuk mengenal cara berpikir komputer. Tidak perlu mengetik, cukup menyusun blok warna-warni.',
      en: 'The first track for learning how computers think. No typing needed, just arrange colorful blocks.',
    },
    lessons: [
      {
        slug: 'urutan-itu-penting',
        title: { id: 'Urutan Itu Penting', en: 'Order Matters' },
        summary: {
          id: 'Komputer mengerjakan perintah dari atas ke bawah.',
          en: 'A computer follows orders from top to bottom.',
        },
        minutes: 6,
        teach: [
          {
            id: 'Komputer membaca perintah satu per satu, dari yang paling atas.',
            en: 'A computer reads orders one by one, starting from the top.',
          },
          {
            id: 'Kalau urutannya tertukar, hasilnya bisa berbeda.',
            en: 'If the order changes, the result can change too.',
          },
          {
            id: 'Susun langkah seperti resep: langkah pertama dulu, baru berikutnya.',
            en: 'Lay out steps like a recipe: first step first, then the next.',
          },
        ],
        code: {
          lang: 'blocks',
          text: 'ambil gelas\nisi air\nminum',
        },
        exercise: {
          prompt: {
            id: 'Susun blok agar Kuri berhasil minum.',
            en: 'Arrange the blocks so Kuri can drink.',
          },
          blocks: [
            { id: 'b1', label: { id: 'Ambil gelas', en: 'Take the glass' }, code: 'ambil gelas' },
            { id: 'b2', label: { id: 'Isi air', en: 'Fill with water' }, code: 'isi air' },
            { id: 'b3', label: { id: 'Minum', en: 'Drink' }, code: 'minum' },
          ],
          solution: ['b1', 'b2', 'b3'],
        },
        quiz: {
          question: {
            id: 'Komputer membaca perintah dari mana?',
            en: 'Where does a computer start reading orders?',
          },
          options: [
            { id: 'a', label: { id: 'Dari bawah', en: 'From the bottom' } },
            { id: 'b', label: { id: 'Dari atas', en: 'From the top' } },
            { id: 'c', label: { id: 'Acak', en: 'At random' } },
          ],
          answer: 'b',
          explain: {
            id: 'Benar, komputer mulai dari perintah paling atas.',
            en: 'Right, a computer starts from the topmost order.',
          },
        },
      },
      {
        slug: 'putar-dan-ulang',
        title: { id: 'Putar dan Ulang', en: 'Spin and Repeat' },
        summary: {
          id: 'Ulangi perintah berkali-kali tanpa menulis berulang.',
          en: 'Repeat an order many times without writing it again.',
        },
        minutes: 7,
        teach: [
          {
            id: 'Perulangan membuat komputer mengerjakan hal yang sama berkali-kali.',
            en: 'A loop makes the computer do the same thing again and again.',
          },
          {
            id: 'Kita cukup menulis perintahnya sekali, lalu tentukan berapa kali.',
            en: 'We write the order once, then say how many times.',
          },
          {
            id: 'Contohnya: langkah tiga kali, bukan langkah tulis tiga kali.',
            en: 'For example: step three times, not write out three steps.',
          },
        ],
        code: {
          lang: 'blocks',
          text: 'ulangi 3 kali:\n  maju satu langkah',
        },
        exercise: {
          prompt: {
            id: 'Buat Kuri melangkah tiga kali dengan blok perulangan.',
            en: 'Make Kuri step three times using a loop block.',
          },
          blocks: [
            { id: 'b1', label: { id: 'Ulangi 3 kali', en: 'Repeat 3 times' }, code: 'ulangi 3 kali:' },
            { id: 'b2', label: { id: 'Maju satu langkah', en: 'Step forward' }, code: '  maju satu langkah' },
            { id: 'b3', label: { id: 'Kembali ke awal', en: 'Return to start' }, code: 'kembali ke awal' },
          ],
          solution: ['b1', 'b2'],
        },
        quiz: {
          question: {
            id: 'Blok apa yang membuat perintah diulang?',
            en: 'Which block makes an order repeat?',
          },
          options: [
            { id: 'a', label: { id: 'Blok ulangi', en: 'Repeat block' } },
            { id: 'b', label: { id: 'Blok warna', en: 'Color block' } },
            { id: 'c', label: { id: 'Blok diam', en: 'Stop block' } },
          ],
          answer: 'a',
          explain: {
            id: 'Tepat, blok ulangi yang membuat perintah berjalan berkali-kali.',
            en: 'Correct, the repeat block runs an order many times.',
          },
        },
      },
      {
        slug: 'kalau-maka',
        title: { id: 'Kalau Maka', en: 'If Then' },
        summary: {
          id: 'Komputer memilih tindakan jika ada syarat yang terpenuhi.',
          en: 'A computer chooses an action when a condition is met.',
        },
        minutes: 7,
        teach: [
          {
            id: 'Kondisi adalah pertanyaan yang jawabannya ya atau tidak.',
            en: 'A condition is a question with a yes or no answer.',
          },
          {
            id: 'Jika jawabannya ya, komputer menjalankan perintah di bawahnya.',
            en: 'If the answer is yes, the computer runs the order below it.',
          },
          {
            id: 'Contoh: jika hujan, maka bawa payung.',
            en: 'Example: if it rains, then bring an umbrella.',
          },
        ],
        code: {
          lang: 'blocks',
          text: 'jika hujan:\n  bawa payung\nlainnya:\n  pakai topi',
        },
        exercise: {
          prompt: {
            id: 'Susun blok kondisi agar Kuri membawa payung saat hujan.',
            en: 'Arrange the condition blocks so Kuri brings an umbrella when it rains.',
          },
          blocks: [
            { id: 'b1', label: { id: 'Jika hujan', en: 'If it rains' }, code: 'jika hujan:' },
            { id: 'b2', label: { id: 'Bawa payung', en: 'Bring umbrella' }, code: '  bawa payung' },
            { id: 'b3', label: { id: 'Pakai topi', en: 'Wear a hat' }, code: '  pakai topi' },
            { id: 'b4', label: { id: 'Jika cerah', en: 'If it is sunny' }, code: 'jika cerah:' },
          ],
          solution: ['b1', 'b2'],
        },
        quiz: {
          question: {
            id: 'Kondisi dijawab dengan apa?',
            en: 'A condition is answered with what?',
          },
          options: [
            { id: 'a', label: { id: 'angka banyak', en: 'large numbers' } },
            { id: 'b', label: { id: 'ya atau tidak', en: 'yes or no' } },
            { id: 'c', label: { id: 'warna', en: 'colors' } },
          ],
          answer: 'b',
          explain: {
            id: 'Betul, kondisi hanya punya dua jawaban: ya atau tidak.',
            en: 'Exactly, a condition has two answers: yes or no.',
          },
        },
      },
    ],
  },
  {
    slug: 'python-dasar',
    color: 'sky',
    icon: 'Terminal',
    title: { id: 'Python Dasar', en: 'Python Basics' },
    tagline: {
      id: 'Tulis baris pertama bahasamu.',
      en: 'Write your very first lines.',
    },
    about: {
      id: 'Mulai mengetik kode sungguhan dengan bahasa Python. Contohnya singkat dan hasilnya langsung terlihat.',
      en: 'Start typing real code in Python. Examples are short and the result shows up right away.',
    },
    lessons: [
      {
        slug: 'halo-dunia',
        title: { id: 'Halo, Dunia!', en: 'Hello, World!' },
        summary: {
          id: 'Tampilkan tulisan di layar dengan satu perintah.',
          en: 'Show text on the screen with a single command.',
        },
        minutes: 5,
        teach: [
          {
            id: 'Perintah print menampilkan tulisan ke layar.',
            en: 'The print command shows text on the screen.',
          },
          {
            id: 'Tulisan yang mau ditampilkan ditulis di dalam tanda kutip.',
            en: 'The text to show goes inside quotation marks.',
          },
          {
            id: 'setiap baris perintah ditulis di baris baru.',
            en: 'Each command is written on its own new line.',
          },
        ],
        code: { lang: 'python', text: 'print("Halo, Dunia!")' },
        exercise: {
          prompt: {
            id: 'Susun baris agar menampilkan tulisan Halo, Kuri!',
            en: 'Arrange the line to print Halo, Kuri!',
          },
          blocks: [
            { id: 'b1', label: { id: 'Tulis print', en: 'Write print' }, code: 'print' },
            { id: 'b2', label: { id: 'Buka tanda kurung', en: 'Open bracket' }, code: '("Halo, Kuri!")' },
            { id: 'b3', label: { id: 'Akhiri baris', en: 'End the line' }, code: ';' },
          ],
          solution: ['b1', 'b2'],
        },
        quiz: {
          question: {
            id: 'Perintah apa yang menampilkan tulisan?',
            en: 'Which command shows text?',
          },
          options: [
            { id: 'a', label: { id: 'print', en: 'print' } },
            { id: 'b', label: { id: 'show', en: 'show' } },
            { id: 'c', label: { id: 'write', en: 'write' } },
          ],
          answer: 'a',
          explain: {
            id: 'Benar, print menampilkan tulisan di layar.',
            en: 'Correct, print shows text on the screen.',
          },
        },
      },
      {
        slug: 'variabel-itu-kotak',
        title: { id: 'Variabel Itu Kotak', en: 'Variables Are Boxes' },
        summary: {
          id: 'Simpan nilai di dalam kotak bernama.',
          en: 'Store a value inside a named box.',
        },
        minutes: 6,
        teach: [
          {
            id: 'Variabel itu seperti kotak berlabel untuk menyimpan sesuatu.',
            en: 'A variable is like a labeled box to store something.',
          },
          {
            id: 'Beri nama yang jelas, misalnya umur atau nama.',
            en: 'Give it a clear name, like age or name.',
          },
          {
            id: 'Isi kotaknya bisa diganti kapan saja.',
            en: 'You can change what is inside the box anytime.',
          },
        ],
        code: { lang: 'python', text: 'nama = "Kuri"\nprint(nama)' },
        exercise: {
          prompt: {
            id: 'Buat kotak bernama nama lalu isi dengan Kuri.',
            en: 'Make a box named name and fill it with Kuri.',
          },
          blocks: [
            { id: 'b1', label: { id: 'Nama kotak', en: 'Box name' }, code: 'nama' },
            { id: 'b2', label: { id: 'Tanda samadengan', en: 'Equals sign' }, code: ' = ' },
            { id: 'b3', label: { id: 'Isi kotak', en: 'Box content' }, code: '"Kuri"' },
          ],
          solution: ['b1', 'b2', 'b3'],
        },
        quiz: {
          question: {
            id: 'Variabel paling mirip dengan apa?',
            en: 'A variable is most like what?',
          },
          options: [
            { id: 'a', label: { id: 'kotak berlabel', en: 'a labeled box' } },
            { id: 'b', label: { id: 'pintu', en: 'a door' } },
            { id: 'c', label: { id: 'warna', en: 'a color' } },
          ],
          answer: 'a',
          explain: {
            id: 'Tepat, variabel menyimpan nilai seperti kotak berlabel.',
            en: 'Right, a variable stores a value like a labeled box.',
          },
        },
      },
      {
        slug: 'ulang-terus',
        title: { id: 'Ulang Terus', en: 'Keep Repeating' },
        summary: {
          id: 'Ulangi pekerjaan dengan satu perulangan for.',
          en: 'Repeat work with a single for loop.',
        },
        minutes: 7,
        teach: [
          {
            id: 'Perulangan for mengulang perintah beberapa kali.',
            en: 'A for loop repeats an order several times.',
          },
          {
            id: 'range menentukan berapa kali perintah diulang.',
            en: 'range decides how many times the order repeats.',
          },
          {
            id: 'Tulis perintahnya sekali saja, di dalam perulangan.',
            en: 'Write the order just once, inside the loop.',
          },
        ],
        code: { lang: 'python', text: 'for i in range(3):\n    print("Hore!")' },
        exercise: {
          prompt: {
            id: 'Susun perulangan yang mengulang tiga kali.',
            en: 'Arrange a loop that repeats three times.',
          },
          blocks: [
            { id: 'b1', label: { id: 'Mulai perulangan', en: 'Start the loop' }, code: 'for i in range(3):' },
            { id: 'b2', label: { id: 'Baris dalam', en: 'Inner line' }, code: '    print("Hore!")' },
            { id: 'b3', label: { id: 'Akhiri program', en: 'End program' }, code: 'end' },
          ],
          solution: ['b1', 'b2'],
        },
        quiz: {
          question: {
            id: 'Fungsi apa yang menentukan jumlah ulangan?',
            en: 'Which function sets the number of repeats?',
          },
          options: [
            { id: 'a', label: { id: 'range', en: 'range' } },
            { id: 'b', label: { id: 'print', en: 'print' } },
            { id: 'c', label: { id: 'nama', en: 'name' } },
          ],
          answer: 'a',
          explain: {
            id: 'Betul, range(3) berarti ulangi tiga kali.',
            en: 'Yes, range(3) means repeat three times.',
          },
        },
      },
    ],
  },
  {
    slug: 'web-dasar',
    color: 'sunny',
    icon: 'Code',
    title: { id: 'Web Dasar', en: 'Web Basics' },
    tagline: {
      id: 'Bangun halaman web pertamamu.',
      en: 'Build your very first web page.',
    },
    about: {
      id: 'Kenali HTML untuk isi dan CSS untuk warna. Cukup sedikit kode untuk membuat halaman yang rapi.',
      en: 'Meet HTML for content and CSS for color. A little code goes a long way.',
    },
    lessons: [
      {
        slug: 'halaman-pertamamu',
        title: { id: 'Halaman Pertamamu', en: 'Your First Page' },
        summary: {
          id: 'Semua halaman web dimulai dari tulisan sederhana.',
          en: 'Every web page starts from simple writing.',
        },
        minutes: 6,
        teach: [
          {
            id: 'HTML menyusun isi halaman: judul, paragraf, dan gambar.',
            en: 'HTML arranges page content: headings, paragraphs, and images.',
          },
          {
            id: 'Tanda seperti artinya tulisan ini adalah judul.',
            en: 'Tags like mark that this text is a heading.',
          },
          {
            id: 'Simpan sebagai file lalu buka di peramban untuk melihatnya.',
            en: 'Save it as a file then open it in a browser to see it.',
          },
        ],
        code: { lang: 'html', text: '<h1>Halo, Dunia!</h1>\n<p>Ini halaman pertamaku.</p>' },
        exercise: {
          prompt: {
            id: 'Susun tag agar muncul judul Halo, Dunia!',
            en: 'Arrange the tags to show the heading Halo, Dunia!',
          },
          blocks: [
            { id: 'b1', label: { id: 'Buka judul', en: 'Open heading' }, code: '<h1>' },
            { id: 'b2', label: { id: 'Isi tulisan', en: 'Text inside' }, code: 'Halo, Dunia!' },
            { id: 'b3', label: { id: 'Tutup judul', en: 'Close heading' }, code: '</h1>' },
          ],
          solution: ['b1', 'b2', 'b3'],
        },
        quiz: {
          question: {
            id: 'Tag apa yang membuat judul besar?',
            en: 'Which tag makes a big heading?',
          },
          options: [
            { id: 'a', label: { id: '<h1>', en: '<h1>' } },
            { id: 'b', label: { id: '<p>', en: '<p>' } },
            { id: 'c', label: { id: '<b>', en: '<b>' } },
          ],
          answer: 'a',
          explain: {
            id: 'Benar, tag h1 membuat judul paling besar.',
            en: 'Right, the h1 tag makes the biggest heading.',
          },
        },
      },
      {
        slug: 'memberi-warna',
        title: { id: 'Memberi Warna', en: 'Adding Color' },
        summary: {
          id: 'Pakai CSS untuk mengubah warna dan ukuran tulisan.',
          en: 'Use CSS to change text color and size.',
        },
        minutes: 6,
        teach: [
          {
            id: 'CSS mengatur tampilan, seperti warna dan ukuran.',
            en: 'CSS controls how things look, like color and size.',
          },
          {
            id: 'Setiap aturan CSS memilih sesuatu lalu memberi gaya.',
            en: 'Each CSS rule picks something then gives it a style.',
          },
          {
            id: 'Contohnya warna tulisan diubah dengan kata color.',
            en: 'For example, text color changes with the word color.',
          },
        ],
        code: { lang: 'css', text: 'h1 {\n  color: coral;\n  font-size: 32px;\n}' },
        exercise: {
          prompt: {
            id: 'Susun aturan CSS untuk mewarnai judul.',
            en: 'Arrange the CSS rule to color the heading.',
          },
          blocks: [
            { id: 'b1', label: { id: 'Pilih judul', en: 'Select heading' }, code: 'h1' },
            { id: 'b2', label: { id: 'Buka gaya', en: 'Open style' }, code: ' { color: coral; }' },
            { id: 'b3', label: { id: 'Tutup gaya', en: 'Close style' }, code: ' }' },
          ],
          solution: ['b1', 'b2'],
        },
        quiz: {
          question: {
            id: 'Properti apa yang mengubah warna tulisan?',
            en: 'Which property changes text color?',
          },
          options: [
            { id: 'a', label: { id: 'color', en: 'color' } },
            { id: 'b', label: { id: 'size', en: 'size' } },
            { id: 'c', label: { id: 'font', en: 'font' } },
          ],
          answer: 'a',
          explain: {
            id: 'Tepat, properti color mengubah warna tulisan.',
            en: 'Correct, the color property changes text color.',
          },
        },
      },
      {
        slug: 'tombol-pertama',
        title: { id: 'Tombol Pertama', en: 'Your First Button' },
        summary: {
          id: 'Tambahkan tombol yang bisa ditekan dengan satu tag.',
          en: 'Add a button that can be pressed with one tag.',
        },
        minutes: 5,
        teach: [
          {
            id: 'Tag button membuat sebuah tombol di halaman.',
            en: 'A button tag creates a button on the page.',
          },
          {
            id: 'Tombol bisa diberi tulisan di dalamnya.',
            en: 'A button can hold a label inside it.',
          },
          {
            id: 'Gaya tombol diatur dengan CSS seperti tulisan biasa.',
            en: 'Button styling is set with CSS just like normal text.',
          },
        ],
        code: { lang: 'html', text: '<button>Klik aku</button>' },
        exercise: {
          prompt: {
            id: 'Susun tag tombol dengan tulisan Klik aku.',
            en: 'Arrange the button tags with the label Klik aku.',
          },
          blocks: [
            { id: 'b1', label: { id: 'Buka tombol', en: 'Open button' }, code: '<button>' },
            { id: 'b2', label: { id: 'Tulisan', en: 'Label' }, code: 'Klik aku' },
            { id: 'b3', label: { id: 'Tutup tombol', en: 'Close button' }, code: '</button>' },
          ],
          solution: ['b1', 'b2', 'b3'],
        },
        quiz: {
          question: {
            id: 'Tag apa yang membuat tombol?',
            en: 'Which tag creates a button?',
          },
          options: [
            { id: 'a', label: { id: '<button>', en: '<button>' } },
            { id: 'b', label: { id: '<p>', en: '<p>' } },
            { id: 'c', label: { id: '<div>', en: '<div>' } },
          ],
          answer: 'a',
          explain: {
            id: 'Benar, tag button membuat tombol.',
            en: 'Right, the button tag creates a button.',
          },
        },
      },
    ],
  },
]

export function findTrack(slug: string): Track | undefined {
  return tracks.find((t) => t.slug === slug)
}

export function findLesson(trackSlug: string, lessonSlug: string) {
  const track = findTrack(trackSlug)
  if (!track) return { track: undefined, lesson: undefined, index: -1 }
  const index = track.lessons.findIndex((l) => l.slug === lessonSlug)
  return { track, lesson: track.lessons[index], index }
}

export const totalLessons = tracks.reduce((sum, t) => sum + t.lessons.length, 0)
