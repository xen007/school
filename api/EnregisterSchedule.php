<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');


include 'Dbase.php';
$db = new Dbase;
$conn = $db->connect();


/*$eData = file_get_contents("php://input"); // file_get_contents("php://input")Takes raw data from the request 
$dData = json_decode($eData, true);*/


    $classe = $_POST['clas'];
    $salle = $_POST['sal'];
    $matiere = $_POST['matiere'];
    $ensei = $_POST['ensei'];
    $ddc = $_POST['dtime'];
    $fdc = $_POST['ftime'];
    $jour = $_POST['jour'];

    $result="";
$request = "SELECT * FROM cours WHERE classe_id = '$salle' AND debut_cours = '$ddc' AND fin_cours = '$fdc' AND jour = $jour";
$stmt = $conn->prepare($request);
$stmt-> execute();
$answer= $stmt->fetchAll(PDO::FETCH_ASSOC);

if(!empty($answer)){$response = ['status' =>"Cette heure ou Enseignant a déjà été programmé pour ce jour veuillez verifier les informations saisie"];}
     
elseif(isset($_POST['clas'])){
    //$sql= "SELECT cours.*, matieres.id_matiere, matieres.nom_matiere, classe.niveau_classe, matieres.classe, jour.libelle_jour, niveau.libelle_niveau FROM cours INNER JOIN matieres ON matiere = id_matiere  INNER JOIN jour ON id_jour=jour AND matiere INNER JOIN classe ON id_classe = classe INNER JOIN niveau on niveau_classe = id_niveau WHERE jour.libelle_jour='Mercredi'";
    $sql = "INSERT INTO `cours` (`matiere`, `classe_id`, `jour`, `matriculeEnseignant`, `debut_cours`, `fin_cours`) VALUES('$matiere', '$salle', '$jour', '$ensei', '$ddc', '$fdc');";
     $stmt = $conn->prepare($sql);
     
     
     if($stmt->execute()){
     $response = ['status' => "Enregistrer"] ;}

     else{
         $response = ['status' => "Norecord"] ;
     }
 
}
else{
    $response = ['status' => "No record"] ;
}

   

    

echo json_encode($response);

?>