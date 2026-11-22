import { useEffect, useState } from "react";

import {
  btn,
  btnPrimary,
  fieldInput,
  fieldLabel,
  fieldHelper,
  fieldHelperError,
  modalOverlay,
  modalPanel,
  modalTitle,
  modalSubtitle,
  modalClose,
} from "../lib/styles.js";

function EditProductModal({ product, onClose, onSubmit }) {
  const [nama, setNama] = useState(product.nama);
  const [harga, setHarga] = useState(String(product.harga));
  const [error, setError] = useState(null);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  function handleSubmit(event) {
    event.preventDefault();

    const trimmed = nama.trim();
    const value = Number(harga);

    if (!trimmed) {
      setError("Nama produk harus diisi.");
      return;
    }

    if (!Number.isFinite(value) || value <= 0) {
      setError("Harga harus lebih dari 0.");
      return;
    }

    onSubmit({ nama: trimmed, harga: value });
  }

  return (
    <div className={modalOverlay}>
      <div className={modalPanel}>
        <header className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className={modalTitle}>Edit Produk</h2>
            <p className={modalSubtitle}>Perbarui informasi produk yang dipilih.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Tutup" className={modalClose}>
            ×
          </button>
        </header>

        <form className="grid gap-3.5" onSubmit={handleSubmit} noValidate>
          <p className="m-0 text-xs text-muted">ID: {product.id}</p>

          <label className="grid gap-1.5">
            <span className={fieldLabel}>Nama Produk</span>
            <input
              type="text"
              value={nama}
              onChange={(event) => setNama(event.target.value)}
              placeholder="Contoh: Pulpen"
              autoFocus
              className={fieldInput}
            />
          </label>

          <label className="grid gap-1.5">
            <span className={fieldLabel}>Harga (Rp)</span>
            <input
              type="number"
              value={harga}
              onChange={(event) => setHarga(event.target.value)}
              placeholder="Contoh: 5000"
              inputMode="numeric"
              className={fieldInput}
            />
            <span className={error ? fieldHelperError : fieldHelper}>
              {error ?? "Harga harus lebih dari 0."}
            </span>
          </label>

          <footer className="mt-1 flex justify-end gap-2">
            <button type="button" className={btn} onClick={onClose}>
              Batal
            </button>
            <button type="submit" className={btnPrimary}>
              Simpan Perubahan
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}

export default EditProductModal;
