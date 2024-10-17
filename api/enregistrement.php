<?php
require('db.php');

    switch($method){

        case "GET":
            $pat = explode('/',$_SERVER['REQUEST_URI']);
            if(isset($pat[4])  && ($pat[4] !== '')){
                $json_array = array();
                $userid =$pat[4];
                // echo "user id is...".$userid; die;

                $getuserrow=mysqli_query($db_connect, "SELECT * FROM élève WHERE matricule_El='$userid' ");
                while($userrow = mysqli_fetch_array($getuserrow)){
                    $json_array['rowUserdata'] = array('id' =>$userrow['matricule_El'], 'matricule' =>$userrow['matricule_El'],'nom' =>$userrow['nom'],'genre' =>$userrow['genre'],'prénom' =>$userrow['prénom'],
                    'dateNaiss' =>$userrow['dateNaiss'],'classe' =>$userrow['classe'],'tuteur' =>$userrow['tuteur'],'adresse' =>$userrow['adresse'],'lieuNaiss' =>$userrow['lieuNaiss'],
                    'phone' =>$userrow['numéro_tuteur'],'infoSup' =>$userrow['infos_supplémentaire'],'niveau' =>$userrow['niveau'],'scolaire' =>$userrow['année_scolaire']
                
                 );
                }
                echo json_encode($json_array['rowUserdata']);
                return;

            }else{
                $alluser = mysqli_query($db_connect,"SELECT * FROM élève INNER JOIN classe on élève.classe = classe.id_classe  ");

                if(mysqli_num_rows($alluser) > 0){
                    while($row = mysqli_fetch_array($alluser)){
                        $json_array["userdata"][] = array('id' =>$row['matricule_El'], 'matricule' =>$row['matricule_El'],'nom' =>$row['nom'],'genre' =>$row['genre'],'prénom' =>$row['prénom'],'dateNaiss' =>$row['dateNaiss'],'classe' =>$row['libellé_classe']); 
                        
                    }
                    echo json_encode($json_array["userdata"]);
                    return;
                } else{
                    echo json_encode(["resultat"=>"Verifiez les informations SVP"]);
                    return;
                }
            }

        case "POST":
            if(isset($_FILES['photo'])){
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

            $photo = $_FILES['photo']['name'];
            $photo_temp= $_FILES['photo']['tmp_name'];
            $dest=$_SERVER['DOCUMENT_ROOT'].'/test/image'."/".$photo;

            $result = mysqli_query($db_connect, "INSERT INTO élève (matricule_EL, nom, prénom, dateNaiss, lieuNaiss, adresse, genre, tuteur, numéro_tuteur, niveau, classe, année_scolaire, photo, infos_supplémentaire, date_enregistrement) 
            VALUES ('$matricule','$nom' ,'$prénom', '$datenaiss', '$lieunaiss', '$adresse', '$genre', '$tuteur', '$phone', '$niveau' , '$classe', '$scolaire','$photo','$message', NOW())" );

                if($result){
                    move_uploaded_file($photo_temp,$dest);
                    echo json_encode(["success"=>"élève ajouté avec succès"]);
                    return;
                }else{
                    echo json_encode(["succes"=>"erreur lors de l'enregistrement"]);
                }
            }

            else{
                echo json_encode(["success", "Données dans un format incorrect"]);
            }

            case "DELETE":
        
                $pat = explode('/',$_SERVER['REQUEST_URI']);
                //echo "userid is.....".$pat[4]; 
    
                $deldata = mysqli_query($db_connect, "DELETE FROM élève WHERE matricule_El='$pat[4]' ");
    
                if($deldata){
                    echo json_encode(["success"=>"l'élève a été supprimé avec succès"]);
                    return;
                }else echo json_encode(['success'=>'Vérifiez les informations SVP']); 

            case "PUT":
        
                $userupdata = json_decode(file_get_contents("php://input"));
                
             
                    $userid = $userupdata->matricule;
                $nom = $userupdata->nom;
                $prénom = $userupdata->prénom;
                $dateNaiss = $userupdata->dateNaiss;
                $lieuNaiss = $userupdata->lieuNaiss;
                $genre = $userupdata->genre;
                $adresse = $userupdata->adresse;
                $tuteur = $userupdata->tuteur;
                $phone = $userupdata->phone;                
                $niveau = $userupdata->niveau;                
                $classe = $userupdata->classe;                
                $scolaire = $userupdata->scolaire;                
                $message = $userupdata->infoSup; 
                     

                $photo = $_FILES['photo']['name'];
                $photo_temp= $_FILES['photo']['tmp_name'];
                $dest=$_SERVER['DOCUMENT_ROOT'].'/test/image'."/".$photo;


                $updatedata = mysqli_query($db_connect, "UPDATE élève SET nom = '$nom', prénom = '$prénom',lieuNaiss = '$lieuNaiss', dateNaiss = '$dateNaiss', adresse = '$adresse', genre = '$genre', tuteur = '$tuteur',
                numéro_tuteur = '$phone', photo = '$photo', niveau = '$niveau',classe = '$classe', année_scolaire = '$scolaire',infos_supplémentaire = '$message' WHERE matricule_El='$userid' ");
    
                if($updatedata){
                    move_uploaded_file($photo,$dest);
                    echo json_encode(["success"=>"user updated successfully"]);
                    return;
                }else echo json_encode(['success'=>'Please Check to user Data']); return;
                
               
                // echo 'success take';
                // print_r($userupdata);
               

    }



// fonction de verification des entrees
function checkInput($data){
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}