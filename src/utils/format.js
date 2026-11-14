const rupiah = new Intl.NumberFormat("id-ID");

export function formatRupiah(value) {
  return `Rp${rupiah.format(value)}`;
}
