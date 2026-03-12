# 🚀 INSTRUCCIONES RÁPIDAS DE DESPLIEGUE

## ✅ LO QUE YA ESTÁ LISTO:
- ✅ Tu proyecto está compilado en la carpeta `dist/`
- ✅ Configurado para funcionar en `oksap.es/portfolio-oksap/`
- ✅ Archivo ZIP creado: `portfolio-oksap-dist.zip`

## 📤 MÉTODO RECOMENDADO: Subida Manual con FileZilla

### 1. Descarga FileZilla
https://filezilla-project.org/

### 2. Conéctate a tu servidor
```
Host: ftp.oksap.es (o sftp.oksap.es para conexión segura)
Usuario: vbscsuxy
Contraseña: [tu contraseña de cPanel]
Puerto: 21 (FTP) o 22 (SFTP)
```

### 3. Navega en el servidor
- Panel derecho (servidor) → Ve a: `/public_html/`
- Crea carpeta nueva llamada: `portfolio-oksap`
- Entra en esa carpeta

### 4. Sube los archivos
- Panel izquierdo (tu PC) → Ve a: `/Users/celss/Desktop/celss/OKSAP/portfolio-oksap/dist/`
- Selecciona TODO lo que hay dentro de `dist/`
- Arrastra al panel derecho (dentro de `portfolio-oksap/`)
- Espera a que termine la subida

### 5. ¡Listo! 
Accede a: **https://oksap.es/portfolio-oksap/**

---

## 🎯 MÉTODO ALTERNATIVO 1: Desde cPanel

1. Accede a tu cPanel de Raiola
2. Abre "Administrador de Archivos"
3. Ve a `public_html/`
4. Sube el archivo `portfolio-oksap-dist.zip`
5. Click derecho → Extraer
6. Mueve todo lo que está dentro de `dist/` a una carpeta llamada `portfolio-oksap/`
7. Elimina el ZIP y la carpeta `dist/` vacía

---

## ⚡ MÉTODO ALTERNATIVO 2: Script Automático (Terminal)

Si tienes acceso SSH a tu servidor:

```bash
./deploy.sh
```

Te pedirá la contraseña del servidor y subirá todo automáticamente.

---

## 📋 ESTRUCTURA FINAL EN EL SERVIDOR

Tu servidor debe quedar así:

```
public_html/
├── portfolio-oksap/           ← NUEVA CARPETA
│   ├── index.html
│   ├── vite.svg
│   ├── .htaccess
│   ├── api/
│   │   └── chat.php
│   └── assets/
│       ├── index-*.js
│       ├── index-*.css
│       └── *.png
├── blog.oksap.es/            ← TUS OTRAS CARPETAS
├── message.oksap.es/
└── ... (resto de archivos)
```

---

## ✅ VERIFICACIÓN

Después de subir, verifica:

1. **URL principal:** https://oksap.es/portfolio-oksap/
2. **Sin errores 404:** Abre F12 → Pestaña Console
3. **Chatbot funciona:** Prueba enviar un mensaje

---

## 🔄 PARA ACTUALIZAR EN EL FUTURO

Cuando hagas cambios:

```bash
# 1. Compila de nuevo
npm run build -- --base=/portfolio-oksap/

# 2. Sube solo los archivos nuevos con FileZilla
# O ejecuta: ./deploy.sh
```

---

## 🆘 ¿PROBLEMAS?

- **Página en blanco:** Verifica que los archivos estén en `portfolio-oksap/` no en `portfolio-oksap/dist/`
- **404 en recursos:** Revisa que el `.htaccess` esté subido
- **Chatbot no funciona:** Verifica que `api/chat.php` tenga permisos 644

---

## 📞 CONTACTO SOPORTE RAIOLA

- Web: https://www.raiolanetworks.es/soporte/
- Desde cPanel: Abrir ticket de soporte
