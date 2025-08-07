import fetchPkg from "node-fetch";

/**
 * smartFetchRetry
 * Realiza una petición fetch con reintentos automáticos y delay entre ellos.
 * Compatible con navegadores y Node.js (Node 16+ con node-fetch).
 *
 * @param {string} url - URL a la que se realizará la petición.
 * @param {object} [options={}] - Opciones para el fetch (método, headers, body, etc.).
 * @param {number} [retries=3] - Número de intentos antes de fallar.
 * @param {number} [delay=1000] - Tiempo de espera entre reintentos (en milisegundos).
 * @param {number} [timeout=5000] - Tiempo máximo antes de cancelar automáticamente.
 * @returns {{Promise<Response>, controller: AbortController}} - Retorna la respuesta de fetch.
 */
export function smartFetchRetry(url, options = {}, retries = 3, delay = 1000, timeout = 5000) {
  const controller = new AbortController();
  const fetchFn = globalThis.fetch || fetchPkg; // Usa fetch nativo si existe, sino node-fetch

  const promise = (async () => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      const timer = setTimeout(() => controller.abort(), timeout);

      try {
        const response = await fetchFn(url, { ...options, signal: controller.signal });
        clearTimeout(timer); // Limpiamos el timeout si la petición fue exitosa

        if (!response.ok) {
          throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
        }

        return response; // Si la respuesta es correcta, retornamos
      } catch (error) {
        clearTimeout(timer); // Limpiamos el timeout en caso de error

        if (error.name === "AbortError") {
          throw new Error("Petición cancelada manualmente");
        }

        if (attempt < retries) {
          console.warn(`Intento ${attempt} fallido. Reintentando en ${delay}ms...`, error);
          await new Promise(res => setTimeout(res, delay));
        } else {
          throw new Error(`Fallo después de ${retries} intentos: ${error.message}`);
        }
      }
    }
  })();

  return { promise, controller };
}
