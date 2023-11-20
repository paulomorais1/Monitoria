<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Inclui o arquivo db.php
include('../db.php');

try {
    // Consulta para obter a lista de monitores
    $sql = "SELECT * FROM monitores";
    $result = $conn->query($sql);

    if ($result !== false) {
        $monitors = [];

        // Obtém os dados da consulta
        while ($row = $result->fetch_assoc()) {
            $monitors[] = $row;
        }

        // Libera o resultado da consulta
        $result->free();

        // Fecha a conexão com o banco de dados
        $conn->close();

        // Responde com a lista de monitores em formato JSON
        echo json_encode(['monitors' => $monitors]);
    } else {
        // Se houver um erro na consulta, retorna uma resposta de erro
        throw new Exception('Erro na consulta: ' . $conn->error);
    }
} catch (Exception $e) {
    // Captura exceções e retorna uma resposta de erro detalhada
    echo json_encode(['error' => $e->getMessage()]);
    error_log('Erro no backend: ' . $e->getMessage());
}
?>
