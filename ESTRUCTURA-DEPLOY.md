# 📊 Diagrama de Estructura del Despliegue

## 🖥️ TU ORDENADOR (Local)

```
/Users/celss/Desktop/celss/OKSAP/portfolio-oksap/
│
├── 📦 dist/                              ← ESTO SE SUBE AL SERVIDOR
│   ├── index.html
│   ├── vite.svg
│   ├── .htaccess
│   ├── diagnostico.php
│   ├── test.html
│   ├── api/
│   │   └── chat.php
│   └── assets/
│       ├── index-BdwjYg5l.js            ← JavaScript compilado
│       ├── index-DiNNw5yB.css           ← CSS compilado
│       ├── logo-Bvqk65fs.png
│       └── [otras imágenes]
│
├── 📄 INSTRUCCIONES-DEPLOY.md           ← GUÍA RÁPIDA
├── 📄 DEPLOYMENT.md                     ← GUÍA COMPLETA
├── 🚀 deploy.sh                         ← Script automático (SFTP)
├── 🚀 deploy-ftp.sh                     ← Script alternativo (FTP)
└── 📦 portfolio-oksap-dist.zip          ← ZIP para subir desde cPanel
```

---

## 🌐 SERVIDOR RAIOLA (oksap.es)

### ANTES del despliegue:
```
/home/vbscsuxy/public_html/
├── blog.oksap.es/
├── message.oksap.es/
├── contenido/
├── css/
├── img/
├── js/
├── index.html                           ← Tu página principal actual
└── [otros archivos de oksap.es]
```

### DESPUÉS del despliegue:
```
/home/vbscsuxy/public_html/
├── 🆕 portfolio-oksap/                   ← NUEVA CARPETA
│   ├── index.html                       ← Entrada del portfolio
│   ├── vite.svg
│   ├── .htaccess                        ← Config de Apache
│   ├── diagnostico.php
│   ├── test.html
│   ├── api/
│   │   └── chat.php                     ← Backend del chatbot
│   └── assets/
│       ├── index-BdwjYg5l.js
│       ├── index-DiNNw5yB.css
│       └── [imágenes]
│
├── blog.oksap.es/                       ← Siguen igual
├── message.oksap.es/
└── [resto sin cambios]
```

---

## 🔗 URLs Resultantes

| Ruta en Servidor | URL Pública |
|------------------|-------------|
| `/public_html/index.html` | `https://oksap.es/` |
| `/public_html/blog.oksap.es/` | `https://blog.oksap.es/` |
| `/public_html/message.oksap.es/` | `https://message.oksap.es/` |
| `/public_html/portfolio-oksap/` | `https://oksap.es/portfolio-oksap/` ← **NUEVO** |
| `/public_html/portfolio-oksap/api/chat.php` | `https://oksap.es/portfolio-oksap/api/chat.php` |

---

## 📤 Flujo de Despliegue

```
┌─────────────────────┐
│  TU ORDENADOR       │
│                     │
│  Código fuente en   │
│  src/               │
└──────────┬──────────┘
           │
           │ npm run build
           │
           ▼
┌─────────────────────┐
│  dist/              │
│  (Compilado)        │
└──────────┬──────────┘
           │
           │ FileZilla / FTP / SFTP / Script
           │
           ▼
┌─────────────────────┐
│  SERVIDOR RAIOLA    │
│                     │
│  public_html/       │
│  └── portfolio-     │
│      oksap/         │
└──────────┬──────────┘
           │
           │ Usuario accede
           │
           ▼
┌─────────────────────┐
│  NAVEGADOR          │
│                     │
│  https://oksap.es/  │
│  portfolio-oksap/   │
└─────────────────────┘
```

---

## ⚠️ IMPORTANTE: Qué NO subir

❌ NO subir estas carpetas al servidor:
- `node_modules/`
- `src/`
- `.git/`
- `.env` (contiene claves secretas)

✅ SOLO subir el contenido de:
- `dist/`

---

## 🎯 Checklist de Despliegue

- [ ] Proyecto compilado (`dist/` existe)
- [ ] Carpeta `portfolio-oksap/` creada en servidor
- [ ] Todos los archivos de `dist/` subidos
- [ ] `.htaccess` presente en el servidor
- [ ] `api/chat.php` subido y con permisos correctos
- [ ] Probado en navegador: `https://oksap.es/portfolio-oksap/`
- [ ] Sin errores 404 en la consola (F12)
- [ ] Chatbot funciona correctamente
