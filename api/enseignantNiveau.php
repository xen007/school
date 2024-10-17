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

if(isset($pat[4]) && ($pat[4] !== '')){
$json_array = array();
$matricule = $pat[4];
$sql = "SELECT cours.*, matiere.id_matiere, niveau.libellee_niveau, matiere.nom_matiere, classe.libellee_classe, classe.id_classe, jour.libellee_jour, jour.id_jour, enseignant.nomE, enseignant.prenomE FROM cours INNER JOIN matiere ON matiere = id_matiere INNER JOIN jour ON id_jour=jour INNER JOIN enseignant ON enseignant.matricule_Ens=matriculeEnseignant INNER JOIN classe ON classe.id_classe = cours.classe_id INNER JOIN niveau ON classe.niveau = niveau.id_niveau WHERE cours.matriculeEnseignant = '$matricule'";
$stmt = $conn->prepare($sql);
$stmt-> execute();
$users= $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($users);       
}
else{
    $users = '';
    echo json_encode($users);  
}

?>