# Portfolio OKSAP 🎨

Portfolio profesional desarrollado con React + TypeScript + Vite, con integración de chatbot con IA (Google Gemini).

## 🚀 Despliegue en Producción (oksap.es)

Este proyecto está configurado para desplegarse en **https://oksap.es/portfolio-oksap/**

### Método 1: FileZilla (Recomendado) 📦

1. **Compilar el proyecto:**
```bash
npm run build -- --base=/portfolio-oksap/
```

2. **Conectar con FileZilla:**
   - Host: `ftp.oksap.es` o `sftp.oksap.es`
   - Usuario: `vbscsuxy`
   - Puerto: 21 (FTP) o 22 (SFTP)

3. **Subir archivos:**
   - Local: `dist/` (todo su contenido)
   - Remoto: `/public_html/portfolio-oksap/`

4. **Acceder:** https://oksap.es/portfolio-oksap/

### Método 2: Script Automático 🤖

```bash
./deploy.sh
```

### Método 3: cPanel 🌐

1. Sube `portfolio-oksap-dist.zip`
2. Extrae en `public_html/portfolio-oksap/`

---

## 📚 Documentación de Despliegue

- **[INSTRUCCIONES-DEPLOY.md](./INSTRUCCIONES-DEPLOY.md)** - Guía rápida y visual
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Documentación completa
- **[ESTRUCTURA-DEPLOY.md](./ESTRUCTURA-DEPLOY.md)** - Diagramas de estructura
- **[SEGURIDAD.md](./SEGURIDAD.md)** - Configuración de seguridad

---

## 💻 Desarrollo Local

### Requisitos
- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/celssdfgh/portfolio-oksap.git

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Edita .env y añade tu GEMINI_API_KEY

# Iniciar servidor de desarrollo
npm run dev
```

El proyecto estará disponible en `http://localhost:3000`

### Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Compilar para producción
npm run preview  # Previsualizar build
npm run lint     # Verificar código
```

---

## 🏗️ Estructura del Proyecto

```
portfolio-oksap/
├── src/
│   ├── components/        # Componentes React
│   │   ├── About.tsx
│   │   ├── ChatWidget.tsx
│   │   ├── Contact.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   └── ShareModal.tsx
│   ├── services/          # Lógica de negocio
│   │   └── geminiService.ts
│   ├── assets/            # Imágenes y recursos
│   ├── App.tsx            # Componente principal
│   └── main.tsx           # Punto de entrada
├── public/
│   └── api/
│       └── chat.php       # Backend del chatbot
├── dist/                  # Build de producción
└── [archivos de config]
```

---

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz:

```env
GEMINI_API_KEY=tu_clave_api_aqui
```

⚠️ **Nota de Seguridad:** La API key se gestiona en el backend (`api/chat.php`) para no exponerla en el cliente.

### Configuración de Vite

El proyecto está configurado para funcionar en `/portfolio-oksap/`:

```typescript
// vite.config.ts
export default defineConfig({
  base: '/portfolio-oksap/',
  // ...
})
```

---

## 🔧 Tecnologías

- **Frontend:** React 19 + TypeScript
- **Build:** Vite
- **Estilos:** Tailwind CSS
- **IA:** Google Gemini API
- **Backend:** PHP (para proxy de API)
- **Iconos:** Lucide React

---

## 🔒 Seguridad

- API key protegida en backend PHP
- CORS configurado correctamente
- Headers de seguridad en respuestas
- Ver [SEGURIDAD.md](./SEGURIDAD.md) para más detalles

---

## 📦 Despliegue en Otros Servidores

### Para desplegar en la raíz del dominio:

```bash
npm run build
# Los archivos en dist/ se suben a public_html/
```

### Para desplegar en otra subcarpeta:

```bash
npm run build -- --base=/otra-carpeta/
```

---

## 🐛 Solución de Problemas

### Página en blanco después de desplegar
- Verifica que los archivos estén en la ruta correcta
- Asegúrate de que `.htaccess` esté presente
- Revisa la consola del navegador (F12)

### Chatbot no responde
- Verifica que `api/chat.php` esté subido
- Comprueba que la API key sea válida
- Revisa los logs de error PHP en cPanel

### Error 404 en recursos
- Verifica que `base` en `vite.config.ts` coincida con la ruta del servidor
- Asegúrate de compilar con el `--base` correcto

---

## 📞 Contacto

Para soporte o consultas sobre el proyecto:
- Web: https://oksap.es
- Repositorio: https://github.com/celssdfgh/portfolio-oksap

---

## 📄 Licencia

Este proyecto es privado y de uso exclusivo para OKSAP.

---

## 🎯 Checklist de Despliegue

- [ ] Compilar con `npm run build -- --base=/portfolio-oksap/`
- [ ] Verificar que existe la carpeta `dist/`
- [ ] Subir contenido de `dist/` a `/public_html/portfolio-oksap/`
- [ ] Verificar que `.htaccess` esté presente
- [ ] Probar en navegador: https://oksap.es/portfolio-oksap/
- [ ] Verificar que el chatbot funciona
- [ ] Comprobar que no hay errores 404 (F12)

---

**Última actualización:** Noviembre 2025
