<?php
// backend/openSelectionProcess.php
require 'db.php';

// Recebe os dados do frontend
$data = json_decode(file_get_contents("php://input"));

// Recupera o tipo do processo
$processType = $data->processType;

// Insira sua lógica para abrir um novo processo seletivo no banco de dados

// Exemplo de resposta
echo json_encode(["message" => "Processo seletivo aberto com sucesso!"]);
?>
