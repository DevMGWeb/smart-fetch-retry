# smart-fetch-retry

Una utilidad ligera para realizar peticiones HTTP con **reintentos automáticos** y soporte para Node.js y navegadores.  
Perfecto para manejar solicitudes poco confiables, como llamadas a APIs externas que pueden fallar temporalmente.

---

## ✨ Características

- ✅ Reintentos automáticos configurables  
- ✅ Delay personalizable entre cada intento  
- ✅ Compatible con **fetch nativo** y con [`node-fetch`](https://www.npmjs.com/package/node-fetch) en Node.js  
- ✅ Manejo de errores detallado  
- ✅ Fácil de usar con `async/await`  

---

## 📦 Instalación

```bash
npm install smart-fetch-retry
```

> **Nota:** En Node.js 16+ se requiere instalar `node-fetch` si no existe soporte nativo de `fetch`:
```bash
npm install node-fetch
```

---

## 🚀 Uso

### Ejemplo básico
```javascript
import { smartFetchRetry } from "smart-fetch-retry";

const url = "https://api.escuelajs.co/api/v1/products";

async function main() {
  try {
    const response = await smartFetchRetry(url, { method: "GET" }, 3, 1500);
    const data = await response.json();
    console.log("Datos recibidos:", data);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
```

---

## ⚙️ Parámetros

| Parámetro  | Tipo      | Por defecto | Descripción                                         |
|------------|-----------|-------------|-----------------------------------------------------|
| `url`      | `string`  | **Requerido** | URL de la petición.                                |
| `options`  | `object`  | `{}`        | Opciones para fetch (`method`, `headers`, `body`). |
| `retries`  | `number`  | `3`         | Número de intentos antes de fallar.                |
| `delay`    | `number`  | `1000` ms   | Tiempo de espera entre cada intento (en ms).       |

---

## 🛠 Ejemplo con POST y Headers
```javascript
const response = await smartFetchRetry(
  "https://api.example.com/data",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "John" }),
  },
  5,
  2000
);

const data = await response.json();
console.log(data);
```

---

## ❗ Manejo de errores
Si después de todos los reintentos la solicitud sigue fallando, la función lanza un error:

```javascript
try {
  await smartFetchRetry("https://api.fake.com/fail", {}, 2, 1000);
} catch (err) {
  console.error(err.message); // "Fallo después de 2 intentos: ..."
}
```

---

## 🧩 Próximas mejoras
- [ ] Retraso exponencial para los reintentos.
- [ ] Cancelación con `AbortController`.
- [ ] Tipos para TypeScript.
- [ ] Mejor manejo de logs en entorno de desarrollo.
- [ ] Soporte para timeout configurable.
- [ ] Mejor manejo de errores específicos.
---

## 📄 Licencia
MIT © 2025 [Miguel Ignacio González](https://github.com/TU-USUARIO)
