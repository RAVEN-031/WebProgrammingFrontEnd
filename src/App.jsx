import { useState } from "react";

import ProductCard from "./components/ProductCard.jsx";
import "./App.css";

const products = [
  { id: 1, nama: "Pulpen", harga: 5000 },
  { id: 2, nama: "Buku Tulis", harga: 12000 },
  { id: 3, nama: "Spidol", harga: 8000 },
  { id: 4, nama: "Penggaris", harga: 6000 },
  { id: 5, nama: "Penghapus", harga: 3000 },
];

function App() {
  const [query, setQuery] = useState("");

  const keyword = query.trim().toLowerCase();
  const visible = keyword
    ? products.filter((product) => product.nama.toLowerCase().includes(keyword))
    : products;

  return (
    <main className="app">
      <header className="app__header">
        <div>
          <h1 className="app__title">Manajemen Produk</h1>
          <p className="app__subtitle">Kelola daftar produk dan harga dalam satu tempat.</p>
        </div>
        <button type="button" className="btn btn--primary">
          + Tambah Produk
        </button>
      </header>

      <div className="toolbar">
        <div className="search">
          <svg
            className="search__icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari nama produk..."
            aria-label="Cari nama produk"
          />
        </div>
        <p className="count">{visible.length} produk</p>
      </div>

      {visible.length > 0 ? (
        <div className="grid">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="empty">Tidak ada produk yang cocok.</p>
      )}

      <p className="footer">
        Menampilkan {visible.length} dari {products.length} produk
      </p>
    </main>
  );
}

export default App;
