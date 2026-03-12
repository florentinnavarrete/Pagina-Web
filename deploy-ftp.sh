# Script de despliegue usando FTP (alternativa a deploy.sh)
# Este script requiere tener instalado lftp
# Instalación: brew install lftp

# Variables de configuración
FTP_HOST="ftp.oksap.es"
FTP_USER="vbscsuxy"
FTP_PASS="TU_CONTRASEÑA_AQUI"  # ⚠️ CAMBIAR ESTO
REMOTE_DIR="/public_html/portfolio-oksap"
LOCAL_DIR="/Users/celss/Desktop/portfolio-oksap/dist"

# Comando de despliegue con lftp
lftp -u "$FTP_USER,$FTP_PASS" "$FTP_HOST" << EOF
set ftp:ssl-allow no
set ftp:ssl-force no
mirror --reverse --delete --verbose --exclude .DS_Store $LOCAL_DIR $REMOTE_DIR
bye
EOF

echo "✅ Despliegue completado"
echo "🌐 Visita: https://oksap.es/portfolio-oksap/"
