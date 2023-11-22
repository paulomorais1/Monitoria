<?php
// Configuração dos cabeçalhos CORS
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Se a solicitação for OPTIONS, apenas retorne cabeçalhos CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Inclui o arquivo db.php
include('../db.php');

try {
    // Cria uma instância de mysqli
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Verifica a conexão
    if ($conn->connect_error) {
        throw new Exception('Erro de Conexão: ' . $conn->connect_error);
    }

    // Tipo a ser buscado (MD neste caso)
    $tipo = "MD";

    // Consulta SQL para obter dados da tabela monitores
    $sqlMonitores = "SELECT nome, ra, email FROM monitores WHERE tipo = 'MD'";
    $resultMonitores = $conn->query($sqlMonitores);

    // Consulta SQL para obter dados da tabela horariosmonitoria
    $sqlHorarios = "SELECT h.* , d.nome AS nomeDisciplina
    FROM `horariosmonitoria` h
    INNER JOIN `disciplinas` d on (h.DisciplinaID = d.ID)
    LIMIT 5 ;";
    $resultHorarios = $conn->query($sqlHorarios);

    // Verifica erros nas execuções das consultas
    if (!$resultMonitores || !$resultHorarios) {
        throw new Exception('Erro na consulta SQL: ' . $conn->error);
    }

    // Converte os resultados em arrays associativos
    $dataMonitores = array();
    while ($row = $resultMonitores->fetch_assoc()) {
        $dataMonitores[] = $row;
    }

    $dataHorarios = array();
    while ($row = $resultHorarios->fetch_assoc()) {
        $dataHorarios[] = $row;
    }

    // Verifica se houve erro ao codificar para JSON
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Erro ao codificar dados para JSON: ' . json_last_error_msg());
    }

    // Logs de sucesso antes de enviar a resposta JSON
    error_log("Dados a serem enviados: Monitores - " . json_encode($dataMonitores) . ", Horarios - " . json_encode($dataHorarios));

    // Retorna os dados em formato JSON
    header('Content-Type: application/json');
    echo json_encode(array('monitores' => $dataMonitores, 'horarios' => $dataHorarios));

} catch (Exception $e) {
    // Captura exceções e retorna uma resposta de erro detalhada
    $errorResponse = array('error' => $e->getMessage());
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode($errorResponse);
    error_log('Erro no backend: ' . $e->getMessage());
} finally {
    // Fecha a conexão com o banco de dados
    if (isset($conn)) {
        $conn->close();
    }
}
?>
