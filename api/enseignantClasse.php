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
$class = $pat[5];
if (ctype_digit($class)) {
$sql = "SELECT cours.*, matiere.id_matiere, niveau.libellee_niveau, niveau.id_niveau, matiere.nom_matiere, classe.libellee_classe, classe.id_classe, jour.libellee_jour, jour.id_jour, enseignant.nomE, enseignant.prenomE FROM cours INNER JOIN matiere ON cours.matiere = matiere.id_matiere INNER JOIN jour ON jour.id_jour=cours.jour INNER JOIN enseignant ON enseignant.matricule_Ens=cours.matriculeEnseignant INNER JOIN classe ON cours.classe_id = classe.id_classe INNER JOIN niveau ON classe.niveau = niveau.id_niveau WHERE cours.matriculeEnseignant = '$matricule' AND cours.classe_id = $class";
}else{
    $sql = "SELECT cours.*, matiere.id_matiere, niveau.libellee_niveau, niveau.id_niveau, matiere.nom_matiere, classe.libellee_classe, classe.id_classe, jour.libellee_jour, jour.id_jour, enseignant.nomE, enseignant.prenomE FROM cours INNER JOIN matiere ON cours.matiere = matiere.id_matiere INNER JOIN jour ON jour.id_jour=cours.jour INNER JOIN enseignant ON enseignant.matricule_Ens=cours.matriculeEnseignant INNER JOIN classe ON cours.classe_id = classe.id_classe INNER JOIN niveau ON classe.niveau = niveau.id_niveau WHERE cours.matriculeEnseignant = '$matricule' AND niveau.libellee_niveau = '$class'";   
}
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