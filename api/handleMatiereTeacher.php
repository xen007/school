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
        $classe_id =$pat[4];
        if (ctype_digit($classe_id)) {
        $sql = "SELECT distinct id_matiere, nom_matiere FROM  matiere where classe = $classe_id";
        }else{
            $sql = "SELECT distinct id_matiere, nom_matiere FROM  matiere where classe.libellee_classe ='$classe_id'";   
        }
        $stmt = $conn->prepare($sql);
    $stmt-> execute();
    $users= $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($users);
        return;}
        else{
                
            echo json_encode(["resultat"=>"Verifiez les informations SVP"]);
                return;
           }
?>