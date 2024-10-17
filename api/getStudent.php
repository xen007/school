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
$matieres = $pat[5];
$sequences = $pat[6];
$matiere = intval($matieres);
$sequence = intval($sequences);
if(isset($pat[3]) && ($pat !== '')){
    if($sequence === 1){
    $sql = "SELECT eleve.nom, eleve.prenom, note.matricule_El, note.note1 AS note FROM note INNER JOIN eleve ON note.matricule_El = eleve.matricule_El WHERE note.matricule_El = '$matricule' AND id_matiere = $matiere";
    $stmt = $conn->prepare($sql);
    $stmt-> execute();
    while($users = $stmt->fetch(PDO::FETCH_ASSOC)){
        $json_array['rowUserdata'] = array('matricule' =>$users['matricule_El'],'note' =>$users['note'],'nom' =>$users['nom'],'prenom' =>$users['prenom']
    );

    echo json_encode($users);
    return;

    } }
   else if($sequence === 2){
        $sql = "SELECT eleve.nom, eleve.prenom, note.matricule_El, note.note2 AS note FROM note INNER JOIN eleve ON note.matricule_El = eleve.matricule_EL WHERE note.matricule_El = '$matricule' AND id_matiere = $matiere";
        $stmt = $conn->prepare($sql);
        $stmt-> execute();
        while($users = $stmt->fetch(PDO::FETCH_ASSOC)){
            $json_array['rowUserdata'] = array('matricule' =>$users['matricule_El'],'note' =>$users['note'],'nom' =>$users['nom'],'prenom' =>$users['prenom']
        );
    
        echo json_encode($users);
        return;
    
        } }
    else if($sequence === 3){
        $sql = "SELECT eleve.nom, eleve.prenom,noters.matricule_El, noters.note3 AS note FROM note INNER JOIN eleve ON note.matricule_El = eleve.matricule_El WHEREnote.matricule_El = '$matricule' AND id_matiere = $matiere";
        $stmt = $conn->prepare($sql);
        $stmt-> execute();
        while($users = $stmt->fetch(PDO::FETCH_ASSOC)){
            $json_array['rowUserdata'] = array('matricule' =>$users['matricule_El'],'note' =>$users['note'],'nom' =>$users['nom'],'prenom' =>$users['prenom']
        );
    
        echo json_encode($users);
        return;
    
        } }  
    else if($sequence === 4){
        $sql = "SELECT eleve.nom, eleve.prenom, note.matricule_El, note.note4 AS note FROM note INNER JOIN eleve ON note.matricule_El = eleve.matricule_El WHERE note.matricule_El = '$matricule' AND id_matiere = $matiere";
        $stmt = $conn->prepare($sql);
        $stmt-> execute();
        while($users = $stmt->fetch(PDO::FETCH_ASSOC)){
            $json_array['rowUserdata'] = array('matricule' =>$users['matricule_El'],'note' =>$users['note'],'nom' =>$users['nom'],'prenom' =>$users['prenom']
        );
    
        echo json_encode($users);
        return;
    
        } }
    else if($sequence === 5){
        $sql = "SELECT eleve.nom, eleve.prenom, note.matricule_El, note.note5 AS note FROM note INNER JOIN eleve ON note.matricule_El = eleve.matricule_El WHERE note.matricule_El = '$matricule' AND id_matiere = $matiere";
        $stmt = $conn->prepare($sql);
        $stmt-> execute();
        while($users = $stmt->fetch(PDO::FETCH_ASSOC)){
            $json_array['rowUserdata'] = array('matricule' =>$users['matricule_El'],'note' =>$users['note'],'nom' =>$users['nom'],'prenom' =>$users['prenom']
        );
    
        echo json_encode($users);
        return;
    
        } }
    else if($sequence === 6){
        $sql = "SELECT eleve.nom, eleve.prenom, note.matricule_El, note.note6 AS note FROM note INNER JOIN eleve ON noters.matricule_El = eleve.matricule_EL WHERE note.matricule_El = '$matricule' AND id_matiere = $matiere";
        $stmt = $conn->prepare($sql);
        $stmt-> execute();
        while($users = $stmt->fetch(PDO::FETCH_ASSOC)){
            $json_array['rowUserdata'] = array('matricule' =>$users['matricule_El'],'note' =>$users['note'],'nom' =>$users['nom'],'prenom' =>$users['prenom']
        );
    
        echo json_encode($users);
        return;
    
        } }               
}
else{
    $users = '';
    echo json_encode($users);  
}

?>