<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

include 'Dbase.php';
$db = new Dbase;
$conn = $db->connect();
    $eData = file_get_contents("php://input"); // file_get_contents("php://input")Takes raw data from the request 
    $dData = json_decode($eData, true);
    
    $sql = "SELECT * from enseignant where matricule_Ens = '$dData[matricule]' and mot_de_passe = '$dData[pass]'";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array());
    $container = $stmt->fetch();
     //$response[result] pour initailiser l'etat de notre requete
    //$response['contain']= $container; // storage of values from bd in contain
    
    
    if(($container) && !empty($container)){ 
        $_SESSION['matricule']= $dData['matricule']; // if matricule during this session is valid, it takes the value of $matri and same for $pass
        $_SESSION['pass']= $dData['pass']; 
    
        if(isset($_SESSION['matricule'])){
           
            $response = ['status' => "successfully recorder, redirecting to a new page"] ;// if matricule is valid, result takes value of successfully recorder, redirecting to a new page
         
        
            
            
        }
    
        else{
            $response = ['status' => "No record"] ;
            
        }
    
     }
     echo json_encode($response);









?>