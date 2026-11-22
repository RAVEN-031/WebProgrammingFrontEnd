import { Link } from "react-router-dom";

import { btnEdit, btnDelete } from "../lib/styles.js";

function ProductCard({ product, onEdit, onDelete }) {
  return (
    <article className="rounded-[10px] border border-line bg-surface px-4 py-4">
      <p className="m-0 text-xs text-muted">ID: {product.id}</p>
      <h2 className="mb-1.5 mt-0.5 text-base leading-tight font-semibold">
        <Link
          to={`/products/${product.id}`}
          className="text-inherit no-underline hover:text-primary hover:underline"
        >
          {product.name}
        </Link>
      </h2>
      <p className="mb-3.5 text-[15px] font-semibold text-navy">
        Rp{product.price.toLocaleString("id-ID")}
      </p>
      <div className="flex gap-2">
        <button type="button" className={btnEdit} onClick={onEdit}>
          Edit
        </button>
        <button type="button" className={btnDelete} onClick={onDelete}>
          Hapus
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
