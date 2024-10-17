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
    $cours_id = intval($pat[4]);

$sql = "SELECT cours.*, matiere.id_matiere, matiere.nom_matiere, classe.libellee_classe, classe.id_classe, jour.libellee_jour, jour.id_jour, enseignant.nomE, enseignant.prenomE FROM cours INNER JOIN matiere ON matiere = id_matiere  INNER JOIN jour ON id_jour=jour INNER JOIN enseignant ON enseignant.matricule_Ens=matriculeEnseignant INNER JOIN classe ON classe.id_classe = cours.classe_id WHERE cours.id_cours = '$cours_id'";
$stmt = $conn->prepare($sql);
$stmt-> execute();
/*$users= $stmt->fetchAll(PDO::FETCH_ASSOC);*/

while($users = $stmt->fetch(PDO::FETCH_ASSOC)){
    $json_array = array('cours'=>$users['id_cours'], 'matiere' =>$users['id_matiere'], 'libellee_classe' =>$users['libellee_classe'],'jour' =>$users['libellee_jour'], 'id_jour' =>$users['id_jour'], 'matriculeEns' =>$users['matriculeEnseignant'],'debut_cours' =>$users['debut_cours'],'fin_cours' =>$users['fin_cours'],'id_classe' =>$users['id_classe'], 'nom' =>$users['nomE'],'nom_matiere' =>$users['nom_matiere'],'prenom' =>$users['prenomE']
);
echo json_encode($users);
return;
}}

else{
    $users = '';
    echo json_encode($users);
    return;
}
?>