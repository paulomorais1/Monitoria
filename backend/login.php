<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');


// Receba dados do POST
$data = json_decode(file_get_contents("php://input"));

// Verifique as credenciais (substitua pelos dados do seu banco de dados)
$username = $data->username;
$password = $data->password;

// Exemplo: Verifica se o usuário é "admin" e a senha é "P@ssw0rdAdmin!"
$validUsername = 'admin';
$validPasswordHash = password_hash('P@ssw0rdAdmin!', PASSWORD_DEFAULT);

if ($username === $validUsername && password_verify($password, $validPasswordHash)) {
    echo json_encode(['authenticated' => true]);
} else {
    echo json_encode(['authenticated' => false]);
}
?>
