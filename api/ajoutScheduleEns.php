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
        $matiere_id =$pat[4];
        $jour_id =$pat[5];
        $sql1 = "SELECT libellee_jour FROM jour WHERE id_jour = $jour_id";
        $stmt1 = $conn->prepare($sql1);
        $stmt1-> execute();
        $users= $stmt1->fetch(PDO::FETCH_ASSOC);
        
        $teachers_day = $users['libellee_jour'];
        $sql = "SELECT enseignant.matricule_Ens, enseignant.nomE, enseignant.prenomE, matiere.id_matiere FROM matiere inner join enseignant on enseignant.matricule_Ens = matiere.matricule_Ens inner join jourdispo on enseignant.matricule_Ens = jourdispo.matricule_Ens  where matiere.id_matiere = '$matiere_id' AND jourdispo.$teachers_day = 1";
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