<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, OPTIONS, POST, PUT');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

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

    // Obter dados do corpo da requisição POST
    $data = json_decode(file_get_contents('php://input'), true);

    // Verificar se os campos necessários estão presentes e não vazios
    if (
        !isset($data['Nome']) || empty($data['Nome']) ||
        !isset($data['Professor']) || empty($data['Professor'])
    ) {
        throw new Exception('Todos os campos são obrigatórios. Certifique-se de preencher todos os campos.');
    }

    // Dados a serem inseridos
    $nome = $data['Nome'];
    $professor = $data['Professor'];

    // Consulta SQL de inserção para a tabela Disciplinas
    $sqlInsert = "INSERT INTO Disciplinas (Nome, Professor) VALUES ('$nome', '$professor')";

    // Executar a consulta
    if ($conn->query($sqlInsert) === TRUE) {
        // Inserção bem-sucedida
        echo json_encode(['success' => true]);
    } else {
        // Se houver um erro na consulta, retorna uma resposta de erro
        throw new Exception('Erro na inserção: ' . $conn->error);
    }

    // Fecha a conexão com o banco de dados
    $conn->close();

} catch (Exception $e) {
    // Captura exceções e retorna uma resposta de erro detalhada
    echo json_encode(['error' => $e->getMessage()]);
    error_log('Erro no backend: ' . $e->getMessage());
}
?>
