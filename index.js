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
 * @returns {Promise<Response>} - Retorna la respuesta de fetch.
 */
export async function smartFetchRetry(url, options = {}, retries = 3, delay = 1000) {
  const fetchFn = globalThis.fetch || fetchPkg; // Usa fetch nativo si existe, sino node-fetch

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetchFn(url, options);

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      }

      return response; // Si la respuesta es correcta, retornamos
    } catch (error) {
      if (attempt < retries) {
        console.warn(`Intento ${attempt} fallido. Reintentando en ${delay}ms...`, error);
        await new Promise(res => setTimeout(res, delay));
      } else {
        throw new Error(`Fallo después de ${retries} intentos: ${error.message}`);
      }
    }
  }
}
