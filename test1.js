import { smartFetchRetry } from "./index.js";

const url = "https://api.escuelajs.co/api/v1/products/14";

smartFetchRetry(url, { method: "GET" }, 3, 1500)
  .then(res => res.json())
  .then(data => console.log("Datos recibidos:", data))
  .catch(err => console.error("Error:", err.message));