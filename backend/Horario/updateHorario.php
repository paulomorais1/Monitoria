<?php
// No início do seu script PHP (updateHorario.php), adicione:
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

    // Verifica se é uma requisição PUT
    if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
        throw new Exception('Apenas requisições PUT são permitidas.');
    }

    // Obter dados do corpo da requisição PUT
    $data = json_decode(file_get_contents('php://input'), true);

    // Verificar se os campos necessários estão presentes e não vazios
    if (
        !isset($data['ID']) || empty($data['ID']) ||
        !isset($data['diaSemana']) || empty($data['diaSemana']) ||
        !isset($data['horarioInicio']) || empty($data['horarioInicio']) ||
        !isset($data['horarioTermino']) || empty($data['horarioTermino']) ||
        !isset($data['monitorID']) || empty($data['monitorID']) ||
        !isset($data['disciplinaID']) || empty($data['disciplinaID'])
    ) {
        throw new Exception('Todos os campos são obrigatórios. Certifique-se de preencher todos os campos.');
    }

    // Dados a serem atualizados
    $id = $data['ID'];
    $diaSemana = $data['diaSemana'];
    $horarioInicio = $data['horarioInicio'];
    $horarioTermino = $data['horarioTermino'];
    $monitorID = $data['monitorID'];
    $disciplinaID = $data['disciplinaID'];

    // Consulta SQL de atualização
    $sqlUpdate = "UPDATE HorariosMonitoria 
                  SET DiaSemana='$diaSemana', HorarioInicio='$horarioInicio', HorarioTermino='$horarioTermino', MonitorID='$monitorID', DisciplinaID='$disciplinaID'
                  WHERE ID=$id";

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
