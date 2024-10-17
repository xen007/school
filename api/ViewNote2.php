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
if(isset($pat[4]) && ($pat[4] !== '')){
$json_array = array();
$matiere = $pat[4];
$sequence = $pat[4];
if($sequence === 1){
    $sql = "SELECT note1 FROM noters  WHERE Matiere_id = $matiere ";
    $stmt = $conn->prepare($sql);
    $stmt-> execute();
    $reel= $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($reel);
    return;
}else if($sequence === 2){
    $sql = "SELECT note2 FROM noters  WHERE Matiere_id = $matiere ";
    $stmt = $conn->prepare($sql);
    $stmt-> execute();
    $reel= $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($reel);
    return;
}else if($sequence === 3){
    $sql = "SELECT note3 FROM noters  WHERE Matiere_id = $matiere ";
$stmt = $conn->prepare($sql);
$stmt-> execute();
$reel= $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($reel);
return;
}else if($sequence === 4){
    $sql = "SELECT note4 FROM noters  WHERE Matiere_id = $matiere ";
$stmt = $conn->prepare($sql);
$stmt-> execute();
$reel= $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($reel);
return;
}else if($sequence === 5){
    $sql = "SELECT note5 FROM noters  WHERE Matiere_id = $matiere ";
$stmt = $conn->prepare($sql);
$stmt-> execute();
$reel= $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($reel);
return;}
else if($sequence === 6){
    $sql = "SELECT note6 FROM noters  WHERE Matiere_id = $matiere ";
$stmt = $conn->prepare($sql);
$stmt-> execute();
$reel= $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($reel);
return;}
}
else{
    $reel = "";
    echo json_encode($reel);
    return; 
}

?>