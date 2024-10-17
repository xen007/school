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
    $name = $_POST['name'];
    $prenom = $_POST['prenom'];
    $dn = $_POST['date_naiss'];
    $ln = $_POST['lieu_naiss'];
    $adresse = $_POST['adresse'];
    $civ = $_POST['civ'];
    $email = $_POST['email'];
    $pass = $_POST['pass'];
    $tel = $_POST['tel'];
    $matiere1 = $_POST['matiere1'];
    $matiere2 = $_POST['matiere2'];
    $matiere3 = $_POST['matiere3'];
    $lundi = $_POST['lundi'];
    $mardi = $_POST['mardi'];
    $mercredi = $_POST['mercredi'];
    $jeudi = $_POST['jeudi'];
    $vendredi = $_POST['vendredi'];

    $updates = [];
    $params = [
        ':matricule' => $matricule,
        ':civ' => $civ,
        ':name' => $name,
        ':prenom' => $prenom,
        ':dn' => $dn,
        ':ln' => $ln,
        ':adresse' => $adresse,
        ':pass' => $pass,
        ':email' => $email,
        ':tel' => $tel,  
        ':matieres1' => $matiere1,
        ':matieres2' => $matiere2,
        ':matieres3' => $matiere3
        
    ];

    if (!empty($_FILES['img']['name'])) {
        $image = $_FILES['img']['name'];
        $image_temp = $_FILES['img']['tmp_name'];
        $dest = $_SERVER['DOCUMENT_ROOT'] . '/ssm/api/imageTeacher/' . $image;
        $updates[] = "photo = :image";
        $params[':image'] = $image;
        move_uploaded_file($image_temp, $dest);
    }

    if (!empty($_FILES['cni']['name'])) {
        $cni = $_FILES['cni']['name'];
        $cni_temp = $_FILES['cni']['tmp_name'];
        $dest2 = $_SERVER['DOCUMENT_ROOT'] . '/ssm/api/cni/' . $cni;
        $updates[] = "cni = :cni";
        $params[':cni'] = $cni;
        move_uploaded_file($cni_temp, $dest2);
    }

    if (!empty($_FILES['cv']['name'])) {
        $cv = $_FILES['cv']['name'];
        $cv_temp = $_FILES['cv']['tmp_name'];
        $dest3 = $_SERVER['DOCUMENT_ROOT'] . '/ssm/api/cv/' . $cv;
        $updates[] = "cv = :cv";
        $params[':cv'] = $cv;
        move_uploaded_file($cv_temp, $dest3);
    }

    $sql = "UPDATE enseignant SET civilitee = :civ, nomE = :name, prenomE = :prenom, dateNaiss = :dn, lieuNaiss = :ln, adresse = :adresse, matiere1 = :matieres1, matiere2 = :matieres2, matiere3 = :matieres3, mot_de_passe = :pass, email = :email, telephone = :tel" 
        . (count($updates) > 0 ? ', ' . implode(', ', $updates) : '') 
        . " WHERE matricule_Ens = :matricule";

    $stmt = $conn->prepare($sql);

    if ($stmt->execute($params)) {
        
        $sql1 = "UPDATE jourdispo SET lundi='$lundi',mardi='$mardi',mercredi='$mercredi',jeudi='$jeudi',vendredi='$vendredi' WHERE matricule_Ens = '$matricule'";
        $stmt1 = $conn->prepare($sql1);
        $stmt1->execute();
        $response = ['status' => 'enseignant modifie'];
    } else {
        $response = ['status' => 'No records'];
    }
}

echo json_encode($response);
?>
