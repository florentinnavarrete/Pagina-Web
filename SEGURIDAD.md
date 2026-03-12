# 🔒 NOTAS DE SEGURIDAD Y PRODUCCIÓN

## ⚠️ IMPORTANTE: Tu API Key está expuesta

El archivo `api/chat.php` contiene tu clave de API de Google Gemini:
```php
$apiKey = 'AIzaSyCrsLClAKsLycJDhgbu_3XVoPgJ66Ug_do';
```

### Recomendaciones de Seguridad:

#### Opción 1: Usar variables de entorno en PHP (Recomendado)

1. Crea un archivo `api/.env.php` (NO subir a Git):
```php
<?php
return [
    'GEMINI_API_KEY' => 'AIzaSyCrsLClAKsLycJDhgbu_3XVoPgJ66Ug_do'
];
```

2. Modifica `api/chat.php`:
```php
$config = require_once __DIR__ . '/.env.php';
$apiKey = $config['GEMINI_API_KEY'];
```

3. Protege el archivo .env.php con `.htaccess`:
```apache
<Files ".env.php">
    Order allow,deny
    Deny from all
</Files>
```

#### Opción 2: Limitar uso con cuotas

En tu cuenta de Google Cloud:
1. Ve a https://makersuite.google.com/app/apikey
2. Configura límites de cuota diarios
3. Habilita alertas de uso

#### Opción 3: Restringir la API Key por dominio

En Google Cloud Console:
1. Restricciones de HTTP → Dominios permitidos
2. Añade: `oksap.es`

---

## 🔐 Configuración de Permisos en el Servidor

Después de subir los archivos, verifica los permisos:

```bash
# Permisos recomendados:
Carpetas: 755
Archivos: 644
PHP: 644 (o 600 si quieres más seguridad)
.htaccess: 644
```

Desde cPanel → Administrador de Archivos:
- Click derecho en archivo → Permisos
- O usa el selector de permisos

---

## 🌐 Verificar HTTPS

Tu sitio debe cargar con HTTPS. Si ves advertencias:
1. Verifica que Raiola tenga SSL instalado (Let's Encrypt)
2. En cPanel → SSL/TLS Status
3. Forzar HTTPS en `.htaccess` principal:

```apache
# Forzar HTTPS (añadir en /public_html/.htaccess)
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>
```

---

## 📊 Monitoreo y Logs

### Ver logs de errores PHP:
1. cPanel → Errores
2. O busca: `/home/vbscsuxy/logs/error_log`

### Monitorear uso de API:
1. Google Cloud Console → Gemini API
2. Revisa métricas de uso
3. Configura alertas si superas X requests/día

---

## 🚫 Archivos que NO deben ser accesibles

Verifica que estos NO sean accesibles desde el navegador:

❌ `https://oksap.es/portfolio-oksap/.env` (si lo usas)
❌ `https://oksap.es/portfolio-oksap/package.json`
❌ `https://oksap.es/portfolio-oksap/.git/` (no debería existir)

Si son accesibles, agrega a `.htaccess`:
```apache
<FilesMatch "^\.env|package\.json|\.git">
    Order allow,deny
    Deny from all
</FilesMatch>
```

---

## 🔄 Actualización Segura del API Key

Si necesitas cambiar la clave:

1. **Opción A - Recompilar (más seguro):**
   ```bash
   # Edita .env local
   nano .env
   # Cambia GEMINI_API_KEY
   
   # Recompila
   npm run build -- --base=/portfolio-oksap/
   
   # Sube de nuevo
   ./deploy.sh
   ```

2. **Opción B - Editar en servidor (rápido):**
   - Edita `api/chat.php` directamente en cPanel
   - O usa FileZilla para editarlo

---

## 📈 Optimizaciones de Rendimiento

### Cache de navegador (ya configurado en .htaccess)
✅ Archivos estáticos cacheados 1 año
✅ Reduce carga del servidor

### Compresión GZIP
Si no está activada, añade a `.htaccess`:
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

---

## 🆘 Troubleshooting Común

### Error: "Mixed Content" (HTTP en HTTPS)
- Todos los recursos deben usar HTTPS
- Verifica en código: no usar `http://` en URLs

### Error 500 en PHP
- Revisa logs de error PHP en cPanel
- Verifica que `curl` esté habilitado en PHP
- Contacta soporte Raiola si persiste

### Chatbot no responde
1. F12 → Network → Busca petición a `/api/chat.php`
2. Verifica código de respuesta (debe ser 200)
3. Revisa la respuesta: ¿hay error de API?
4. Verifica que la API key sea válida

### Página en blanco después de subir
- Verifica que `index.html` esté en la raíz de `portfolio-oksap/`
- No debe estar en `portfolio-oksap/dist/index.html`
- Revisa la consola del navegador (F12)

---

## 📞 Soporte

- **Raiola Networks:** https://www.raiolanetworks.es/soporte/
- **Google Gemini API:** https://ai.google.dev/docs
- **Documentación Vite:** https://vitejs.dev/guide/static-deploy.html
