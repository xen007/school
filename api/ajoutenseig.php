<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');


include 'Dbase.php';
$db = new Dbase;
$conn = $db->connect();

$method=$_SERVER['REQUEST_METHOD'];
    //echo "ssm-----".$method; die;

    switch($method){


        case "POST":
            if(isset($_FILES['img'])){
            $matricule = checkInput($_POST['mat']);
            $nom = checkInput($_POST['name']);
            $prenom = checkInput($_POST['prenom']);
            $date_naiss = checkInput($_POST['date_naiss']);
            $lieu_naiss = checkInput($_POST['lieu_naiss']);
            $adresse = checkInput($_POST['adresse']);
            $genre = checkInput($_POST['civ']);
            $tel = checkInput($_POST['tel']);
            $email = checkInput($_POST['email']);
            $pass = checkInput($_POST['pass']);
            $matiere1 = checkInput($_POST['matiere1']);
            $matiere2 = checkInput($_POST['matiere2']);
            $matiere3 = checkInput($_POST['matiere3']);
            $lundi = checkInput($_POST['lundi']);
            $mardi = checkInput($_POST['mardi']);
            $mercredi = checkInput($_POST['mercredi']);
            $jeudi = checkInput($_POST['jeudi']);
            $vendredi = checkInput($_POST['vendredi']);
            $photo = $_FILES['img']['name'];
            $photo_temp= $_FILES['img']['tmp_name'];
            $dest1 =$_SERVER['DOCUMENT_ROOT'].'/ssm/api/imageTeacher'."/".$photo;

            $cv = $_FILES['cv']['name'];
            $cv_temp = $_FILES['cv']['tmp_name'];
            $dest2 = $_SERVER['DOCUMENT_ROOT'].'/ssm/api/cni'."/".$cv;

            $cni = $_FILES['cni']['name'];
            $cni_temp= $_FILES['cni']['tmp_name'];
            $dest3 = $_SERVER['DOCUMENT_ROOT'].'/ssm/api/cv'."/".$cni;


            $sql = "INSERT INTO `enseignant` (matricule_Ens,civilitee, nomE, prenomE, dateNaiss, lieuNaiss, adresse, matiere1,matiere2,matiere3, mot_de_passe, email, telephone, photo, cni, cv) VALUES ('$matricule', '$genre', '$nom' ,'$prenom', '$date_naiss', '$lieu_naiss', '$adresse', '$matiere1', '$matiere2', '$matiere3', '$pass','$email', '$tel', '$photo','$cni', '$cv')";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
                if($stmt){
                    $sql1 = "INSERT INTO `jourdispo` (matricule_Ens,lundi, mardi, mercredi, jeudi, vendredi) VALUES ('$matricule', '$lundi', '$mardi' ,'$mercredi', '$jeudi', '$vendredi')";
                    $stmt1 = $conn->prepare($sql1);
                    $stmt1->execute();
                    move_uploaded_file($photo_temp,$dest1);
                    move_uploaded_file($cv_temp,$dest2);
                    move_uploaded_file($cni_temp,$dest3);
                    echo json_encode(["success"=>"ajouté avec succès"]);
                    return;
                }else{
                    echo json_encode(["succes"=>"erreur lors de l'enregistrement"]);
                }
            }

            else{
                echo json_encode(["success", "Donnees dans un format incorrect"]);
            }
        }


        function checkInput($data){
            $data = trim($data);
            $data = stripslashes($data);
            $data = htmlspecialchars($data);
            return $data;
        }

?>