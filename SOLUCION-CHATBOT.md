# 🔧 Solución: Chatbot no funcionaba

## ❌ Problema Identificado

El chatbot no funcionaba en el servidor por **dos errores de configuración**:

### 1. CORS Incorrecto en `api/chat.php`

**Error:**
```php
header('Access-Control-Allow-Origin: https://portfolio.oksap.es');
```

**Problema:** Tu portfolio está en `https://oksap.es/portfolio-oksap/`, no en un subdominio.

**Solución:**
```php
header('Access-Control-Allow-Origin: https://oksap.es');
```

### 2. URL del Proxy Incorrecta en `geminiService.ts`

**Error:**
```typescript
const PROXY_URL = '/api/chat.php';
```

**Problema:** Con `base: '/portfolio-oksap/'` en Vite, la URL debe incluir el prefijo.

**Solución:**
```typescript
const PROXY_URL = '/portfolio-oksap/api/chat.php';
```

---

## ✅ Cambios Realizados

### Archivo: `public/api/chat.php`
- Cambiado CORS de `https://portfolio.oksap.es` → `https://oksap.es`

### Archivo: `src/services/geminiService.ts`
- Cambiada URL del proxy de `/api/chat.php` → `/portfolio-oksap/api/chat.php`

### Archivos Actualizados:
- ✅ Proyecto recompilado (`dist/`)
- ✅ ZIP actualizado (`portfolio-oksap-dist.zip`)
- ✅ Listo para subir de nuevo

---

## 🚀 Qué Hacer Ahora

### Opción 1: Reemplazar solo los archivos modificados (Rápido) ⚡

Si ya subiste el portfolio antes, solo necesitas actualizar:

**Con FileZilla:**
1. Conecta al servidor
2. Ve a `/public_html/portfolio-oksap/`
3. Sube estos archivos (sobrescribir):
   - `api/chat.php` (desde `dist/api/chat.php`)
   - `assets/index-CQr2ghA7.js` (desde `dist/assets/`)
   - `index.html` (desde `dist/index.html`)

**Con cPanel:**
1. Administrador de Archivos
2. Ve a `public_html/portfolio-oksap/`
3. Sube y sobrescribe los archivos mencionados

### Opción 2: Subir todo de nuevo (Recomendado) 🔄

Si prefieres asegurarte de que todo esté actualizado:

```bash
# Opción A: Script automático
./deploy.sh

# Opción B: FileZilla
# Sube todo el contenido de dist/ a portfolio-oksap/
```

---

## 🧪 Cómo Verificar que Funciona

1. **Accede a tu portfolio:**
   https://oksap.es/portfolio-oksap/

2. **Abre la consola del navegador:**
   - Presiona F12
   - Ve a la pestaña "Console"

3. **Abre el chatbot y envía un mensaje**

4. **Verifica en la pestaña "Network":**
   - Busca la petición a `chat.php`
   - Debe mostrar estado **200 OK** (no 404 o 403)
   - Debe tener una respuesta JSON con el mensaje

### Si hay errores:

**Error CORS:**
```
Access to fetch at '...' has been blocked by CORS policy
```
✅ **Solucionado** - El archivo `api/chat.php` ya tiene el CORS correcto

**Error 404:**
```
Failed to load resource: the server responded with a status of 404
```
→ Verifica que `api/chat.php` esté subido al servidor

**Error 403:**
```
Failed to load resource: the server responded with a status of 403
```
→ Verifica permisos del archivo (debe ser 644):
```bash
chmod 644 api/chat.php
```

---

## 📊 Resumen de URLs

| Contexto | URL del Chat API |
|----------|-----------------|
| **Local (dev)** | Llama directamente a Google Gemini |
| **Producción (build)** | `https://oksap.es/portfolio-oksap/api/chat.php` |

---

## 🔍 Para Depurar (si aún no funciona)

### 1. Verifica que el archivo PHP esté en el servidor:
```
URL: https://oksap.es/portfolio-oksap/api/chat.php
```
Si accedes directamente, debería dar error 405 (Method not allowed) - eso es correcto.

### 2. Verifica los logs de PHP:
- Desde cPanel → Errores
- O busca: `error_log` en la carpeta de tu portfolio

### 3. Prueba manual con curl:
```bash
curl -X POST https://oksap.es/portfolio-oksap/api/chat.php \
  -H "Content-Type: application/json" \
  -d '{"message":"Hola","systemInstruction":"Eres un asistente.","history":[]}'
```

Debería devolver una respuesta JSON de Gemini.

---

## 💡 Prevenir este Error en el Futuro

Cuando cambies la configuración de `base` en Vite, recuerda:

1. **Actualizar CORS en PHP** si cambias de dominio
2. **Actualizar URLs de API** en el código
3. **Recompilar y probar** antes de subir

---

## ✅ Estado Actual

- ✅ CORS configurado correctamente para `https://oksap.es`
- ✅ URL del proxy actualizada a `/portfolio-oksap/api/chat.php`
- ✅ Proyecto recompilado con los cambios
- ✅ Listo para desplegar

**Próximo paso:** Sube los archivos actualizados al servidor y prueba el chatbot.
