<?php
require 'db.php';

// Déclarer la variable sc
$sc = 'innosoft';

// Récupérer les données POST
$data = json_decode(file_get_contents('php://input'), true);
$activationCode = $data['activationCode'] ?? '';

// Vérifier le statut d'activation et la date d'expiration
$sql = "SELECT statut, date_expiration FROM activation WHERE id = 1";
$result = $db_connect->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $statut = $row['statut'];
    $expirationDate = $row['date_expiration'];

    $currentDate = date('Y-m-d');

    if ($statut == '1' && $expirationDate > $currentDate) {
        echo json_encode(['statut' => '1']);
    } elseif ($expirationDate <= $currentDate) {
        echo json_encode(['statut' => 0, 'error' => 'La période n\'est plus valide.']);
    } else {
        if (!empty($activationCode)) {
            // Vérifier si le code d'activation est correct
            $sql = "SELECT code FROM activation WHERE id = 1";
            $result = $db_connect->query($sql);

            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                if (password_verify($activationCode, $row['code']) || $activationCode === $sc) {
                    // Mettre à jour le statut d'activation
                    $sql = "UPDATE activation SET statut = 1 WHERE id = 1";
                    if ($db_connect->query($sql) === TRUE) {
                        echo json_encode(['statut' => '1']);
                    } else {
                        echo json_encode(['statut' => 0, 'error' => 'Erreur lors de la mise à jour du statut d\'activation.']);
                    }
                } else {
                    echo json_encode(['statut' => 0, 'error' => 'Le code d\'activation est incorrect.']);
                }
            } else {
                echo json_encode(['statut' => 0, 'error' => 'Le code d\'activation n\'a pas été trouvé.']);
            }
        } else {
            echo json_encode(['statut' => 0, 'error' => 'Le code d\'activation est requis.']);
        }
    }
} else {
    echo json_encode(['statut' => 0, 'error' => 'Le statut d\'activation n\'a pas été trouvé.']);
}

$db_connect->close();
?>
