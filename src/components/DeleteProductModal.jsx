import { useEffect } from "react";

import { formatRupiah } from "../utils/format.js";

function DeleteProductModal({ product, onClose, onConfirm }) {
  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="overlay">
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="delete-title">
        <header className="modal__header">
          <div>
            <span className="modal__icon modal__icon--danger" aria-hidden="true">
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
            <h2 className="modal__title" id="delete-title">
              Hapus Produk?
            </h2>
            <p className="modal__subtitle">
              Produk yang dihapus tidak dapat dikembalikan.
            </p>
          </div>
        </header>

        <div className="summary">
          <p className="summary__id">ID: {product.id}</p>
          <p className="summary__name">{product.nama}</p>
          <p className="summary__price">{formatRupiah(product.harga)}</p>
        </div>

        <footer className="modal__actions">
          <button type="button" className="btn" onClick={onClose}>
            Batal
          </button>
          <button type="button" className="btn btn--primary btn--danger-solid" onClick={onConfirm}>
            Hapus Produk
          </button>
        </footer>
      </div>
    </div>
  );
}

export default DeleteProductModal;
