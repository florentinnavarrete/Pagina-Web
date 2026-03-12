<?php
// Configuración de seguridad
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://oksap.es');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Manejar peticiones OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Solo permitir POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Leer datos del cuerpo de la petición
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data || !isset($data['message'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing message']);
    exit;
}

// ⚠️ IMPORTANTE: Reemplaza con tu clave real de Google Gemini API
// Puedes obtenerla en https://makersuite.google.com/app/apikey
$apiKey = 'AIzaSyCrsLClAKsLycJDhgbu_3XVoPgJ66Ug_do';

// Construir la petición a Gemini API
$geminiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' . $apiKey;

$payload = [
    'contents' => [
        [
            'role' => 'user',
            'parts' => [
                ['text' => $data['message']]
            ]
        ]
    ],
    'systemInstruction' => [
        'parts' => [
            ['text' => $data['systemInstruction'] ?? '']
        ]
    ]
];

// Si hay historial, añadirlo
if (isset($data['history']) && is_array($data['history'])) {
    $payload['contents'] = array_merge($data['history'], $payload['contents']);
}

// Hacer la petición a Gemini
$ch = curl_init($geminiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);

$response = curl_exec($ch);
$curlError = curl_error($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Si hay error de cURL, registrarlo
if ($curlError) {
    http_response_code(500);
    echo json_encode([
        'error' => 'cURL error',
        'details' => $curlError,
        'debug' => [
            'curl_version' => curl_version(),
            'php_version' => phpversion()
        ]
    ]);
    exit;
}

// Si no hay respuesta
if (!$response) {
    http_response_code(500);
    echo json_encode([
        'error' => 'No response from Gemini API',
        'http_code' => $httpCode
    ]);
    exit;
}

// Devolver respuesta
http_response_code($httpCode);
echo $response;
