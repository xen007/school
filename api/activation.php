<?php
require 'db.php'; // Inclure le fichier de connexion à la base de données

// Fonction pour générer le code d'activation basé sur le nom de l'école et l'année en cours
function generateActivationCode($schoolName) {
    return substr(md5($schoolName . date("Y")), 0, 15); // Utilise l'année en cours au lieu de l'heure actuelle
}

// Récupérer les données POST
$data = json_decode(file_get_contents('php://input'), true);
$schoolName = $data['schoolName'] ?? '';

// Vérifier si le nom de l'école est fourni
if (empty($schoolName)) {
    echo json_encode(['error' => 'Le nom de l\'école est requis.']);
    exit;
}

// Générer le code d'activation
$activationCode = generateActivationCode($schoolName);

// Chiffrer le code d'activation
$hashedCode = password_hash($activationCode, PASSWORD_DEFAULT);

// Insérer le code chiffré dans la base de données
$sql = "UPDATE activation SET code = ? WHERE id = 1";
$stmt = $db_connect->prepare($sql);
$stmt->bind_param("s", $hashedCode);

if ($stmt->execute()) {
    echo json_encode(['activationCode' => $activationCode]); // Afficher le code d'activation non chiffré pour le client
} else {
    echo json_encode(['error' => "Erreur : " . $stmt->error]);
}

$stmt->close();
$db_connect->close();
?>
