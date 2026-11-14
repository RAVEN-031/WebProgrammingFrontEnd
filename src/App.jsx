import { useState } from "react";

import AddProductModal from "./components/AddProductModal.jsx";
import DeleteProductModal from "./components/DeleteProductModal.jsx";
import EditProductModal from "./components/EditProductModal.jsx";
import ProductCard from "./components/ProductCard.jsx";
import "./App.css";

const SEED_PRODUCTS = [
  { id: 1, nama: "Pulpen", harga: 5000 },
  { id: 2, nama: "Buku Tulis", harga: 12000 },
  { id: 3, nama: "Spidol", harga: 8000 },
  { id: 4, nama: "Penggaris", harga: 6000 },
  { id: 5, nama: "Penghapus", harga: 3000 },
];

function App() {
  const [products, setProducts] = useState(SEED_PRODUCTS);
  const [nextId, setNextId] = useState(SEED_PRODUCTS.length + 1);
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(null);

  const keyword = query.trim().toLowerCase();
  const visible = keyword
    ? products.filter((product) => product.nama.toLowerCase().includes(keyword))
    : products;

  function handleAdd(data) {
    setProducts((current) => [...current, { id: nextId, ...data }]);
    setNextId((current) => current + 1);
    setModal(null);
  }

  function handleDelete(id) {
    setProducts((current) => current.filter((product) => product.id !== id));
    setModal(null);
  }

  function handleEdit(id, data) {
    setProducts((current) =>
      current.map((product) => (product.id === id ? { ...product, ...data } : product)),
    );
    setModal(null);
  }

  const selected =
    modal && modal.type !== "add"
      ? products.find((product) => product.id === modal.id)
      : null;

  return (
    <main className="app">
      <header className="app__header">
        <div>
          <h1 className="app__title">Manajemen Produk</h1>
          <p className="app__subtitle">Kelola daftar produk dan harga dalam satu tempat.</p>
        </div>
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => setModal({ type: "add" })}
        >
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
            <ProductCard
              key={product.id}
              product={product}
              onEdit={() => setModal({ type: "edit", id: product.id })}
              onDelete={() => setModal({ type: "delete", id: product.id })}
            />
          ))}
        </div>
      ) : (
        <p className="empty">Tidak ada produk yang cocok.</p>
      )}

      <p className="footer">
        Menampilkan {visible.length} dari {products.length} produk
      </p>

      {modal?.type === "add" && (
        <AddProductModal onClose={() => setModal(null)} onSubmit={handleAdd} />
      )}

      {modal?.type === "edit" && selected && (
        <EditProductModal
          key={selected.id}
          product={selected}
          onClose={() => setModal(null)}
          onSubmit={(data) => handleEdit(selected.id, data)}
        />
      )}

      {modal?.type === "delete" && selected && (
        <DeleteProductModal
          product={selected}
          onClose={() => setModal(null)}
          onConfirm={() => handleDelete(selected.id)}
        />
      )}
    </main>
  );
}

export default App;
