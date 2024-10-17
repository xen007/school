<?php

error_reporting(E_ALL);
ini_set('display_errors',1);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');


include 'Dbase.php';
$db = new Dbase;
$conn = $db->connect();
$pat = explode('/',$_SERVER['REQUEST_URI']);
if(isset($pat[5]) && ($pat[5] !== '')){
$json_array = array();
$matieres = $pat[4];
$sequences = $pat[5];
$matiere = intval($matieres);
$sequence = intval($sequences);
if($sequence === 1){
    $sql = "SELECT note1 AS note, eleve.matricule_El, eleve.prenom, eleve.nom FROM note INNER JOIN eleve ON note.matricule_El = eleve.matricule_El WHERE id_matiere = $matiere ";
    $stmt = $conn->prepare($sql);
    $stmt-> execute();
    $reel= $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($reel);
    return;
}else if($sequence === 2){
    $sql = "SELECT note2 AS note, eleve.matricule_El, eleve.prenom, eleve.nom FROM note INNER JOIN eleve ON note.matricule_El = eleve.matricule_El WHERE id_matiere = $matiere ";
    $stmt = $conn->prepare($sql);
    $stmt-> execute();
    $reel= $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($reel);
    return;  
}else if($sequence === 3){
    $sql = "SELECT note3 AS note, eleve.matricule_El, eleve.prenom, eleve.nom FROM note INNER JOIN eleve ON note.matricule_El = eleve.matricule_El WHERE id_matiere = $matiere ";
    $stmt = $conn->prepare($sql);
    $stmt-> execute();
    $reel= $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($reel);
    return;  
}else if($sequence === 4){
    $sql = "SELECT note4 AS note, eleve.matricule_elev, eleve.prenom, eleve.nom FROM noters INNER JOIN eleve ON note.matricule_El = eleve.matricule_El WHERE id_matiere = $matiere ";
    $stmt = $conn->prepare($sql);
    $stmt-> execute();
    $reel= $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($reel);
    return;  
}else if($sequence === 5){
    $sql = "SELECT note5 AS note, eleve.matricule_El, eleve.prenom, eleve.nom FROM note INNER JOIN eleve ON note.matricule_El = eleve.matricule_El WHERE id_matiere = $matiere ";
    $stmt = $conn->prepare($sql);
    $stmt-> execute();
    $reel= $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($reel);
    return;  
}else if($sequence === 6){
    $sql = "SELECT note6 AS note, eleve.matricule_El, eleve.prenom, eleve.nom FROM note INNER JOIN eleve ON note.matricule_El = eleve.matricule_El WHERE id_matiere = $matiere ";
    $stmt = $conn->prepare($sql);
    $stmt-> execute();
    $reel= $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($reel);
    return;  
}}

else{
    $reel = "";
    echo json_encode($reel);
    return; 
}

?>