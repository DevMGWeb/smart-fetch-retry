# Changelog
Todas las modificaciones notables de este proyecto serán documentadas en este archivo.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/)  
y este proyecto se adhiere a [Semantic Versioning](https://semver.org/).

---

## [1.1.0] - 2025-08-06
### 🚀 Añadido
- Soporte para `timeout` configurable para cancelar peticiones automáticamente.
- Cancelación manual de peticiones usando `AbortController`.

### 🛠 Cambiado
- Ejemplos actualizados en el README para reflejar el nuevo soporte de cancelación y timeout.

[Ver en npm](https://www.npmjs.com/package/smart-fetch-retry/v/1.1.0)
---

## [1.0.0] - 2025-08-06
### 🎉 Inicial
- Publicación inicial de [`smart-fetch-retry`](https://www.npmjs.com/package/smart-fetch-retry/v/1.0.0).
- Reintentos automáticos configurables.
- Delay personalizable entre intentos.
- Compatible con **fetch** nativo y [`node-fetch`](https://www.npmjs.com/package/node-fetch).
- Manejo de errores detallado.
- Fácil de usar con `async/await`.