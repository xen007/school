<?php
require('db.php');

// Function to validate and sanitize input data
function checkInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Check the request method
switch ($method) {
    case "POST":
        // Retrieve and sanitize input data
        $matricule = checkInput($_POST['matricule']);
        $nom = checkInput($_POST['nom']);
        $prenom = checkInput($_POST['prénom']);
        $dateNaiss = checkInput($_POST['dateNaiss']);
        $lieuNaiss = checkInput($_POST['lieuNaiss']);
        $adresse = checkInput($_POST['adresse']);
        $genre = checkInput($_POST['genre']);
        $tuteur = checkInput($_POST['tuteur']);
        $phone = checkInput($_POST['phone']);
        $ptuteur = checkInput($_POST['ptuteur']);
        $mere = checkInput($_POST['mere']);
        $phoneM = checkInput($_POST['phoneM']);
        $pmere = checkInput($_POST['pmere']);
        $niveau = checkInput($_POST['niveau']);
        $classe = checkInput($_POST['classe']);
        $redoublant = checkInput($_POST['redoublant']);
        $sante = checkInput($_POST['sante']);
        $ancienete = checkInput($_POST['ancienete']);
        $acte = checkInput($_POST['acte']);
        $ethnie = checkInput($_POST['ethnie']);
        $malade = checkInput($_POST['malade']);
        $scolaire = checkInput($_POST['scolaire']);
        $message = checkInput($_POST['infoSup']);

        if (isset($_FILES['photo'])) {
            // Handle photo upload
            $photo = $_FILES['photo']['name'];
            $photo_temp = $_FILES['photo']['tmp_name'];
            $dest = $_SERVER['DOCUMENT_ROOT'] . '/ssm/api/image/' . $photo;

            // Update database with photo
            $query = "UPDATE eleve SET
                        nom = '$nom',
                        prenom = '$prenom',
                        lieuNaiss = '$lieuNaiss',
                        dateNaiss = '$dateNaiss',
                        adresse = '$adresse',
                        genre = '$genre',
                        tuteur = '$tuteur',
                        numero_tuteur = '$phone',
                        profession_tuteur = '$ptuteur',
                        mere = '$mere',
                        numero_mere = '$phoneM',
                        profession_mere = '$pmere',
                        photo = '$photo',
                        niveau = '$niveau',
                        classe = '$classe',
                        redoublant = '$redoublant',
                        annee_scolaire = '$scolaire',
                        infos_supplementaire = '$message',
                        sante = '$sante',
                        ancienete = '$ancienete',
                        acte = '$acte',
                        ethnie = '$ethnie',
                        malade = '$malade'
                      WHERE matricule_El = '$matricule'";
            $updateData = mysqli_query($db_connect, $query);

            if ($updateData) {
                move_uploaded_file($photo_temp, $dest); // Save the uploaded photo
                echo json_encode(["success" => "Élève modifié avec succès"]);
                return;
            } else {
                echo json_encode(["error" => "Erreur lors de la modification"]);
            }
        } else {
            // Update database without photo
            $query = "UPDATE eleve SET
                        nom = '$nom',
                        prenom = '$prenom',
                        lieuNaiss = '$lieuNaiss',
                        dateNaiss = '$dateNaiss',
                        adresse = '$adresse',
                        genre = '$genre',
                        tuteur = '$tuteur',
                        numero_tuteur = '$phone',
                        profession_tuteur = '$ptuteur',
                        mere = '$mere',
                        numero_mere = '$phoneM',
                        profession_mere = '$pmere',
                        niveau = '$niveau',
                        classe = '$classe',
                        redoublant = '$redoublant',
                        annee_scolaire = '$scolaire',
                        infos_supplementaire = '$message',
                        sante = '$sante',
                        ancienete = '$ancienete',
                        acte = '$acte',
                        ethnie = '$ethnie',
                        malade = '$malade'
                      WHERE matricule_El = '$matricule'";
            $updateData = mysqli_query($db_connect, $query);

            if ($updateData) {
                echo json_encode(["success" => "Élève modifié avec succès"]);
                return;
            } else {
                echo json_encode(["error" => "Erreur lors de la modification"]);
            }
        }
        break;
}
?>
