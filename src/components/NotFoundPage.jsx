import { Link } from "react-router-dom";

import { btn } from "../lib/styles.js";

function NotFoundPage() {
  return (
    <main className="mx-auto grid min-h-screen w-full max-w-[1080px] place-items-center px-6 py-10">
      <div className="text-center">
        <h1 className="mb-2 text-4xl font-semibold text-navy">404</h1>
        <p className="mb-6 m-0 text-muted">
          Halaman tidak ditemukan. Periksa kembali URL atau kembali ke daftar produk.
        </p>
        <div className="flex justify-center gap-2">
          <Link to="/" className={btn}>
            Ke Halaman Utama
          </Link>
          <Link to="/" className={btn}>
            Ke Daftar Produk
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFoundPage;
