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
        $matricule_Ens =$pat[4];
        $classe_id = $pat[5];
        if (ctype_digit($classe_id)) {
        $sql = "SELECT distinct cours.matriculeEnseignant, matiere.nom_matiere, matiere.id_matiere FROM cours inner join matiere on cours.matiere = matiere.id_matiere where cours.classe_id = $classe_id AND matriculeEnseignant = '$matricule_Ens'";
        }else{
            $sql = "SELECT distinct cours.matriculeEnseignant, matiere.nom_matiere, matiere.id_matiere FROM cours inner join matiere on cours.matiere = matiere.id_matiere inner join classe on cours.classe_id = classe.id_classe where classe.libellee_classe ='$classe_id' AND matriculeEnseignant = '$matricule_Ens'";   
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