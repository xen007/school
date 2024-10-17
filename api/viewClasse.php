<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');


include 'Dbase.php';
$db = new Dbase;
$conn = $db->connect();
    $pat = explode('/',$_SERVER['REQUEST_URI']);
        
    if(isset($pat[4])  && ($pat[4] !== '')){
        $json_array = array();
        $userid =$pat[4];
        $sql = "SELECT * FROM classe WHERE niveau='$userid'";
    $stmt = $conn->prepare($sql);
    $stmt-> execute();
    $users= $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($users);
        return;  return;
        }

?>