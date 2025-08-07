# smart-fetch-retry

Una utilidad ligera para realizar peticiones HTTP con **reintentos automáticos** y soporte para Node.js y navegadores.  
Perfecto para manejar solicitudes poco confiables, como llamadas a APIs externas que pueden fallar temporalmente.

---

## ✨ Características

- ✅ Reintentos automáticos configurables  
- ✅ Delay personalizable entre cada intento  
- ✅ Compatible con **fetch nativo** y con [`node-fetch`](https://www.npmjs.com/package/node-fetch) en Node.js  
- ✅ Manejo de errores detallado  
- ✅ Fácil de usar con `async/await` y también con .then()
- ✅ Timeout configurable para cancelar peticiones automáticamente  (nuevo en v1.1.0)
- ✅ Cancelación de peticiones con `AbortController` (nuevo en v1.1.0)

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
    const { promise } = smartFetchRetry(url, { method: "GET" }, 3, 1500, 5000);
    const response = await promise;
    const data = await response.json();
    console.log("Datos recibidos:", data);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
```

### ⏱ Timeout automático
El último parámetro define el tiempo máximo (en milisegundos) antes de cancelar automáticamente la petición:

```javascript
const { promise } = smartFetchRetry("https://api.example.com/data", {}, 3, 1500, 3000);
```

### 🛑 Cancelación manual
Puedes cancelar manualmente la petición usando controller.abort():
```javascript
const { promise, controller } = smartFetchRetry("https://api.example.com/data", {}, 3, 1500, 5000);

promise
  .then(res => res.json())
  .then(data => console.log("Datos:", data))
  .catch(err => console.error("Error:", err.message));

setTimeout(() => {
  controller.abort();
  console.log("Petición cancelada manualmente");
}, 2000);
```

---

## ⚙️ Parámetros

| Parámetro  | Tipo      | Por defecto | Descripción                                         |
|------------|-----------|-------------|-----------------------------------------------------|
| `url`      | `string`  | **Requerido** | URL de la petición.                                |
| `options`  | `object`  | `{}`        | Opciones para fetch (`method`, `headers`, `body`). |
| `retries`  | `number`  | `3`         | Número de intentos antes de fallar.                |
| `delay`    | `number`  | `1000` ms   | Tiempo de espera entre cada intento (en ms).       |
| `timeout`  | `number`  | `5000` ms   | Tiempo máximo antes de cancelar la petición automáticamente. |

---

## 🛠 Ejemplo con POST y Headers
```javascript
const { promise } = smartFetchRetry(
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

## ❗ Manejo de errores
Si después de todos los reintentos la solicitud sigue fallando, la función lanza un error:

```javascript
try {
  const { promise } = smartFetchRetry("https://api.fake.com/fail", {}, 2, 1000);
  await promise;
} catch (err) {
  console.error(err.message); // "Fallo después de 2 intentos: ..."
}
```

---

## ✅ Mejoras implementadas
- [x] Cancelación con `AbortController` (implementado en v1.1.0).
- [x] Soporte para timeout configurable (implementado en v1.1.0).
---

## 🧩 Próximas mejoras
- [ ] Retraso exponencial para los reintentos.
- [ ] Tipos para TypeScript.
- [ ] Mejor manejo de logs en entorno de desarrollo.
- [ ] Mejor manejo de errores específicos.
---


## 📄 Licencia
MIT © 2025 [Miguel Ignacio González](https://github.com/DevMGWeb)
