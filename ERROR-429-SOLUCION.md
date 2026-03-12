# 🚨 Error 429 - Rate Limit Exceeded (Cuota Agotada)

## ❌ Problema

```
Failed to load resource: the server responded with a status of 429
Error: Proxy error: 429
```

**Significado:** La API de Google Gemini ha rechazado la petición porque:
- Has excedido el límite de requests gratuitos
- Demasiadas peticiones en poco tiempo
- La API key puede estar siendo usada por otros

---

## 🔍 Verificar el Estado de tu API

### 1. Revisa tu cuota en Google AI Studio

**URL:** https://aistudio.google.com/app/apikey

**Verifica:**
- ✅ Estado de tu API key (activa/inactiva)
- ✅ Cuota disponible (requests/día, requests/minuto)
- ✅ Uso actual

### 2. Revisa límites de la versión gratuita

**Límites típicos de Gemini API (Free tier):**
```
- 15 requests por minuto (RPM)
- 1,500 requests por día (RPD)
- 1 millón de tokens por minuto
```

Si estás haciendo pruebas frecuentes, es fácil exceder estos límites.

---

## ✅ Soluciones

### Solución 1: Esperar (Temporal) ⏰

Si excediste el límite por minuto:
```
Espera 1-2 minutos y vuelve a probar
```

Si excediste el límite diario:
```
Espera hasta mañana (se resetea cada 24h)
```

### Solución 2: Crear una Nueva API Key (Recomendado) 🔑

1. **Ve a Google AI Studio:**
   https://aistudio.google.com/app/apikey

2. **Crea una nueva API key** (botón "Create API Key")

3. **Actualiza tu proyecto:**

```bash
# Edita el archivo PHP
nano public/api/chat.php
```

Cambia esta línea:
```php
$apiKey = 'TU_NUEVA_API_KEY_AQUI';
```

4. **Recompila y sube:**
```bash
npm run build -- --base=/portfolio-oksap/
./deploy.sh
```

### Solución 3: Configurar Rate Limiting en tu Backend (Prevención) 🛡️

Modifica `public/api/chat.php` para limitar las peticiones:

```php
<?php
// Rate limiting simple
session_start();

$max_requests = 10; // Máximo 10 requests
$time_window = 600; // En 10 minutos (600 segundos)

if (!isset($_SESSION['chat_requests'])) {
    $_SESSION['chat_requests'] = [];
}

// Limpiar requests antiguos
$now = time();
$_SESSION['chat_requests'] = array_filter(
    $_SESSION['chat_requests'],
    fn($t) => ($now - $t) < $time_window
);

// Verificar límite
if (count($_SESSION['chat_requests']) >= $max_requests) {
    http_response_code(429);
    echo json_encode([
        'error' => 'Demasiadas peticiones. Intenta de nuevo en unos minutos.'
    ]);
    exit;
}

// Registrar esta petición
$_SESSION['chat_requests'][] = $now;

// ... resto del código actual ...
```

### Solución 4: Implementar Caché (Optimización) 💾

Para reducir llamadas a la API:

```php
// Al inicio del archivo chat.php
$cache_file = __DIR__ . '/../cache/chat_' . md5($data['message']) . '.json';
$cache_duration = 3600; // 1 hora

// Verificar si hay respuesta en caché
if (file_exists($cache_file) && (time() - filemtime($cache_file)) < $cache_duration) {
    echo file_get_contents($cache_file);
    exit;
}

// ... hacer petición a Gemini ...

// Guardar en caché
file_put_contents($cache_file, $response);
echo $response;
```

### Solución 5: Upgrade a Plan de Pago (Si lo necesitas) 💳

Si necesitas más cuota:

1. **Google AI Studio** → Settings → Billing
2. **Configura método de pago**
3. **Límites aumentan significativamente:**
   - 1,000 RPM
   - Sin límite diario (pay-per-use)

**Precios típicos:** ~$0.35 por millón de tokens (muy barato para uso normal)

---

## 🧪 Diagnóstico Rápido

### Prueba tu API key con curl:

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=TU_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{
      "parts": [{"text": "Hola"}]
    }]
  }'
```

**Respuestas posibles:**

✅ **200 OK:** API funciona correctamente
❌ **429:** Cuota excedida (espera o cambia key)
❌ **403:** API key inválida o desactivada
❌ **400:** Error en el formato de la petición

---

## 📊 Monitoreo de Uso

### Crear un contador en tu PHP:

```php
// Guardar log de uso
$log_file = __DIR__ . '/../logs/api_usage.log';
file_put_contents(
    $log_file,
    date('Y-m-d H:i:s') . " - Request from " . $_SERVER['REMOTE_ADDR'] . "\n",
    FILE_APPEND
);
```

Luego puedes revisar:
```bash
tail -f public_html/portfolio-oksap/logs/api_usage.log
```

---

## 🔒 Proteger tu API Key

### Si sospechas que tu key está comprometida:

1. **Revoca la key actual:**
   https://aistudio.google.com/app/apikey → Revoke

2. **Crea una nueva**

3. **Configura restricciones:**
   - Limitar por IP (si tienes IP fija)
   - Limitar por dominio/referrer
   - Establecer cuotas personalizadas

4. **Nunca expongas la key en el cliente:**
   ✅ Usas PHP (backend) - CORRECTO
   ❌ No uses `VITE_GEMINI_API_KEY` en .env

---

## 🎯 Plan de Acción Inmediato

1. **Verifica tu cuota:** https://aistudio.google.com/app/apikey
2. **Si está agotada:**
   - Espera (resetea en 24h para límite diario)
   - O crea nueva API key
3. **Implementa rate limiting** (Solución 3)
4. **Actualiza el archivo PHP** con la nueva key
5. **Recompila y sube:**
   ```bash
   npm run build -- --base=/portfolio-oksap/
   ./deploy.sh
   ```
6. **Prueba de nuevo** el chatbot

---

## 📝 Mensaje para el Usuario Final

Mientras tanto, puedes agregar un mensaje amigable cuando ocurra error 429:

En `src/components/ChatWidget.tsx`, busca el manejo de errores y añade:

```typescript
if (error.message.includes('429')) {
  setMessages(prev => [...prev, {
    role: 'model',
    parts: [{
      text: 'Lo siento, el servicio de chat ha alcanzado su límite temporal. Por favor, intenta de nuevo en unos minutos. 🙏'
    }]
  }]);
}
```

---

## ✅ Checklist de Verificación

- [ ] Verificar cuota en Google AI Studio
- [ ] Crear nueva API key si es necesario
- [ ] Actualizar `public/api/chat.php` con nueva key
- [ ] Implementar rate limiting (opcional pero recomendado)
- [ ] Recompilar proyecto
- [ ] Subir al servidor
- [ ] Probar chatbot
- [ ] Monitorear uso en las próximas 24h

---

**Estado actual:** Tu código está correcto, solo necesitas resolver el límite de cuota de la API.
