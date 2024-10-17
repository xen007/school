<?php
error_reporting(E_ALL);
ini_set('display_errors',1);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');


include 'Dbase.php';
$db = new Dbase;
$conn = $db->connect();
$json_array = array();
$sql = "SELECT * FROM sequence";
$stmt = $conn->prepare($sql);
$stmt-> execute();
$users= $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($users);

?>