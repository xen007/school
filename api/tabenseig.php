<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');
header("Access-Control-Allow-Methods: *");

include 'Dbase.php';
$db = new Dbase;
$conn = $db->connect();

    $sql = "SELECT * FROM enseignant ";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute(); 
    $enseig = $stmt -> fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($enseig);


?>