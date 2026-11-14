import { formatRupiah } from "../utils/format.js";

function ProductCard({ product, onEdit, onDelete }) {
  return (
    <article className="card">
      <p className="card__id">ID: {product.id}</p>
      <h2 className="card__name">{product.nama}</h2>
      <p className="card__price">{formatRupiah(product.harga)}</p>
      <div className="card__actions">
        <button type="button" className="btn btn--edit" onClick={onEdit}>
          Edit
        </button>
        <button type="button" className="btn btn--danger" onClick={onDelete}>
          Hapus
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
