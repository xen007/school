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
$json_array = array();
$matricule = $pat[4];
$sql = "SELECT cours.*, matieres.id_matiere, matieres.nom_matiere, classe.libelle_classe, classe.id_classe, jour.libelle_jour, jour.id_jour, enseignant.nom, enseignant.prenom FROM cours INNER JOIN matieres ON matiere = id_matiere  INNER JOIN jour ON id_jour=jour INNER JOIN enseignant ON matriculeEns=matriculeEnseignant INNER JOIN classe ON  cours.classe_id = classe.id_classe WHERE cours.matriculeEnseignant = '$matricule'";
$stmt = $conn->prepare($sql);
$stmt-> execute();
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($users);
return;


?>












