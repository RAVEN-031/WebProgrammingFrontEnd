import { useEffect, useState } from "react";

import { btn, btnSolidDanger, modalOverlay, modalPanel, modalTitle, modalSubtitle } from "../lib/styles.js";

function DeleteProductModal({ product, onClose, onConfirm }) {
  const [error, setError] = useState(null);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  async function handleConfirm() {
    try {
      await onConfirm();
    } catch (backendError) {
      setError(backendError.message);
    }
  }

  return (
    <div className={modalOverlay}>
      <div className={modalPanel}>
        <header className="mb-4">
          <span className="mb-2.5 grid h-9 w-9 place-items-center rounded-lg bg-danger-bg text-danger">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M8 6V4h8v2" />
              <path d="M19 6l-1 14H6L5 6" />
              <path d="M10 11v5M14 11v5" />
            </svg>
          </span>
          <h2 className={modalTitle}>Hapus Produk?</h2>
          <p className={modalSubtitle}>Produk yang dihapus tidak dapat dikembalikan.</p>
        </header>

        <div className="mb-1 rounded-lg border border-line bg-page px-4 py-3">
          <p className="m-0 text-xs text-muted">ID: {product.id}</p>
          <p className="mt-0.5 mb-0.5 text-[15px] font-semibold">{product.name}</p>
          <p className="m-0 text-sm font-semibold text-navy">
            Rp{product.price.toLocaleString("id-ID")}
          </p>
        </div>

        {error && (
          <p className="mb-2 text-xs text-danger">Gagal menghapus: {error}</p>
        )}

        <footer className="mt-1 flex justify-end gap-2">
          <button type="button" className={btn} onClick={onClose}>
            Batal
          </button>
          <button type="button" onClick={handleConfirm} className={btnSolidDanger}>
            Hapus Produk
          </button>
        </footer>
      </div>
    </div>
  );
}

export default DeleteProductModal;
