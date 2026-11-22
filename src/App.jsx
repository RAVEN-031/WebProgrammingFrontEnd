import { useEffect, useState } from "react";

import * as api from "./api/products.js";
import AddProductModal from "./components/AddProductModal.jsx";
import DeleteProductModal from "./components/DeleteProductModal.jsx";
import EditProductModal from "./components/EditProductModal.jsx";
import ProductCard from "./components/ProductCard.jsx";
import { btnPrimary } from "./lib/styles.js";
import "./index.css";

function App() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [loadError, setLoadError] = useState(null);
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(null);

  useEffect(() => {
    let cancelled = false;

    api
      .getProducts()
      .then((data) => {
        if (cancelled) return;
        setProducts(data);
        setStatus("ready");
      })
      .catch((error) => {
        if (cancelled) return;
        setLoadError(error.message);
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const keyword = query.trim().toLowerCase();
  const visible = keyword
    ? products.filter((product) => product.name.toLowerCase().includes(keyword))
    : products;

  async function handleAdd(data) {
    const created = await api.createProduct(data);
    setProducts((current) => [...current, created]);
    setModal(null);
  }

  async function handleEdit(id, data) {
    const updated = await api.updateProduct(id, data);
    setProducts((current) =>
      current.map((product) => (product.id === id ? updated : product)),
    );
    setModal(null);
  }

  async function handleDelete(id) {
    await api.deleteProduct(id);
    setProducts((current) => current.filter((product) => product.id !== id));
    setModal(null);
  }

  const selected =
    modal && modal.type !== "add"
      ? products.find((product) => product.id === modal.id)
      : null;

  if (status === "loading") {
    return (
      <main className="mx-auto w-full max-w-[1080px] px-6 py-10">
        <p className="m-0 py-12 text-center text-muted">Memuat produk...</p>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="mx-auto w-full max-w-[1080px] px-6 py-10">
        <p className="m-0 py-12 text-center text-danger">
          Gagal memuat produk: {loadError}
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-[1080px] px-6 py-10">
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="mb-1 text-2xl leading-tight font-semibold">Manajemen Produk</h1>
          <p className="m-0 text-sm text-muted">
            Kelola daftar produk dan harga dalam satu tempat.
          </p>
        </div>
        <button type="button" className={btnPrimary} onClick={() => setModal({ type: "add" })}>
          + Tambah Produk
        </button>
      </header>

      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="relative max-w-[22rem] flex-1">
          <svg
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted"
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
            className="w-full rounded-lg border border-line bg-surface py-2.5 pr-3 pl-9 text-ink placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary"
          />
        </div>
        <p className="m-0 text-sm whitespace-nowrap text-muted">{visible.length} produk</p>
      </div>

      {visible.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
        <p className="m-0 py-12 text-center text-muted">Tidak ada produk yang cocok.</p>
      )}

      <p className="mt-5 mb-0 text-[13px] text-muted">
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
