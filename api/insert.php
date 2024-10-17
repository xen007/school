<?php

require 'db.php';  //requiert le fichier de configuration de la bd
//innitialisation des variables a utiliser
$tuteur =$matricule =$nom =$prénom =$datenaiss =$lieunaiss =$genre = $niveau =$classe =$adresse =$scolaire =$photo =$message ="";

$tuteurErr =$numéroErr =$matriculeErr =$nomErr =$prénomErr =$datenaissErr =$lieunaissErr =$genreErr = $niveauErr =$classeErr =$adresseErr =$scolaireErr =$photoErr =$messageErr ="";

if(!empty($_POST)){ //si y'a un formulaire soumis

   if(empty($_POST['add'])){ //si le formulaire est nommé add
//affectation des différentes valeurs récupérés qux variables
    $matricule = checkInput($_POST['matricule']);
    $nom = checkInput($_POST['nom']);
    $prénom = checkInput($_POST['prénom']);
    $datenaiss = checkInput($_POST['datenaiss']);
    $lieunaiss = checkInput($_POST['lieunaiss']);
    $adresse = checkInput($_POST['adresse']);
    $genre = checkInput($_POST['genre']);
    $tuteur = checkInput($_POST['tuteur']);
    $phone = checkInput($_POST['phone']);
    $niveau = checkInput($_POST['niveau']);
    $classe = checkInput($_POST['classe']);
    $scolaire = checkInput($_POST['scolaire']);
    
    $photo          = strtolower(checkInput($_FILES['photo']['name']));
    $photoPath      = 'images/' .basename($photo);
    $photoExtension = pathinfo($photoPath, PATHINFO_EXTENSION);
    $message = checkInput($_POST['message']);


//variables de test de validité
        $isSuccess      = true; 
        $isUpload       = false;

        //verifications des chars libres
        if(empty($matricule)){        //function vide: eske le la var si est vide
            $matriculeErr = "essayez un matricule...";
            $isSuccess = false;
        }
        if(empty($nom)){        //function vide: eske le la var si est vide
            $nomErr = "essayez un nom...";
            $isSuccess = false;
        }
        if(empty($prénom)){        //function vide: eske le la var si est vide
            $prénomErr = "essayez un prenom...";
            $isSuccess = false;
        }
        if(empty($datenaiss)){        //function vide: eske le la var si est vide
            $datenaissErr = "essayez une date...";
            $isSuccess = false;
        }
        if(empty($lieunaiss)){        //function vide: eske le la var si est vide
            $lieunaissErr = "essayez le lieu aussi...";
            $isSuccess = false;
        }
        if(empty($genre)){        //function vide: eske le la var si est vide
            $genreErr = "entrez le genre..";
            $isSuccess = false;
        }
        
        if(empty($classe)){        //function vide: eske le la var si est vide
            $classeErr = "essayz une classe...";
            $isSuccess = false;
        }elseif($classe === 'Sélectionnez une classe'){
            $classeErr = "tapez le niveau de l'élève...";
            $isSuccess = false;
        }
        
        if(empty($adresse)){        //function vide: eske le la var si est vide
            $adresseErr = "essayz une adresse...";
            $isSuccess = false;
        }
        if(empty($scolaire)){        //function vide: eske le la var si est vide
            $scolaireErr = "essayz une annee scolaire...";
            $isSuccess = false;
        }
        if(empty($message)){        //function vide: eske le la var si est vide
            $messageErr = "mettez RAS si aucune information...";
            $isSuccess = false;
        }

       
        if(empty($photo)){
            $photoErr = 'photo absente';
            $isSuccess = false;
            }else{

            $isUpload = true;
            if($photoExtension != "jpg" && $photoExtension != "png" && $photoExtension != "jpeg" && $photoExtension != "gif" ) {
                $photoErr = "Les formats authorisés sont: .jpg, .jpeg, .png, .gif";
                $isUpload = false;
            }
            if(file_exists($photoPath)) {
                $photoErr = "l'imae existe déja";
                $isUploadSuccess = false;
            }
            if($_FILES["photo"]["size"] > 10000000) {
                $photoErr = "la pphoto de doit pas dépasser 10MB";
                $isUpload = false;
            }
            if($isUpload) {
                if(!move_uploaded_file($_FILES["photo"]["tmp_name"], $photoPath)) {
                    $photoErr = "Il y a eu une erreur lors de l'upload";
                    $isUpload = false;
                } 
            }
        }
        //en cas de sucess inserer les valeurs
        if($isSuccess && $isUpload ){
     
        
        $db = Database::connect();
        $req = $db->prepare("INSERT INTO `élève` (matricule_EL, nom, prénom, dateNaiss, lieuNaiss, adresse, genre, tuteur, numéro_tuteur, niveau, classe, année_scolaire, photo, infos_supplémentaire, date_enregistrement) 
        VALUES (?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?, NOW())");
                $req->execute(array($matricule ,$nom ,$prénom ,$datenaiss ,$lieunaiss ,$adresse,$genre, $tuteur, $phone ,$niveau ,$classe ,$scolaire ,$photo ,$message));
        }  
        Database::disconnect();
       
        
    


   }     
  


}


// fonction de verification des entrees
function checkInput($data){
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

?>


<?php
    // initiateur et entête pour permette l'acces distant sur le serveur php et donc ses fichiers
    error_reporting(E_ALL);
    ini_set('display_errors',1);
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");

    //connexion à la base de données
    $db_connect = mysqli_connect("localhost" ,"root","", "test");
    if($db_connect === false){
        die("Error: could not connect".mysqli_connect_error());
    }
    //recupération de la méthode de transfert et reception de données
    $method=$_SERVER['REQUEST_METHOD'];
    //echo "test-----".$method; die;

    //parcour de la méthode d'envoi de l'url
    switch($method){
        case"GET"://methode de récupération de données    
            // décompose l'url   
            $pat = explode('/',$_SERVER['REQUEST_URI']);
            //verifie si le chemin url est atteint et s'il n'est pas vide    
                if(isset($pat[4])  && ($pat[4] !== '') && ($pat[4] == '') ){
                    $json_array = array(); 
                    $userid =$pat[4];
                    $alluser = mysqli_query($db_connect,"SELECT * FROM $userid ");
                    if(mysqli_num_rows($alluser) > 0){
                        //vérifie si les informations sont disponibles et les récupères
                        while($row = mysqli_fetch_array($alluser)){
                            if ($userid == 'sequence') {
                                $json_array["seqdata"][] = array('id' =>$row['id'], 'idsequence' =>$row['id'],'libellee' =>$row['libellee_sequence'],'debut' =>$row['date_debut'],'fin' =>$row['date_fin']); 
                            }elseif ($userid == 'trimestre') {
                                $json_array["seqdata"][] = array('id' =>$row['id'], 'idtrimestre' =>$row['id'],'libellee' =>$row['libellee_trimestre'],'debut' =>$row['date_debut'],'fin' =>$row['date_fin']); 
                            }else{
                            $annee = '2024-2025';
                            $json_array["seqdata"][] = array('id' =>$row['id'],'libellee' => $annee,'debut' =>$row['date_debut'],'fin' =>$row['date_fin']); 
                            }
                        }
                        //affiche les informations récupérés
                        echo json_encode($json_array['seqdata']);
                        return;
                    }
                }elseif(isset($pat[4])  && ($pat[4] !== '')){
                    $userupdata = json_decode(file_get_contents("php://input"));
                    $tab =$_GET['tab'];
                    $userid =$_GET['id'];
                    echo $tab;
                     //recupères toutes les informations de la table
                    $alluser = mysqli_query($db_connect,"SELECT * FROM $tab WHERE id = $userid");
                    if(mysqli_num_rows($alluser) > 0){
                        //vérifie si les informations sont disponibles et les récupères
                        while($row = mysqli_fetch_array($alluser)){
                            if ($userid == 'sequence') {
                                $json_array["seqdata"][] = array('id' =>$row['id'], 'idsequence' =>$row['id'],'libellee' =>$row['libellee_sequence'],'debut' =>$row['date_debut'],'fin' =>$row['date_fin']); 
                            }elseif ($userid == 'trimestre') {
                                $json_array["seqdata"][] = array('id' =>$row['id'], 'idtrimestre' =>$row['id'],'libellee' =>$row['libellee_trimestre'],'debut' =>$row['date_debut'],'fin' =>$row['date_fin']); 
                            }else{
                            $annee = '2024-2025';
                            $json_array["seqdata"][] = array('id' =>$row['id'],'libellee' => $annee,'debut' =>$row['date_debut'],'fin' =>$row['date_fin']); 
                            }
                        }
                        //affiche les informations récupérés
                        echo json_encode($json_array['seqdata']);
                        return;
                    } else{
                        // au cas contraire renvoyer l'erreur
                        echo json_encode(["resultat"=>"Verifiez les informations SVP"]);
                        return;
                    }
                }

                case"PUT"://methode d'update
                    $userupdata = json_decode(file_get_contents("php://input"));
                    // echo 'success take';
                    // print_r($userupdata);
                    //données envoyées
                    $userid = $userupdata->idsequence;
                    $nom = $userupdata->libellé_sequence;
                    $niveau = $userupdata->niveau;
                    $capacité = $userupdata->capacité; 
                    //requete de mis a jour
                    $updatedata = mysqli_query($db_connect, "UPDATE sequence SET libellee_sequence = '$nom', niveau = '$niveau', capaciteAcceuil = '$capacité'  WHERE id_sequence='$userid' ");
                    if($updatedata){
                        //en cas de succes afficher
                        echo json_encode(["success"=>"sequence modifiée avec succès"]);
                        return;
                    }else echo json_encode(['success'=>'Verifiez les informations SVP']); 

        
}