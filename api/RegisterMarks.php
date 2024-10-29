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
$evaluation = intval($dData['evaluation']);
$classe = intval($dData['classe']);
$sequence = intval($dData['seq']);
$matricule = $dData['markNoteToStore'];  // Get markToStore array
$matiere = intval($dData['matiere']);

$count = count($matricule);


// Perform insert/update logic based on sequence
for ($i = 0; $i < $count; $i++) {

    // Assign default values or the actual ones if they exist
    $mat = $matricule[$i][0] ?? '';  // Get matricule, or empty if not available
    $ma = $matricule[$i][1] ?? '';   // Get note, or empty if not available
    // Now, based on the sequence, we can build the query
    // ...
        // Adjust the SQL statement based on the sequence
        if ($sequence === 1) {
            $sql1 = "SELECT * FROM notes WHERE matricule_El = '$mat' AND id_matiere = $matiere";
            $stmt1 = $conn->prepare($sql1);
            $stmt1->execute();
            $number = $stmt1->fetchAll();
            if ($number) {
                $response = ['status' => "Cette eleve a deja une note pour cette séquence"];
                break;
            } else {
                $sql = "INSERT INTO notes (id_matiere, id_eval, classe, sequence, m1, matricule_El) 
                        VALUES ($matiere, $evaluation, $classe, $sequence, $ma, '$mat')";
            }
        }elseif ($sequence === 2) {
            $sql1 = "SELECT * FROM notes WHERE matricule_El = '$mat' AND id_matiere = $matiere";
            $stmt1 = $conn->prepare($sql1);
            $stmt1->execute();
            $number = $stmt1->fetchAll();
            if (!$number ) {
                $response = ['status' => "Cet eleve doit avoir une note pour le premier mois, sans quoi il ne peut avoir de note."];
                break;
            } else {
                $sql = "UPDATE notes SET m2 = $ma WHERE matricule_El = '$mat' AND id_matiere = '$matiere'";
            }
            
        } 
        elseif ($sequence === 3) {
            $sql1 = "SELECT * FROM notes WHERE matricule_El = '$mat' AND id_matiere = $matiere";
            $stmt1 = $conn->prepare($sql1);
            $stmt1->execute();
            $number = $stmt1->fetchAll();
            if (!$number) {
                $response = ['status' => "Cet eleve doit avoir une note pour le premier mois, sans quoi il ne peut avoir de note."];
                break;
            } else {
                $sql = "UPDATE notes SET m3 = $ma WHERE matricule_El = '$mat' AND id_matiere = '$matiere'";
            }
        }
        elseif ($sequence === 4) {
            $sql1 = "SELECT * FROM notes WHERE matricule_El = '$mat' AND id_matiere = $matiere";
            $stmt1 = $conn->prepare($sql1);
            $stmt1->execute();
            $number = $stmt1->fetchAll();
            if (!$number) {
                $response = ['status' => "Cet eleve doit avoir une note pour le premier mois, sans quoi il ne peut avoir de note."];
                break;
            } else {
                $sql = "UPDATE notes SET m4 = $ma WHERE matricule_El = '$mat' AND id_matiere = '$matiere'";
            } 
        }
        elseif ($sequence === 5) {
            $sql1 = "SELECT * FROM notes WHERE matricule_El = '$mat' AND id_matiere = $matiere";
            $stmt1 = $conn->prepare($sql1);
            $stmt1->execute();
            $number = $stmt1->fetchAll();
            if (!$number) {
                $response = ['status' => "Cet eleve doit avoir une note pour le premier mois, sans quoi il ne peut avoir de note."];
                break;
            } else {
                $sql = "UPDATE notes SET m5 = $ma WHERE matricule_El = '$mat' AND id_matiere = '$matiere'";
            } 
        }
        elseif ($sequence === 6) {
            $sql1 = "SELECT * FROM notes WHERE matricule_El = '$mat' AND id_matiere = $matiere";
            $stmt1 = $conn->prepare($sql1);
            $stmt1->execute();
            $number = $stmt1->fetchAll();
            if (!$number) {
                $response = ['status' => "Cet eleve doit avoir une note pour le premier mois, sans quoi il ne peut avoir de note."];
                break;
            } else {
                $sql = "UPDATE notes SET m6 = $ma WHERE matricule_El = '$mat' AND id_matiere = '$matiere'";
            } 
        }elseif ($sequence === 7) {
            $sql1 = "SELECT * FROM notes WHERE matricule_El = '$mat' AND id_matiere = $matiere";
            $stmt1 = $conn->prepare($sql1);
            $stmt1->execute();
            $number = $stmt1->fetchAll();
            if (!$number) {
                $response = ['status' => "Cet eleve doit avoir une note pour le premier mois, sans quoi il ne peut avoir de note."];
                break;
            } else {
                $sql = "UPDATE notes SET m7 = $ma WHERE matricule_El = '$mat' AND id_matiere = '$matiere'";
            }  
        }elseif ($sequence === 8) {
            $sql1 = "SELECT * FROM notes WHERE matricule_El = '$mat' AND id_matiere = $matiere";
            $stmt1 = $conn->prepare($sql1);
            $stmt1->execute();
            $number = $stmt1->fetchAll();
            if (!$number) {
                $response = ['status' => "Cet eleve doit avoir une note pour le premier mois, sans quoi il ne peut avoir de note."];
                break;
            } else {
                $sql = "UPDATE notes SET m8 = $ma WHERE matricule_El = '$mat' AND id_matiere = '$matiere'";
            }   
        }elseif ($sequence === 9) {
            $sql1 = "SELECT * FROM notes WHERE matricule_El = '$mat' AND id_matiere = $matiere";
            $stmt1 = $conn->prepare($sql1);
            $stmt1->execute();
            $number = $stmt1->fetchAll();
            if (!$number) {
                $response = ['status' => "Cet eleve doit avoir une note pour le premier mois, sans quoi il ne peut avoir de note."];
                break;
            } else {
                $sql = "UPDATE notes SET m9 = $ma WHERE matricule_El = '$mat' AND id_matiere = '$matiere'";
            }   
            
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
 else {
    $response = ['status' => 'Donnees invalides'];
}

// Send the response as JSON
echo json_encode($response);

?>
