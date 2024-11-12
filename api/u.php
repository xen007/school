<?php
   require('db.php');
    //parcour de la méthode d'envoi de l'url
    switch($method){
        case "POST"://donnes envoyes avec la methode post
            $matricule = checkInput($_POST['matricule']);
            $nom = checkInput($_POST['nom']);
            $prénom = checkInput($_POST['prénom']);
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
            $scolaire = checkInput($_POST['scolaire']);
            $message = checkInput($_POST['infoSup']);
        if(isset($_FILES['photo'])){ //si la photo doit eter modifié
            // manipulation des informations de la photo
            $photo = $_FILES['photo']['name'];
            $photo_temp= $_FILES['photo']['tmp_name'];
            $dest=$_SERVER['DOCUMENT_ROOT'].'/ssm/api/image'."/".$photo;
            // requete de mis a jour
            $updatedata = mysqli_query($db_connect, "UPDATE eleve SET nom = '$nom', prenom = '$prénom', lieuNaiss = '$lieuNaiss', dateNaiss = '$dateNaiss', adresse = '$adresse', genre = '$genre', tuteur = '$tuteur',
                numero_tuteur = '$phone',profession_tuteur = '$ptuteur' ,mere = '$mere' ,numero_mere = '$phoneM' ,profession_mere = '$pmere',   photo = '$photo', niveau = '$niveau',classe = '$classe' ,redoublant = '$redoublant',  annee_scolaire = '$scolaire',
                infos_supplementaire = '$message' WHERE matricule_El='$matricule' ");
    
                if($updatedata){
                    // verifie que la photo est gardé et met a jour les informations
                    move_uploaded_file($photo_temp,$dest);
                    echo json_encode(["success"=>"eleve modifié avec succès"]);
                    return;
                }else{
                    echo json_encode(["succes"=>"erreur lors de la modification"]);
                }
            }
            else{ // au cas ou la photo n'est pas modofier
                $updatedata = mysqli_query($db_connect, "UPDATE eleve SET nom = '$nom', prenom = '$prénom', lieuNaiss = '$lieuNaiss', dateNaiss = '$dateNaiss', adresse = '$adresse', genre = '$genre', tuteur = '$tuteur',
                numero_tuteur = '$phone',profession_tuteur = '$ptuteur' ,mere = '$mere' ,numero_mere = '$phoneM' ,profession_mere = '$pmere', 
                 niveau = '$niveau',classe = '$classe',redoublant = '$redoublant',annee_scolaire = '$scolaire',infos_supplementaire = '$message' WHERE matricule_El='$matricule' ");
                 if($updatedata){
                    // en cas de succes
                    echo json_encode(["success"=>"eleve modifié avec succès"]);
                    return;
                }else{
                    echo json_encode(["succes"=>"erreur lors de la modification"]);
                }
            }
        }
        // function de verification de la fiabilite des saisies envoyes
        function checkInput($data){
            $data = trim($data);
            $data = stripslashes($data);
            $data = htmlspecialchars($data);
            return $data;
        }