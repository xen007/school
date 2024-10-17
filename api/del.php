<?php

header('Access-Control-Allow-Origin: *');
 header('Access-Control-Allow-Headers: *');

// $conn = new mysqli("localhost","root","","sign");

 $eData = file_get_contents("php://input");
 $dData = json_decode($eData, true); 

//     $id = $dData['id'];

// $sql = "DELETE FROM users WHERE id =$id";
// $mysqli = mysqli_query($conn, $sql);


// echo json_encode(['resultphp' => $json_data]);

$conn = new mysqli("localhost","root","","sign");
$sql = "SELECT * FROM users WHERE id = '$id'";

$mysqli = mysqli_query($conn, $sql);
$json_data = array();

while($row= mysqli_fetch_assoc($mysqli)){
    $json_data[] = $row;
}

echo json_encode(['resultphp' => $json_data]);



