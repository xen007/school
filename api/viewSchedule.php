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
    $classid =intval($pat[4]);
//$sql = "SELECT * FROM cours";
$sql = "SELECT cours.*, matiere.id_matiere, matiere.nom_matiere, classe.libellee_classe, classe.id_classe, jour.libellee_jour, enseignant.nomE, enseignant.prenomE, enseignant.matricule_Ens FROM cours INNER JOIN matiere ON cours.matiere = matiere.id_matiere  INNER JOIN jour ON jour.id_jour=cours.jour INNER JOIN enseignant ON enseignant.matricule_Ens=cours.matriculeEnseignant INNER JOIN classe ON classe.id_classe = cours.classe_id WHERE classe.id_classe = $classid ORDER BY jour, debut_cours ASC";
$stmt = $conn->prepare($sql);
$stmt-> execute();
$users= $stmt->fetchAll(PDO::FETCH_ASSOC);
}
//while($users= $stmt->fetch(PDO::FETCH_ASSOC)){
    //$json_array['rowUserdata'] = array('id_heure' =>$users['id_heure'],'horaire' =>$users['horaire']); 
//};
else{
    $users = '';
}
echo json_encode($users);

?>