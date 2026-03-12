<?php
// Script para listar todos los modelos disponibles para tu API key
header('Content-Type: application/json');

$apiKey = 'AIzaSyCrsLClAKsLycJDhgbu_3XVoPgJ66Ug_do';

// Probar diferentes endpoints para listar modelos
$endpoints = [
    'v1beta' => 'https://generativelanguage.googleapis.com/v1beta/models?key=' . $apiKey,
    'v1' => 'https://generativelanguage.googleapis.com/v1/models?key=' . $apiKey,
];

$results = [];

foreach ($endpoints as $version => $url) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);
    
    $results[$version] = [
        'http_code' => $httpCode,
        'curl_error' => $curlError ?: null,
        'response' => json_decode($response, true)
    ];
}

echo json_encode($results, JSON_PRETTY_PRINT);
