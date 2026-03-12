# 🔍 Diagnóstico: Error 429 - Funciona en Local pero NO en Servidor

## 🎯 El Problema

- ✅ **Local (npm run dev):** Chatbot funciona perfectamente
- ❌ **Servidor (oksap.es):** Error 429 aunque la cuota de Google no está agotada

## 🔎 Posibles Causas

### 1. **Servidor de Raiola bloqueando peticiones salientes** ⚠️
Algunos hostings compartidos restringen las conexiones cURL a APIs externas por seguridad.

### 2. **Configuración PHP diferente**
- cURL no habilitado o mal configurado
- SSL/TLS con problemas
- Timeouts muy cortos

### 3. **IP del servidor bloqueada por Google**
Si muchos clientes de Raiola usan la misma IP, Google puede bloquear temporalmente.

### 4. **Headers o CORS incorrectos**
Ya corregido, pero puede haber residuos de caché.

---

## ✅ Pasos de Diagnóstico

### Paso 1: Ejecutar Script de Diagnóstico 🔧

He creado un archivo especial para probar la conexión desde tu servidor.

**Sube este archivo:**
- `dist/api/test-connection.php` → `/public_html/portfolio-oksap/api/test-connection.php`

**Accede desde el navegador:**
```
https://oksap.es/portfolio-oksap/api/test-connection.php
```

**Interpretación de resultados:**

#### ✅ Si ves esto - Todo OK:
```json
{
  "curl_available": true,
  "ssl_support": true,
  "gemini_connection_test": {
    "success": true,
    "http_code": 200
  }
}
```
→ El problema es otro (ver Paso 2)

#### ❌ Si ves esto - cURL bloqueado:
```json
{
  "curl_available": false
}
```
→ cURL no está habilitado (ver Solución A)

#### ❌ Si ves esto - Conexión SSL fallando:
```json
{
  "gemini_connection_test": {
    "success": false,
    "curl_error": "SSL certificate problem"
  }
}
```
→ Problema de certificados SSL (ver Solución B)

#### ❌ Si ves esto - Timeout:
```json
{
  "gemini_connection_test": {
    "curl_error": "Operation timed out"
  }
}
```
→ Servidor bloqueando conexiones salientes (ver Solución C)

---

### Paso 2: Revisar Logs de PHP 📋

**Desde cPanel:**
1. Administrador de Archivos
2. Ve a `/home/vbscsuxy/logs/` o `/logs/`
3. Busca `error_log` o `php_error.log`
4. Abre y busca errores recientes con "curl" o "gemini"

**O desde SSH:**
```bash
tail -f ~/logs/error_log
```

---

## ✅ Soluciones Según el Diagnóstico

### Solución A: cURL no disponible 🔧

Si cURL no está habilitado, usa `file_get_contents` como alternativa:

**Reemplaza en `api/chat.php`:**

```php
// Alternativa sin cURL usando file_get_contents
$options = [
    'http' => [
        'method' => 'POST',
        'header' => "Content-Type: application/json\r\n",
        'content' => json_encode($payload),
        'timeout' => 30
    ],
    'ssl' => [
        'verify_peer' => true,
        'verify_peer_name' => true
    ]
];

$context = stream_context_create($options);
$response = file_get_contents($geminiUrl, false, $context);

if ($response === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to connect to Gemini API']);
    exit;
}

// Obtener código HTTP de la respuesta
$httpCode = 200;
if (isset($http_response_header)) {
    foreach ($http_response_header as $header) {
        if (preg_match('/^HTTP\/\d\.\d\s+(\d+)/', $header, $matches)) {
            $httpCode = (int)$matches[1];
        }
    }
}

http_response_code($httpCode);
echo $response;
```

### Solución B: Problema SSL/TLS 🔒

Si hay problemas con certificados SSL:

**Opción 1 - Actualizar certificados (Raiola debe hacerlo):**
Abre un ticket en Raiola solicitando actualizar los certificados CA.

**Opción 2 - Desactivar verificación SSL (NO RECOMENDADO para producción):**
```php
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
```

### Solución C: Servidor bloqueando conexiones salientes 🚫

**Contacta a Raiola Networks:**

1. Abre un ticket de soporte
2. Asunto: "Solicitud para permitir conexiones cURL a Google APIs"
3. Mensaje:

```
Hola,

Necesito que mi cuenta pueda realizar peticiones cURL salientes 
a la siguiente URL:

https://generativelanguage.googleapis.com

Es para integrar la API de Google Gemini en mi aplicación web.

Dominio: oksap.es
Usuario: vbscsuxy

¿Pueden habilitar las conexiones salientes a este dominio?

Gracias.
```

### Solución D: Usar Proxy/Service Externo 🌐

Si Raiola no permite conexiones, puedes usar un servicio intermedio:

1. **Cloudflare Workers** (gratuito)
2. **Vercel Serverless Functions**
3. **AWS Lambda**

Te puedo ayudar a configurar alguna de estas opciones.

---

## 🧪 Test Rápido Alternativo

**Prueba desde el servidor con SSH:**

```bash
# Conéctate por SSH a tu servidor
ssh vbscsuxy@oksap.es

# Prueba cURL directamente
curl -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=TU_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"test"}]}]}'
```

**Resultados esperados:**

✅ **Respuesta JSON:** cURL funciona, el problema es el código PHP
❌ **Timeout/Error:** El servidor está bloqueando conexiones
❌ **Command not found:** SSH no disponible, usa el script de diagnóstico

---

## 📊 Comparación Local vs Servidor

| Aspecto | Local (Funciona) | Servidor (Error 429) |
|---------|------------------|----------------------|
| **Conexión** | Directa a Google Gemini | Via cURL desde PHP |
| **IP** | Tu IP residencial | IP compartida de Raiola |
| **Restricciones** | Ninguna | Posibles firewall/límites |
| **SSL** | Tu sistema | Certificados del servidor |

---

## 🎯 Plan de Acción

1. **Ahora mismo:**
   - Sube los archivos actualizados (con mejor logging)
   - Accede a `test-connection.php` y copia el resultado completo

2. **Con los resultados:**
   - Analiza el JSON de diagnóstico
   - Identifica el problema específico
   - Aplica la solución correspondiente

3. **Si nada funciona:**
   - Contacta a Raiola con la información del diagnóstico
   - O implementa un proxy externo (Cloudflare Workers)

---

## 📝 Archivos Actualizados

- ✅ `api/chat.php` - Mejor manejo de errores y debugging
- ✅ `api/test-connection.php` - Script de diagnóstico completo
- ✅ `portfolio-oksap-dist.zip` - ZIP actualizado con todo

**Sube primero `test-connection.php` y ejecuta el diagnóstico.**

---

## 💬 Siguiente Paso

1. Sube el archivo `dist/api/test-connection.php` al servidor
2. Accede a: `https://oksap.es/portfolio-oksap/api/test-connection.php`
3. Copia TODA la respuesta JSON
4. Compártela conmigo para diagnosticar el problema exacto

**¿Quieres que te ayude a configurar un proxy alternativo en Cloudflare si el servidor está bloqueando las conexiones?**
