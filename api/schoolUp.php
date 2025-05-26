<?php
require('db.php');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "GET":
        $pat = explode('/', trim($_SERVER['REQUEST_URI'], '/')); // Trim leading/trailing slashes

        if (isset($pat[3]) && is_numeric($pat[3])) { // Updated index for cleaner routing
            $userid = intval($pat[3]);

            // Using prepared statement to prevent SQL injection
            $stmt = $db_connect->prepare("SELECT * FROM ecole WHERE id_ecole = ?");
            $stmt->bind_param("i", $userid);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                echo json_encode([
                    'id' => $row['id_ecole'],
                    'nomec' => $row['nom_ecole'],
                    'devise' => $row['devise'],
                    'logo' => $row['logo'],
                    'bp' => $row['bp'],
                    'contact' => $row['contact'],
                    'adresse' => $row['adresse'],
                    'responsable' => $row['responsable'],
                    'sign' => $row['signature'] // Adding "sign" to the response
                ]);
            } else {
                echo json_encode(["error" => "Aucune donnée trouvée pour cet ID"]);
            }

            $stmt->close();
        } else {
            echo json_encode(["error" => "ID invalide"]);
        }
        break;

    case "POST":
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $userid = intval($_POST['id']);
            $devise = $_POST['devise'] ?? '';
            $nomec = $_POST['nomec'] ?? '';
            $bp = $_POST['bp'] ?? '';
            $contact = $_POST['contact'] ?? '';
            $adresse = $_POST['adresse'] ?? '';

            // File upload handling for logo and signature
            function uploadFile($file, $folder) {
                if ($file && $file['error'] === UPLOAD_ERR_OK) {
                    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
                    if (!in_array($file['type'], $allowedTypes)) {
                        return ["error" => "Format de fichier invalide. Seuls les images JPG, PNG et GIF sont autorisées."];
                    }

                    $filename = basename($file['name']);
                    $file_temp = $file['tmp_name'];
                    $dest = $_SERVER['DOCUMENT_ROOT'] . "/ssm/api/{$folder}/" . $filename;

                    if (move_uploaded_file($file_temp, $dest)) {
                        return ["success" => $filename];
                    } else {
                        return ["error" => "Échec du téléchargement de {$folder}"];
                    }
                }
                return null; // No file uploaded
            }

            $logo = uploadFile($_FILES['logo'] ?? null, "logo");
            $sign = uploadFile($_FILES['sign'] ?? null, "signature");

            if (isset($logo['error']) || isset($sign['error'])) {
                echo json_encode(["error" => $logo['error'] ?? $sign['error']]);
                return;
            }

            // Using prepared statement for the update query
            $query = "UPDATE ecole SET nom_ecole = ?, devise = ?, bp = ?, contact = ?, adresse = ?";
            $params = [$nomec, $devise, $bp, $contact, $adresse];
            $types = "sssss";

            if ($logo) {
                $query .= ", logo = ?";
                array_push($params, $logo['success']);
                $types .= "s";
            }
            if ($sign) {
                $query .= ", signature = ?";
                array_push($params, $sign['success']);
                $types .= "s";
            }

            $query .= " WHERE id_ecole = ?";
            array_push($params, $userid);
            $types .= "i";

            $stmt = $db_connect->prepare($query);
            $stmt->bind_param($types, ...$params);

            if ($stmt->execute()) {
                echo json_encode(["success" => "Données mises à jour avec succès"]);
            } else {
                echo json_encode(["error" => "Échec de la mise à jour"]);
            }

            $stmt->close();
        }
        break;

    default:
        echo json_encode(["error" => "Méthode non supportée"]);
}
?>
