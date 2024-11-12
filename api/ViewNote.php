  
    <?php
    require 'db.php';
    
    // $trim = $data['trim'];
    // $n1 = 0;
    // $n2 = 0;
    // $n3 = 0;
    // if($trim == 1){
    //     $n1 = 1;
    //     $n2 = 2;
    //     $n3 = 3;
    // }else if($trim == 2){
    //     $n1 = 4;
    //     $n2 = 5;
    //     $n3 = 6;
    // }else if($trim == 3){
    //         $n1 = 7;
    //         $n2 = 8;
    //         $n3 = 9;
    //     }



// Example data structure in case of empty results
$json_array = ["userdata" => []];

$input = file_get_contents('php://input'); 
$data = json_decode($input, true); 

if (!isset($data['classe']) || !isset($data['seq']) || !isset($data['evaluation'])) {
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

$classe = $data['classe'];
$seq = $data['seq'];
$evaluation = $data['evaluation'];

// $alluser = mysqli_query($db_connect, "SELECT notes.matricule_El, nom, m$seq as note1, id_eval, prenom
//         FROM notes INNER JOIN eleve ON eleve.matricule_El = notes.matricule_El 
//         WHERE id_eval = '$evaluation' AND notes.classe = '$classe'
//         ORDER BY nom");

$alluser = mysqli_query($db_connect, "SELECT notes.matricule_El, nom, m$seq as note1, id_eval, prenom
        FROM notes INNER JOIN eleve ON eleve.matricule_El = notes.matricule_El 
        WHERE id_eval = '$evaluation'
        ORDER BY nom");

if (!$alluser) {
    die("Échec de la requête : " . mysqli_error($db_connect));
}

if (mysqli_num_rows($alluser) > 0) {
    while ($note = mysqli_fetch_array($alluser, MYSQLI_ASSOC)) {
        $json_array["userdata"][] = array( 
            'matricule' => $note['matricule_El'],
            'nom' => $note['nom'],
            'prenom' => $note['prenom'],
            'ideval' => $note['id_eval'],
            'note1' => $note['note1']
        );  
    }     
}

echo json_encode($json_array["userdata"]);

?>

    