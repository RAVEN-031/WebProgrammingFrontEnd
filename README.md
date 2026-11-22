# Frontend Assignment — Manajemen Produk

Aplikasi frontend React untuk pengelolaan produk (tambah, lihat, edit, hapus) dengan
React Router, Tailwind CSS, dan data yang tersimpan melalui API backend Express.

## Fitur

- **Daftar produk** — grid kartu dengan pencarian nama, counter jumlah, dan footer
  `Menampilkan n dari n produk`.
- **Tambah / Edit / Hapus** — tiga modal dengan validasi (nama wajib diisi, harga > 0),
  Escape untuk menutup, dan pesan error dari backend ditampilkan di dalam modal.
- **Halaman detail** `/products/:id` — data sesuai parameter URL, tautan kembali ke
  daftar produk, dan pesan jelas jika produk tidak ditemukan (404 dari backend).
- **Halaman 404** — catch-all untuk URL yang tidak terdaftar, dengan tautan kembali.
- **Data dari backend** — seluruh operasi CRUD memanggil API; perubahan tersimpan
  di database dan tetap ada setelah halaman dimuat ulang.

## Menjalankan

Backend harus berjalan lebih dulu di `http://localhost:3000`
(lihat repositori `BackEndAssignment`), kemudian:

```bash
npm install
npm run dev      # http://localhost:5173
```

Permintaan ke `/api/*` di-proxy oleh Vite ke `localhost:3000`
(konfigurasi di `vite.config.js`), sehingga tidak ada perubahan CORS di backend.

Skrip lain:

```bash
npm run build    # bundle produksi ke dist/
npm run preview  # sajikan dist/ secara lokal
npm run lint     # oxlint
```

## Struktur

```
src/
├── api/
│   └── products.js              # wrapper fetch untuk endpoint /products
├── components/
│   ├── AddProductModal.jsx      # modal tambah
│   ├── DeleteProductModal.jsx   # modal konfirmasi hapus
│   ├── EditProductModal.jsx     # modal edit (ID read-only, terisi otomatis)
│   ├── NotFoundPage.jsx         # halaman 404 (route *)
│   ├── ProductCard.jsx          # kartu produk; nama = link ke detail
│   └── ProductDetailPage.jsx    # halaman /products/:id
├── lib/
│   └── styles.js                # fragmen kelas Tailwind yang dipakai bersama
├── App.jsx                      # halaman utama: daftar, pencarian, modal
├── main.jsx                     # entry; definisi semua route
└── index.css                    # @theme Tailwind (palet warna) + style dasar
```

## Route

| Path             | Halaman                          |
| ---------------- | -------------------------------- |
| `/`              | Daftar produk (CRUD)             |
| `/products/:id`  | Detail produk                    |
| `*`              | 404 — halaman tidak ditemukan    |

## API

| Method   | Endpoint        | Keterangan                                |
| -------- | --------------- | ----------------------------------------- |
| `GET`    | `/products`     | Daftar produk                              |
| `GET`    | `/products/:id` | Detail; 404 jika tidak ada                 |
| `POST`   | `/products`     | Buat produk                                |
| `PUT`    | `/products/:id` | Ubah produk — **`id` wajib ada di body**   |
| `DELETE` | `/products/:id` | Hapus produk (204)                         |

Bentuk data: `{ "id": number, "name": string, "price": number }` — harga adalah
bilangan bulat rupiah, ditampilkan dengan pemisah ribuan (`Rp9.500`).

## Teknologi

- React 19 + Vite 8
- react-router-dom 7
- Tailwind CSS 4 (plugin `@tailwindcss/vite`, tanpa `tailwind.config.js`)
- oxlint
