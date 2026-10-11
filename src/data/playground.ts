import type { Bi } from './tracks'

export interface PlayBlock {
  id: string
  label: Bi
  code: string
  output: string
}

export interface PlayExample {
  id: string
  title: Bi
  goal: Bi
  blocks: PlayBlock[]
  solution: string[]
}

export const playExamples: PlayExample[] = [
  {
    id: 'sapa',
    title: { id: 'Menyapa Teman', en: 'Greet a Friend' },
    goal: {
      id: 'Susun blok agar Kuri menyapa lalu bertanya kabar.',
      en: 'Arrange the blocks so Kuri greets then asks how you are.',
    },
    blocks: [
      {
        id: 'a1',
        label: { id: 'Sapa: Halo!', en: 'Greet: Hello!' },
        code: 'print("Halo!")',
        output: 'Halo!',
      },
      {
        id: 'a2',
        label: { id: 'Tanya: Apa kabar?', en: 'Ask: How are you?' },
        code: 'print("Apa kabar?")',
        output: 'Apa kabar?',
      },
      {
        id: 'a3',
        label: { id: 'Ucap: Sampai jumpa', en: 'Say: See you' },
        code: 'print("Sampai jumpa")',
        output: 'Sampai jumpa',
      },
    ],
    solution: ['a1', 'a2'],
  },
  {
    id: 'hitung',
    title: { id: 'Hitung Sampai Tiga', en: 'Count to Three' },
    goal: {
      id: 'Urutkan angka dari satu sampai tiga.',
      en: 'Order the numbers from one to three.',
    },
    blocks: [
      { id: 'b2', label: { id: 'Tampilkan 2', en: 'Show 2' }, code: 'print(2)', output: '2' },
      { id: 'b1', label: { id: 'Tampilkan 1', en: 'Show 1' }, code: 'print(1)', output: '1' },
      { id: 'b3', label: { id: 'Tampilkan 3', en: 'Show 3' }, code: 'print(3)', output: '3' },
    ],
    solution: ['b1', 'b2', 'b3'],
  },
  {
    id: 'halaman',
    title: { id: 'Halaman Kecil', en: 'A Small Page' },
    goal: {
      id: 'Susun judul lalu paragraf untuk membuat halaman.',
      en: 'Arrange a heading then a paragraph to build a page.',
    },
    blocks: [
      {
        id: 'c1',
        label: { id: 'Judul: Halo', en: 'Heading: Hello' },
        code: '<h1>Halo</h1>',
        output: 'Halo',
      },
      {
        id: 'c2',
        label: { id: 'Paragraf sapaan', en: 'Greeting paragraph' },
        code: '<p>Selamat datang</p>',
        output: 'Selamat datang',
      },
      {
        id: 'c3',
        label: { id: 'Tombol kecil', en: 'Small button' },
        code: '<button>Klik</button>',
        output: '[ Klik ]',
      },
    ],
    solution: ['c1', 'c2'],
  },
]
