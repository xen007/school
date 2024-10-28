<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Required headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: POST');

// Connect to database
include 'Dbase.php';
$db = new Dbase;
$conn = $db->connect();
$i = 0;
// Read the raw POST data
$eData = file_get_contents("php://input");  // Read JSON data from request body
$dData = json_decode($eData, true);  // Decode the JSON into an associative array

// Check if data is properly received
if ($dData['seq']) {
    
    $sequence = intval($dData['seq']);
$matricule = $dData['markNoteToStore'];  // Get markToStore array
$matiere = intval($dData['matiere']);

// Ensure each mark data exists and decode into arrays if necessary
$Eval_oral = $dData['markOralToStore'];
$Eval_atti = $dData['markAttiToStore'];
$Eval_write = $dData['markWriteToStore'];
$Eval_prac = $dData['markPracToStore'];
$Eval_savoir = $dData['markSavoirToStore'];
$Eval_ecrit = $dData['markEcritToStore'];

$count = count($matricule);

// Perform insert/update logic based on sequence
for ($i = 0; $i < $count; $i++) {

    // Assign default values or the actual ones if they exist
    $mat = $matricule[$i][0] ?? '';  // Get matricule, or empty if not available
    $ma = $matricule[$i][1] ?? '';   // Get note, or empty if not available

    // Use null coalescing operator to assign a default value in case data is missing
    $oral = $Eval_oral[$i][1] ?? 0;
    $atti = $Eval_atti[$i][1] ?? 0;
    $write = $Eval_write[$i][1] ?? 0;
    $prac = $Eval_prac[$i][1] ?? 0;
    $savoir = $Eval_savoir[$i][1] ?? 0;
    $ecrit = $Eval_ecrit[$i][1] ?? 0;

    // Now, based on the sequence, we can build the query
    // ...$sequence = intval($dData['seq']);
$matricule = $dData['markNoteToStore'];  // Get markToStore array
$matiere = intval($dData['matiere']);

// Ensure each mark data exists and decode into arrays if necessary
$Eval_oral = $dData['markOralToStore'] ?? 0;
$Eval_atti = $dData['markAttiToStore'] ?? 0;
$Eval_write = $dData['markWriteToStore'] ?? 0;
$Eval_prac = $dData['markPracToStore'] ?? 0;
$Eval_savoir = $dData['markSavoirToStore'] ?? 0;
$Eval_ecrit = $dData['markEcritToStore'] ?? 0;

$count = count($matricule);

// Perform insert/update logic based on sequence
for ($i = 0; $i < $count; $i++) {

    // Assign default values or the actual ones if they exist
    $mat = $matricule[$i][0] ?? '';  // Get matricule, or empty if not available
    $ma = $matricule[$i][1] ?? '';   // Get note, or empty if not available

    // Use null coalescing operator to assign a default value in case data is missing
    $oral = $Eval_oral[$i][1] ?? 0;
    $atti = $Eval_atti[$i][1] ?? 0;
    $write = $Eval_write[$i][1] ?? 0;
    $prac = $Eval_prac[$i][1] ?? 0;
    $savoir = $Eval_savoir[$i][1] ?? 0;
    $ecrit = $Eval_ecrit[$i][1] ?? 0;

    // Now, based on the sequence, we can build the query
    // ...
        // Adjust the SQL statement based on the sequence
        if ($sequence === 1) {
            $sql1 = "SELECT * FROM note WHERE matricule_El = '$mat' AND id_matiere = $matiere";
            $stmt1 = $conn->prepare($sql1);
            $stmt1->execute();
            $number = $stmt1->fetch();
            if ($number) {
                $response = ['status' => "Cette eleve a deja une note pour cette séquence"];
                break;
            } else {
                $sql = "INSERT INTO note (matricule_El, id_matiere, Attitude1, Oral1, Written1, Ecrit1, Practical1, Savoir_Etre1, note1) 
                        VALUES ('$mat', $matiere, $atti, $oral, $write, $ecrit, $prac, $savoir, $ma)";
            }
        }elseif ($sequence === 2) {
            $sql = "UPDATE note SET Attitude2 = $atti, Oral2 = $oral, Written2 = $write, Ecrit2 = $ecrit, Practical2 = $prac, Savoir_Etre2 = $savoir, note2 = $ma WHERE matricule_El = '$mat' AND id_matiere = '$matiere'";
        } 
        elseif ($sequence === 3) {
            $sql = "UPDATE note SET Attitude3 = $atti, Oral3 = $oral, Written3 = $write, Ecrit3 = $ecrit, Practical3 = $prac, Savoir_Etre3 = $savoir, note3 = $ma WHERE matricule_El = '$mat' AND id_matiere = '$matiere'";
        }
        elseif ($sequence === 4) {
            $sql = "UPDATE note SET Attitude4 = $atti, Oral4 = $oral, Written4 = $write, Ecrit4 = $ecrit, Practical4 = $prac, Savoir_Etre4 = $savoir, note4 = $ma WHERE matricule_El = '$mat' AND id_matiere = '$matiere'";
        }
        elseif ($sequence === 5) {
            $sql = "UPDATE note SET Attitude5 = $atti, Oral5 = $oral, Written5 = $write, Ecrit5 = $ecrit, Practical5 = $prac, Savoir_Etre5 = $savoir, note5 = $ma WHERE matricule_El = '$mat' AND id_matiere = '$matiere'";
        }
        elseif ($sequence === 6) {
            $sql = "UPDATE note SET Attitude6 = $atti, Oral6 = $oral, Written6 = $write, Ecrit6 = $ecrit, Practical6 = $prac, Savoir_Etre6 = $savoir, note6 = $ma WHERE matricule_El = '$mat' AND id_matiere = '$matiere'";
        }elseif ($sequence === 7) {
            $sql = "UPDATE note SET Attitude7 = $atti, Oral7 = $oral, Written7 = $write, Ecrit7 = $ecrit, Practical7 = $prac, Savoir_Etre7 = $savoir, note7 = $ma WHERE matricule_El = '$mat' AND id_matiere = '$matiere'";
        }elseif ($sequence === 8) {
            $sql = "UPDATE note SET Attitude8 = $atti, Oral8 = $oral, Written8 = $write, Ecrit8 = $ecrit, Practical8 = $prac, Savoir_Etre8 = $savoir, note8 = $ma WHERE matricule_El = '$mat' AND id_matiere = '$matiere'";
        }elseif ($sequence === 9) {
            $sql = "UPDATE note SET Attitude9 = $atti, Oral9 = $oral, Written9 = $write, Ecrit9 = $ecrit, Practical9 = $prac, Savoir_Etre9 = $savoir, note9 = $ma WHERE matricule_El = '$mat' AND id_matiere = '$matiere'";
        }
        // Add further conditions for other sequences... 

        // Prepare and execute SQL
        $stmt = $conn->prepare($sql);

        if ($stmt->execute()) {
            $response = ['status' => "Enregistre"];
        } else {
            $response = ['status' => "Une erreur est survenue lors de l'enregistrement"];
        }
    }
}
} else {
    $response = ['status' => 'Donnees invalides'];
}

// Send the response as JSON
echo json_encode($response);

?>
