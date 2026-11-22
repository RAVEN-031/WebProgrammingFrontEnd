// Thin fetch wrapper around the Express backend, proxied through Vite:
// /api/products -> http://localhost:3000/products

async function request(path, options = {}) {
  const res = await fetch(`/api${path}`, {
    headers: options.body ? { "Content-Type": "application/json" } : undefined,
    ...options,
  });

  if (!res.ok) {
    let message = `HTTP ${res.status}`;
    try {
      const data = await res.json();
      if (data?.message) message = data.message;
    } catch {
      // non-JSON error body; keep the HTTP status message
    }
    throw new Error(message);
  }

  if (res.status === 204) return null;
  return res.json();
}

export function getProducts() {
  return request("/products");
}

export function getProductById(id) {
  return request(`/products/${id}`);
}

export function createProduct(data) {
  return request("/products", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// The backend requires the id inside the PUT body as well.
export function updateProduct(id, data) {
  return request(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify({ id, ...data }),
  });
}

export function deleteProduct(id) {
  return request(`/products/${id}`, { method: "DELETE" });
}
