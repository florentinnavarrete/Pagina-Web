<?php
// Script de diagnóstico para probar la conexión con Gemini API
header('Content-Type: application/json');

$results = [
    'server_info' => [
        'php_version' => phpversion(),
        'server_software' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown',
        'server_addr' => $_SERVER['SERVER_ADDR'] ?? 'Unknown',
    ],
    'curl_available' => function_exists('curl_init'),
    'curl_version' => null,
    'ssl_support' => false,
    'file_get_contents_available' => function_exists('file_get_contents'),
    'allow_url_fopen' => ini_get('allow_url_fopen'),
    'gemini_connection_test' => null
];

// Verificar cURL
if (function_exists('curl_init')) {
    $curlVersion = curl_version();
    $results['curl_version'] = $curlVersion['version'];
    $results['ssl_support'] = ($curlVersion['features'] & CURL_VERSION_SSL) !== 0;
}

// Probar conexión con Google (sin API key, solo para verificar conectividad)
$testUrl = 'https://www.google.com';

if (function_exists('curl_init')) {
    $ch = curl_init($testUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_NOBODY, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    
    $exec = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);
    
    $results['google_connection'] = [
        'success' => $httpCode >= 200 && $httpCode < 400,
        'http_code' => $httpCode,
        'error' => $curlError ?: null
    ];
}

// Probar conexión con Gemini API (endpoint público)
$apiKey = 'AIzaSyCrsLClAKsLycJDhgbu_3XVoPgJ66Ug_do'; // Tu API key
$geminiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' . $apiKey;

$testPayload = [
    'contents' => [
        [
            'role' => 'user',
            'parts' => [
                ['text' => 'Test']
            ]
        ]
    ]
];

$ch = curl_init($geminiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($testPayload));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
$curlInfo = curl_getinfo($ch);
curl_close($ch);

$results['gemini_connection_test'] = [
    'success' => $httpCode === 200,
    'http_code' => $httpCode,
    'curl_error' => $curlError ?: null,
    'response_size' => strlen($response ?: ''),
    'total_time' => $curlInfo['total_time'] ?? null,
    'namelookup_time' => $curlInfo['namelookup_time'] ?? null,
    'connect_time' => $curlInfo['connect_time'] ?? null,
];

// Si la respuesta es JSON, intentar decodificarla
if ($response && $httpCode !== 200) {
    $decoded = json_decode($response, true);
    if ($decoded) {
        $results['gemini_connection_test']['error_response'] = $decoded;
    }
}

// Verificar extensiones PHP necesarias
$results['php_extensions'] = [
    'json' => extension_loaded('json'),
    'curl' => extension_loaded('curl'),
    'openssl' => extension_loaded('openssl'),
];

// Configuraciones PHP relevantes
$results['php_config'] = [
    'max_execution_time' => ini_get('max_execution_time'),
    'memory_limit' => ini_get('memory_limit'),
    'post_max_size' => ini_get('post_max_size'),
];

echo json_encode($results, JSON_PRETTY_PRINT);
