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
$json_array = array();
$classe = $pat[4];
$sql = "SELECT * FROM matiere WHERE classe_id = '$classe' ";
$stmt = $conn->prepare($sql);
$stmt-> execute();
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($users);
return;


?>