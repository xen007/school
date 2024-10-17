<?php
error_reporting(E_ALL);
ini_set('display_errors',1);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');


include 'Dbase.php';
$db = new Dbase;
$conn = $db->connect();
$note = $_POST['note'];
$pat = explode('/',$_SERVER['REQUEST_URI']);
$matricule = $pat[4];
$sequences = $pat[5];
$matiere = $pat[6];
$sequence = intval($sequences);
$matieres = intval($matiere);
$json_array = array();
if(isset($pat[4])  && ($pat[4] !== '')){
    if($sequence === 1){
        $sql= "UPDATE note SET note1 = $note WHERE matricule_El = '$matricule' AND id_matiere = '$matieres'";
        $stmt = $conn->prepare($sql);
        if($stmt->execute()){
        $users = 'Data Updated';
    }
    else{$users = "Problème occured";}
    
    }
    else if($sequence === 2){
        $sql= "UPDATE noters SET note2 = $note WHERE matricule_El = '$matricule' AND id_matiere = '$matieres'";
        $stmt = $conn->prepare($sql);
        if($stmt->execute()){
        $users = 'Data Updated';
    }
    else{$users = "Problème occured";}
    
    }
    else if($sequence === 3){
        $sql= "UPDATE noters SET note3 = $note WHERE matricule_El = '$matricule' AND id_matiere = '$matieres'";
        $stmt = $conn->prepare($sql);
        if($stmt->execute()){
        $users = 'Data Updated';
    }
    else{$users = "Problème occured";}
    
    }
    else if($sequence === 4){
        $sql= "UPDATE noters SET note1 = $note WHERE matricule_El = '$matricule' AND id_matiere = '$matieres'";
        $stmt = $conn->prepare($sql);
        if($stmt->execute()){
        $users = 'Data Updated';
    }
    else{$users = "Problème occured";}
    
    }
    else if($sequence === 5){
        $sql= "UPDATE noters SET note5 = $note WHERE matricule_El = '$matricule' AND id_matiere = '$matieres'";
        $stmt = $conn->prepare($sql);
        if($stmt->execute()){
        $users = 'Data Updated';
    }
    else{$users = "Problème occured";}
    
    }
    else if($sequence === 6){
        $sql= "UPDATE noters SET note6 = $note WHERE matricule_El = '$matricule' AND id_matiere = '$matieres'";
        $stmt = $conn->prepare($sql);
        if($stmt->execute()){
        $users = 'Data Updated';
    }
    else{$users = "Problème occured";}
    
    }
    
 }

else{
    $users = 'failed to update';
}
echo json_encode($users);

?>