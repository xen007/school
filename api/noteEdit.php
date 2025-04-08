<?php 
include 'db.php';

// Decode the incoming JSON data
$data = json_decode(file_get_contents('php://input'), true);

$evaluation = intval($data['evaluation']);
$seq = intval($data['seq']);
$matiere = intval($data['matiere']);
$matricule = $data['matricule'];
$note = $data['note'] === "" ? 'NULL' : floatval($data['note']);

if($data){
    $sql1 = mysqli_query($db_connect, "SELECT * FROM notes WHERE matricule_El = '$matricule' AND id_eval = '$evaluation' AND sequence = '$seq'");
    if(mysqli_num_rows($sql1) < 0){
        echo json_encode(['status' => 'error', 'message' => 'RAS']);
        exit();
    } else {
        $query = mysqli_query($db_connect, "UPDATE notes SET m$seq = $note WHERE matricule_El = '$matricule' AND id_eval = '$evaluation'");
        if($query){        
            echo json_encode(['status' => 'success', 'message' => 'Note modifié avec succes']);
        }
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'pas de données envoyé']);
}     
?>
