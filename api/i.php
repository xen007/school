<?php
require('db.php');

    switch($method){
        case "POST"://methode de récupération de données    
           
            $matricule = checkInput($_POST['matricule']);
            $nom = checkInput($_POST['nom']);
            $prénom = checkInput($_POST['prénom']);
            $datenaiss = checkInput($_POST['dateNaiss']);
            $lieunaiss = checkInput($_POST['lieuNaiss']);
            $adresse = checkInput($_POST['adresse']);
            $genre = checkInput($_POST['genre']);
            $tuteur = checkInput($_POST['tuteur']);
            $phone = checkInput($_POST['phone']);
            $niveau = checkInput($_POST['niveau']);
            $classe = checkInput($_POST['classe']);
            $scolaire = checkInput($_POST['scolaire']);
            $message = checkInput($_POST['infoSup']);

            if(isset($_FILES['photo'])){ //si une photo a etet envoye
                
            $photo = $_FILES['photo']['name'];
            $photo_temp= $_FILES['photo']['tmp_name'];
            $dest=$_SERVER['DOCUMENT_ROOT'].'/ssm/api/image'."/".$photo;

            }
            else{
                $photo = '';
                $photo_temp='';
                $dest=$_SERVER['DOCUMENT_ROOT'].'/ssm/api/image'."/".$photo;
            }
            
            $result = mysqli_query($db_connect, "INSERT INTO eleve (matricule_EL, nom, prenom, dateNaiss, lieuNaiss, adresse, genre, tuteur, numero_tuteur, niveau, classe, annee_scolaire, photo, infos_supplementaire, date_enregistrement) 
            VALUES ('$matricule','$nom' ,'$prénom', '$datenaiss', '$lieunaiss', '$adresse', '$genre', '$tuteur', '$phone', '$niveau' , '$classe', '$scolaire','$photo','$message', NOW())" );
                if($result){
                    // stocker les informations relatives a la photo
                    move_uploaded_file($photo_temp,$dest);
                    // ajouter l'eleve au decompte de la classe
                    $recup =  mysqli_query($db_connect,"SELECT * FROM eleve where classe = '$classe' ");
                    $cap  = mysqli_num_rows($recup);
                    // calcul du nombre d'eleve
                    $ncap = $cap+=1;
                    $resut=mysqli_query($db_connect,"UPDATE classe set nombre_eleve='$ncap' WHERE id_classe = '$classe' ");
                    if($resut){
                        // en cas de succes
                        echo json_encode(["success"=>"eleve ajouté avec succès"]);
                        return;
                    }
                
                }else{
                    // cas erreur lors de l'inserssion
                    echo json_encode(["succes"=>"erreur lors de l'enregistrement"]);
                }
        }


        function checkInput($data){
            $data = trim($data);
            $data = stripslashes($data);
            $data = htmlspecialchars($data);
            return $data;
        }