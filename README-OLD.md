# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Despliegue en Raiola (Apache)

Este proyecto es una SPA con Vite + React. Puedes publicarlo como subcarpeta (p. ej. `/portfolio-oksap/`) o en un subdominio (p. ej. `chat.tu-dominio.com`).

1) Preparar build

- En local (macOS):
```bash
npm install
# Opción rápida (clave expuesta en cliente)
export VITE_GEMINI_API_KEY="TU_API_KEY"

# Si publicas en subcarpeta p. ej. /portfolio-oksap/
npm run build -- --base=/portfolio-oksap/

# Si va a la raíz de un sitio o a un subdominio dedicado
# npm run build
```

- El resultado quedará en `dist/`.

2) Subir a Raiola (Apache)

- Subcarpeta: crea `public_html/portfolio-oksap/` y sube el contenido de `dist/` dentro.
- Subdominio: crea el subdominio en cPanel y sube `dist/` a su DocumentRoot.

3) Reglas para SPA

- Este repo incluye `public/.htaccess`; Vite lo copiará a `dist/.htaccess`.
- Asegúrate de subir también los archivos ocultos (activar “mostrar ocultos” en el gestor de archivos/FTP).
- Ese `.htaccess` hace fallback de rutas a `index.html` para que el router funcione.

4) URLs resultantes

- Subcarpeta: `https://tu-dominio.com/portfolio-oksap/`
- Subdominio: `https://chat.tu-dominio.com/` (o el que definas)

5) Seguridad de la API Key

- La opción rápida usa `VITE_GEMINI_API_KEY` y expone la clave en el bundle.
- Recomendado: mover la llamada a Gemini a un endpoint del servidor (PHP/Node) y consumirlo desde el front. Si lo necesitas, podemos crear un `proxy.php` y adaptar `src/services/geminiService.ts`.

## Environment variables

This project expects an API key for the Gemini/GenAI client. Create a `.env` file in the project root (do not commit it) or set the environment variable before starting the dev server.

1. Copy the example:

```bash
cp .env.example .env
```

2. Edit `.env` and set `API_KEY` (preferred, server-side) or `GEMINI_API_KEY`.

For local quick tests you can export it in your shell:

```bash
export API_KEY="tu_api_key_aqui"
npm run dev
```

If you must expose the key to the client (not recommended), use `VITE_GEMINI_API_KEY` in `.env` and access it from the client as `import.meta.env.VITE_GEMINI_API_KEY`.

