# Guía de Despliegue a Raiola

## 📋 Pasos para subir el portfolio a oksap.es

### Opción 1: Usando FileZilla o Cliente FTP (Recomendado para la primera vez)

1. **Descargar FileZilla** (si no lo tienes): https://filezilla-project.org/

2. **Conectarte a tu servidor Raiola:**
   - Host: `ftp.oksap.es` o la IP proporcionada por Raiola
   - Usuario: Tu usuario de cPanel (probablemente `vbscsuxy` según la imagen)
   - Contraseña: Tu contraseña de cPanel
   - Puerto: 21 (FTP) o 22 (SFTP - más seguro)

3. **Navega a la carpeta destino:**
   - Una vez conectado, ve a `/public_html/`
   - Crea una carpeta llamada `portfolio-oksap` (si no existe)

4. **Sube los archivos:**
   - En tu ordenador (panel izquierdo), navega a: `/Users/celss/Desktop/celss/OKSAP/portfolio-oksap/dist/`
   - Selecciona TODOS los archivos y carpetas dentro de `dist/`
   - Arrástralos a la carpeta `public_html/portfolio-oksap/` en el servidor (panel derecho)

5. **Verifica la subida:**
   - Accede a: `https://oksap.es/portfolio-oksap/`
   - Tu portfolio debería estar funcionando

### Opción 2: Usando rsync (Terminal - Más rápido para actualizaciones)

```bash
# Conectar por SFTP y subir archivos
rsync -avz --progress ./dist/ vbscsuxy@oksap.es:/home/vbscsuxy/public_html/portfolio-oksap/
```

### Opción 3: Desde cPanel

1. Accede a tu cPanel de Raiola
2. Ve a "Administrador de archivos"
3. Navega a `public_html/`
4. Crea la carpeta `portfolio-oksap`
5. Sube los archivos desde `dist/` (puedes crear un ZIP primero y subirlo, luego extraerlo)

## 🔧 Archivos importantes que deben estar en el servidor

Asegúrate de que estos archivos estén en `public_html/portfolio-oksap/`:

```
portfolio-oksap/
├── index.html          # Página principal
├── vite.svg           # Favicon
├── .htaccess          # Configuración de Apache
├── api/
│   └── chat.php       # API del chatbot
├── assets/
│   ├── index-*.js     # JavaScript compilado
│   └── index-*.css    # Estilos compilados
```

## 🔑 Configuración de Variables de Entorno

**IMPORTANTE:** Tu archivo `.env` con `GEMINI_API_KEY` NO debe subirse al servidor por seguridad.

La clave de API está compilada en el código JavaScript. Si necesitas cambiarla:
1. Modifica el `.env` localmente
2. Ejecuta `npm run build -- --base=/portfolio-oksap/`
3. Vuelve a subir los archivos

## ✅ Verificación Post-Despliegue

1. **Prueba la página principal:**
   - URL: `https://oksap.es/portfolio-oksap/`

2. **Verifica que funcione el chatbot:**
   - Abre el widget de chat
   - Envía un mensaje de prueba

3. **Revisa la consola del navegador:**
   - Presiona F12
   - Ve a la pestaña "Console"
   - No deberían aparecer errores 404

## 🔄 Actualizaciones Futuras

Cuando hagas cambios en el código:

```bash
# 1. Asegúrate de estar en la carpeta del proyecto
cd /Users/celss/Desktop/celss/OKSAP/portfolio-oksap

# 2. Compila el proyecto
npm run build -- --base=/portfolio-oksap/

# 3. Sube solo los archivos modificados usando FileZilla
# O usa el script de deploy (ver abajo)
```

## 🚨 Solución de Problemas

### Error 404 o página en blanco:
- Verifica que el `base` en `vite.config.ts` sea `/portfolio-oksap/`
- Asegúrate de que los archivos estén en la ruta correcta del servidor

### CSS o JS no cargan:
- Revisa el archivo `.htaccess` en el servidor
- Verifica los permisos de los archivos (644 para archivos, 755 para carpetas)

### El chatbot no funciona:
- Verifica que `api/chat.php` esté subido y tenga permisos de ejecución
- Revisa los logs de error de PHP en cPanel

## 📞 Contacto con Soporte Raiola

Si tienes problemas de acceso:
- Web: https://www.raiolanetworks.es/soporte/
- Ticket desde cPanel
