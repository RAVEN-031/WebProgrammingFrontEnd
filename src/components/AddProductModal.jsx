import { useEffect, useState } from "react";

function AddProductModal({ onClose, onSubmit }) {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
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
    <div className="overlay">
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="add-title">
        <header className="modal__header">
          <div>
            <h2 className="modal__title" id="add-title">
              Tambah Produk
            </h2>
            <p className="modal__subtitle">Masukkan informasi produk baru.</p>
          </div>
          <button type="button" className="modal__close" onClick={onClose} aria-label="Tutup">
            ×
          </button>
        </header>

        <form className="modal__form" onSubmit={handleSubmit} noValidate>
          <label className="field">
            <span className="field__label">Nama Produk</span>
            <input
              type="text"
              value={nama}
              onChange={(event) => setNama(event.target.value)}
              placeholder="Contoh: Pulpen"
              autoFocus
            />
          </label>

          <label className="field">
            <span className="field__label">Harga (Rp)</span>
            <input
              type="number"
              value={harga}
              onChange={(event) => setHarga(event.target.value)}
              placeholder="Contoh: 5000"
              inputMode="numeric"
            />
            <span className={error ? "field__helper field__helper--error" : "field__helper"}>
              {error ?? "Harga harus lebih dari 0."}
            </span>
          </label>

          <footer className="modal__actions">
            <button type="button" className="btn" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn btn--primary">
              Simpan Produk
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}

export default AddProductModal;
