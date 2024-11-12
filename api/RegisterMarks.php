<?php
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

// // Required headers
// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Headers: *');
// header('Access-Control-Allow-Methods: POST');



// header('Content-Type: application/json');

// // Decode the incoming JSON data
// $data = json_decode(file_get_contents('php://input'), true);

// if ($data) {
//     $db = new mysqli('localhost', 'root', '', 'monou');
//     $evaluation = intval($data['evaluation']);
//     $classe = intval($data['classe']);
//     $seq = intval($data['seq']);
//     $matricule = $data['markNoteToStore'];  // Get markToStore array
//     $matiere = intval($data['matiere']);
//     // Check the database connection
//     if ($db->connect_error) {
//         die('Database connection failed: ' . $db->connect_error);
//     }

//     foreach ($data['markNoteToStore'] as $item) {
//         $matricule = $db->real_escape_string($item['matricule']);
//         $note = isset($item['note']) ? $db->real_escape_string($item['note']) : 'NULL';

//         // Make sure to handle NULL values correctly in SQL query
//         $query = "INSERT INTO notes (id_matiere, id_eval, classe, sequence, matricule_El, m1) VALUES ('$matiere','$evaluation','$classe','$seq', '$matricule', $note)";

//         if (!$db->query($query)) {
//             echo json_encode(['status' => 'error', 'message' => 'Failed to insert data']);
//             exit();
//         }
//     }

//     echo json_encode(['status' => 'success', 'message' => 'Data inserted successfully']);
// } else {
//     echo json_encode(['status' => 'error', 'message' => 'No data received']);
// }

include 'db.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Required headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: POST');



header('Content-Type: application/json');

// Decode the incoming JSON data
$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    $db = new mysqli('localhost', 'root', '', 'monou');
    $evaluation = intval($data['evaluation']);
    $classe = intval($data['classe']);
    $seq = intval($data['seq']);
    $matricule = $data['markNoteToStore'];  // Get markToStore array
    $matiere = intval($data['matiere']);
    // Check the database connection
    if ($db->connect_error) {
        die('Database connection failed: ' . $db->connect_error);
    }

    foreach ($data['markNoteToStore'] as $item) {
        $matricule = $db->real_escape_string($item['matricule']);
        $note = isset($item['note']) ? $db->real_escape_string($item['note']) : 'NULL';

        // Make sure to handle NULL values correctly in SQL query
        if($seq == 1){
            $sql1 = mysqli_query( $db_connect,"SELECT * FROM notes WHERE  matricule_El = '$matricule' AND id_eval = '$evaluation' AND sequence = '$seq' ");
            if(mysqli_num_rows($sql1) > 0){
                echo json_encode(['status' => 'error', 'message' => 'Note existe deja']);
                exit();
            }else{
            $query = "INSERT INTO notes (id_matiere, id_eval, classe, sequence, matricule_El, m$seq) VALUES ('$matiere','$evaluation','$classe','$seq', '$matricule', $note)";
    
            if (!$db->query($query)) {
                echo json_encode(['status' => 'error', 'message' => 'Failed to insert data']);
                exit();
            }
            }
        }else{
            $sql1 = mysqli_query( $db_connect,"SELECT * FROM notes WHERE  matricule_El = '$matricule' AND id_eval = '$evaluation' AND sequence = '$seq' ");
            if(mysqli_num_rows($sql1) < 0){
                echo json_encode(['status' => 'error', 'message' => 'Aucune note trouvé; impossible de mettre a jour']);
                exit();
            }else{
            $query = "UPDATE notes set m$seq = $note WHERE  matricule_El = '$matricule' AND id_eval = '$evaluation'";
    
            if (!$db->query($query)) {
                echo json_encode(['status' => 'error', 'message' => 'Erreur lors de linsertion']);
                exit();
            }
            }
        }
        
    }

    echo json_encode(['status' => 'success', 'message' => 'Note inséré avec succes']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Aucne donnée reçu']);
}
?>
