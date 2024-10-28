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

 


            if(isset($_POST['mat'])){
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
            if($_POST['img'] || $_POST['img'] === 'undefined'){
                $photo = '';
            }else{
                
                $photo = $_FILES['img']['name'];
                $photo_temp= $_FILES['img']['tmp_name'];
                $dest1 =$_SERVER['DOCUMENT_ROOT'].'/ssm/api/imageTeacher'."/".$photo;  
            }
            
            if($_POST['cv'] || $_POST['cv'] === 'undefined'){
                $cv = '';
            }else{  
                $cv = $_FILES['cv']['name'];
            $cv_temp = $_FILES['cv']['tmp_name'];
            $dest2 = $_SERVER['DOCUMENT_ROOT'].'/ssm/api/cni'."/".$cv;
            }
            
            if($_POST['cni'] || $_POST['cni'] === 'undefined'){
                $cni = '';
            }else{
                $cni = $_FILES['cni']['name'];
                $cni_temp= $_FILES['cni']['tmp_name'];
                $dest3 = $_SERVER['DOCUMENT_ROOT'].'/ssm/api/cv'."/".$cni;
            }
            


            $sql = "INSERT INTO `enseignant` (matricule_Ens,civilitee, nomE, prenomE, dateNaiss, lieuNaiss, adresse, mot_de_passe, email, telephone, photo, cni, cv) VALUES ('$matricule', '$genre', '$nom' ,'$prenom', '$date_naiss', '$lieu_naiss', '$adresse', '$pass','$email', '$tel', '$photo','$cni', '$cv')";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
                if($stmt){
                    move_uploaded_file($photo_temp,$dest1);
                    move_uploaded_file($cv_temp,$dest2);
                    move_uploaded_file($cni_temp,$dest3);
                    $response = ["success"=>"ajoute avec succes"]; 
                    echo json_encode($response);
                    return;
                }else{
                    $response = ["succes"=>"erreur lors de l'enregistrement"];
                    echo json_encode($response);
                }
            }

            else{
                $response = ["success", "Donnees dans un format incorrect"];
                echo json_encode($response);
            }


        function checkInput($data){
            $data = trim($data);
            $data = stripslashes($data);
            $data = htmlspecialchars($data);
            return $data;
        }

?>