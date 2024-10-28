<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');

include 'Dbase.php';

$db = new Dbase();
$conn = $db->connect();

$response = ['status' => 'Verifier les données'];

if (isset($_POST['matricule'])) {
    $matricule = $_POST['matricule'];
    $name = $_POST['nom'];
    $prenom = $_POST['prenom'];
    $dn = $_POST['date_naiss'];
    $ln = $_POST['lieu_naiss'];
    $adresse = $_POST['adresse'];
    $civ = $_POST['civ'];
    $email = $_POST['email'];
    $pass = $_POST['pass'];
    $tel = $_POST['tel'];

    // Initialize the $updates array
    $updates = [];
    $params = [
        ':matricule' => $matricule,
        ':civ' => $civ,
        ':nom' => $name,
        ':prenom' => $prenom,
        ':date_naiss' => $dn,
        ':lieu_naiss' => $ln,
        ':adresse' => $adresse,
        ':pass' => $pass,
        ':email' => $email,
        ':tel' => $tel
    ];

    // Handle image upload
    if (!empty($_FILES['img']['name'])) {
        $image = $_FILES['img']['name'];
        $image_temp = $_FILES['img']['tmp_name'];
        $dest = $_SERVER['DOCUMENT_ROOT'] . '/ssm/api/imageTeacher/' . $image;
        $updates[] = "photo = :image";
        $params[':image'] = $image;
        move_uploaded_file($image_temp, $dest);
    }

    // Handle CNI upload
    if (!empty($_FILES['cni']['name'])) {
        $cni = $_FILES['cni']['name'];
        $cni_temp = $_FILES['cni']['tmp_name'];
        $dest2 = $_SERVER['DOCUMENT_ROOT'] . '/ssm/api/cni/' . $cni;
        $updates[] = "cni = :cni";
        $params[':cni'] = $cni;
        move_uploaded_file($cni_temp, $dest2);
    }

    // Handle CV upload
    if (!empty($_FILES['cv']['name'])) {
        $cv = $_FILES['cv']['name'];
        $cv_temp = $_FILES['cv']['tmp_name'];
        $dest3 = $_SERVER['DOCUMENT_ROOT'] . '/ssm/api/cv/' . $cv;
        $updates[] = "cv = :cv";
        $params[':cv'] = $cv;
        move_uploaded_file($cv_temp, $dest3);
    }

    // Base SQL query
    $sql = "UPDATE enseignant SET civilitee = :civ, nomE = :nom, prenomE = :prenom, dateNaiss = :date_naiss, lieuNaiss = :lieu_naiss, adresse = :adresse, mot_de_passe = :pass, email = :email, telephone = :tel";
    
    // Append file-related updates if any
    if (count($updates) > 0) {
        $sql .= ', ' . implode(', ', $updates);
    }
    
    // Complete the SQL query
    $sql .= " WHERE matricule_Ens = :matricule";

    // Prepare the statement
    $stmt = $conn->prepare($sql);

    // Execute the statement
    if ($stmt->execute($params)) {
        $response = ['status' => 'enseignant modifie'];
    } else {
        $response = ['status' => 'Erreur lors de la modification'];
    }
} else {
    $response = ['status' => 'Aucune donnée à modifier'];
}

echo json_encode($response);
?>
