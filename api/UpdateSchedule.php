<?php
error_reporting(E_ALL);
ini_set('display_errors',1);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');


include 'Dbase.php';
$db = new Dbase;
$conn = $db->connect();
$eData = file_get_contents("php://input"); // file_get_contents("php://input")Takes raw data from the request 
$dData = json_decode($eData, true);
$ensei = $dData['enseig'];
$salle = $dData['Salle'];
$mati = $dData['Matiere'];
$ddc = $dData['ddc'];
$fdc = $dData['fdc'];
$jour = $dData['jour'];
$pat = explode('/',$_SERVER['REQUEST_URI']);
$id_cours = $pat[4];
if(isset($pat[4])  && ($pat[4] !== '')){
    $json_array = array();
    $sql= "UPDATE cours SET matiere = '$mati', jour = '$jour', matriculeEnseignant = '$ensei', debut_cours = '$ddc', fin_cours = '$fdc' WHERE id_cours = '$id_cours'";
    $stmt = $conn->prepare($sql);
    if($stmt->execute()){
        $users = 'Data Updated';
    }
    else{$users = "Problème occured";}
    
 }

else{
    $users = 'failed to update';
}
echo json_encode($users);

?>