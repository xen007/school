<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');

include 'Dbase.php';
$db = new Dbase;
$conn = $db->connect();
$pat = explode('/', $_SERVER['REQUEST_URI']);

if (isset($pat[4]) && !empty($pat[5])) {
    $json_array = array();
    $matricule = $pat[4];
    $class_id = $pat[5];

    // Vérification si $class_id est un entier ou une chaîne
    if (ctype_digit($class_id)) {
        // Si $class_id est un entier
        $sql = "SELECT cours.*, matiere.id_matiere, matiere.nom_matiere, classe.libellee_classe, classe.id_classe, jour.libellee_jour, enseignant.nomE, enseignant.prenomE 
                FROM cours 
                INNER JOIN matiere ON cours.matiere = matiere.id_matiere  
                INNER JOIN jour ON jour.id_jour = cours.jour 
                INNER JOIN enseignant ON enseignant.matricule_Ens = cours.matriculeEnseignant 
                INNER JOIN classe ON classe.id_classe = cours.classe_id 
                WHERE enseignant.matricule_Ens = :matricule AND classe.id_classe = :class_id 
                ORDER BY jour, debut_cours ASC";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':matricule', $matricule);
        $stmt->bindParam(':class_id', $class_id, PDO::PARAM_INT);
    } else {
        // Si $class_id est une chaîne
        $sql = "SELECT cours.*, matiere.id_matiere, matiere.nom_matiere, classe.libellee_classe, classe.id_classe, jour.libellee_jour, enseignant.nomE, enseignant.prenomE 
                FROM cours 
                INNER JOIN matiere ON cours.matiere = matiere.id_matiere  
                INNER JOIN jour ON jour.id_jour = cours.jour 
                INNER JOIN enseignant ON enseignant.matricule_Ens = cours.matriculeEnseignant 
                INNER JOIN classe ON classe.id_classe = cours.classe_id 
                WHERE enseignant.matricule_Ens = :matricule AND classe.libellee_classe = :class_id 
                ORDER BY jour, debut_cours ASC";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':matricule', $matricule);
        $stmt->bindParam(':class_id', $class_id, PDO::PARAM_STR);
    }

    $stmt->execute();
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
} else {
    $users = '';
}

echo json_encode($users);
?>
