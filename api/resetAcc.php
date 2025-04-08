<?php
include 'db.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$data = json_decode(file_get_contents('php://input'), true);

if ($data && isset($data['username'])) {
    $username = $data['username'];
    
    // Reset the user account with the default password '1234'
    $defaultPassword = password_hash('1234', PASSWORD_DEFAULT);

    $updateUserQuery = "UPDATE users SET password = ? WHERE username = ?";
    $updateUserStmt = $db_connect->prepare($updateUserQuery);
    $updateUserStmt->bind_param("ss", $defaultPassword, $username);

    if ($updateUserStmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Compte réinitialisé avec succès']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Échec de la réinitialisation du compte']);
    }

    $updateUserStmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Nom d\'utilisateur non fourni']);
}

$db_connect->close();
?>
