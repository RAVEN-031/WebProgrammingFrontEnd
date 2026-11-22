import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getProductById } from "../api/products.js";
import { btn } from "../lib/styles.js";

function ProductDetailPage() {
  const { id } = useParams();
  const [status, setStatus] = useState("loading"); // loading | ready | not-found | error
  const [product, setProduct] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [loadedId, setLoadedId] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const data = await getProductById(id);
        if (cancelled) return;
        setProduct(data);
        setStatus("ready");
        setLoadedId(id);
      } catch (error) {
        if (cancelled) return;
        setLoadError(error.message);
        setStatus(error.message.includes("tidak ditemukan") ? "not-found" : "error");
        setLoadedId(id);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [id]);

  // show a fresh loading state for an id we have not loaded yet
  const showLoading = status !== "loading" && loadedId !== id;

  if (status === "loading" || showLoading) {
    return (
      <main className="mx-auto w-full max-w-[1080px] px-6 py-10">
        <p className="m-0 py-12 text-center text-muted">Memuat produk...</p>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="mx-auto w-full max-w-[1080px] px-6 py-10">
        <p className="m-0 py-12 text-center text-danger">Gagal memuat produk: {loadError}</p>
        <div className="text-center">
          <Link to="/" className={btn}>
            Kembali ke Daftar Produk
          </Link>
        </div>
      </main>
    );
  }

  if (status === "not-found") {
    return (
      <main className="mx-auto w-full max-w-[1080px] px-6 py-10">
        <p className="m-0 py-12 text-center text-muted">
          Produk dengan ID {id} tidak ditemukan.
        </p>
        <div className="text-center">
          <Link to="/" className={btn}>
            Kembali ke Daftar Produk
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-[1080px] px-6 py-10">
      <Link to="/" className="text-sm text-primary hover:underline">
        ← Kembali ke Daftar Produk
      </Link>

      <div className="mx-auto mt-6 w-full max-w-[26rem] rounded-[10px] border border-line bg-surface px-5 py-6">
        <p className="m-0 text-xs text-muted">ID: {product.id}</p>
        <h1 className="mb-1 mt-0.5 text-xl leading-tight font-semibold">{product.name}</h1>
        <p className="mt-3 mb-0 text-2xl font-semibold text-navy">
          Rp{product.price.toLocaleString("id-ID")}
        </p>
      </div>
    </main>
  );
}

export default ProductDetailPage;
