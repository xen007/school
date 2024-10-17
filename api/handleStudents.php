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
        $classe_El =$pat[4];
        if (ctype_digit($classe_El)) {
        $sql = "SELECT matricule_El, prenom, nom FROM eleve WHERE classe = $classe_El";}
        else{ $sql = "SELECT matricule_El, prenom, nom FROM eleve inner join classe on eleve.classe = classe.id_classe WHERE classe.libellee_classe = '$classe_El'";}
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