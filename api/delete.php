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
        if(isset($pat[4])  && ($pat[4] !== '')){
            $json_array = array();
            $userid = $pat[4];
            $sql = "DELETE FROM enseignant WHERE matriculeEns='$userid'";
            $stmt = $conn->prepare($sql);

            if( $stmt-> execute()){
                echo json_encode(["resultat"=>"Delated"]);
                return;
            }
            else{
            echo json_encode($userid);
                return; 
            }
        } 
        
        
        else{
                
            echo json_encode(["resultat"=>"Error"]);
            return;
        }
?>