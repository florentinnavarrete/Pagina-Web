#!/bin/bash

# Script de despliegue para portfolio-oksap
# Uso: ./deploy.sh

set -e  # Detener en caso de error

echo "🚀 Iniciando despliegue del Portfolio OKSAP..."

# Variables de configuración
PROJECT_DIR="/Users/celss/Desktop/portfolio-oksap"
DIST_DIR="$PROJECT_DIR/dist"
SERVER_USER="vbscsuxy"
SERVER_HOST="oksap.es"
SERVER_PATH="/home/vbscsuxy/public_html/portfolio-oksap"

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}📦 Paso 1: Compilando el proyecto...${NC}"
cd "$PROJECT_DIR"
npm run build -- --base=/portfolio-oksap/

if [ ! -d "$DIST_DIR" ]; then
    echo -e "${RED}❌ Error: La carpeta dist no existe${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Compilación exitosa${NC}"

echo -e "${YELLOW}📤 Paso 2: Subiendo archivos al servidor...${NC}"
echo "Servidor: $SERVER_USER@$SERVER_HOST"
echo "Destino: $SERVER_PATH"
echo ""
echo "Se te pedirá la contraseña del servidor..."

# Usar rsync para subir archivos (más eficiente que FTP)
rsync -avz --progress \
    --exclude='.DS_Store' \
    --exclude='*.map' \
    "$DIST_DIR/" \
    "$SERVER_USER@$SERVER_HOST:$SERVER_PATH/"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Archivos subidos exitosamente${NC}"
    echo ""
    echo -e "${GREEN}🎉 ¡Despliegue completado!${NC}"
    echo ""
    echo -e "Tu portfolio está disponible en: ${GREEN}https://oksap.es/portfolio-oksap/${NC}"
    echo ""
    echo "📝 Próximos pasos:"
    echo "  1. Visita https://oksap.es/portfolio-oksap/"
    echo "  2. Verifica que todo funcione correctamente"
    echo "  3. Prueba el chatbot"
else
    echo -e "${RED}❌ Error al subir archivos${NC}"
    echo "Verifica tu conexión y credenciales"
    exit 1
fi
