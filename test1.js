import { smartFetchRetry } from "./index.js";

const url = "https://api.escuelajs.co/api/v1/products/74";

async function main() {
  const { promise, controller } = smartFetchRetry(url, { method: "GET" }, 3, 1500, 5000);

  try {
    // Cancelación automática si pasa un tiempo
    const timeoutId = setTimeout(() => {
      controller.abort();
      console.log("Petición cancelada manualmente después de 5s");
    }, 5000);

    const response = await promise; // Espera la respuesta
    clearTimeout(timeoutId); // Si la respuesta llega a tiempo, se limpia el timeout

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Datos recibidos:", data);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();