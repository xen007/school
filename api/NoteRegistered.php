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
$classes = intval($pat[4]);
$sql = "SELECT * FROM eleve WHERE Salle_classe = $classes ";
$stmt = $conn->prepare($sql);
$stmt-> execute();
$users= $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($users);       
}
else{
    $users = '';
    echo json_encode($users);  
}

?>
