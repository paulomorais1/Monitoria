<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type");

// Inclui o arquivo db.php
include('../db.php');

try {
    // Cria uma instância de mysqli
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Verifica a conexão
    if ($conn->connect_error) {
        throw new Exception('Erro de Conexão: ' . $conn->connect_error);
    }

    // Adicione um log para verificar se a requisição está chegando
    error_log('Requisição recebida no backend');

    // Obter dados do corpo da requisição PUT
    $data = json_decode(file_get_contents('php://input'), true);

    // Verificar se o campo 'id' está presente
    if (!isset($data['ID']) || empty($data['ID'])) {
        throw new Exception('O campo "id" é obrigatório.');
    }

    // Dados a serem atualizados
    $id = $data['ID'];

    // Consulta SQL de atualização
    $sqlUpdate = "UPDATE monitores SET ";

    // Verificar e adicionar os campos que foram fornecidos na requisição
    if (isset($data['Nome']) && !empty($data['Nome'])) {
        $sqlUpdate .= "Nome='{$data['Nome']}', ";
    }

    if (isset($data['Email']) && !empty($data['Email'])) {
        $sqlUpdate .= "Email='{$data['Email']}', ";
    }

    if (isset($data['Ra']) && !empty($data['Ra'])) {
        $sqlUpdate .= "Ra='{$data['Ra']}', ";
    }

    if (isset($data['Tipo']) && !empty($data['Tipo'])) {
        $sqlUpdate .= "Tipo='{$data['Tipo']}', ";
    }

    // Remover a última vírgula, se houver
    $sqlUpdate = rtrim($sqlUpdate, ', ');

    // Adicionar a cláusula WHERE
    $sqlUpdate .= " WHERE id=$id";

    // Executar a consulta
    if ($conn->query($sqlUpdate) === TRUE) {
        // Atualização bem-sucedida
        echo json_encode(['success' => true]);
    } else {
        // Se houver um erro na consulta, retorna uma resposta de erro
        throw new Exception('Erro na atualização: ' . $conn->error);
    }

    // Fecha a conexão com o banco de dados
    $conn->close();

} catch (Exception $e) {
    // Captura exceções e retorna uma resposta de erro detalhada
    echo json_encode(['error' => $e->getMessage()]);
    error_log('Erro no backend: ' . $e->getMessage());
}
?>
