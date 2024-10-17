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

// Read the raw POST data
$eData = file_get_contents("php://input");  // Read JSON data from request body
$dData = json_decode($eData, true);  // Decode the JSON into an associative array

// Check if data is properly received
if ($dData && isset($dData['seq'], $dData['markToStore'], $dData['matiere'])) {
    $sequence = intval($dData['seq']);
    $matricule = $dData['markToStore'];  // Get markToStore array
    $matiere = intval($dData['matiere']);
    $count = count($matricule);

    // Perform insert/update logic based on sequence
    for ($i = 0; $i < $count; $i++) {
        $mat = $matricule[$i][0];
        $ma = $matricule[$i][1];
        
        // Adjust the SQL statement based on the sequence
        if ($sequence === 1) {
            $sql1 = "SELECT * FROM note WHERE  matricule_El = '$mat' AND id_matiere = '$matiere'";
            $stmt1 = $conn->prepare($sql1);
            $stmt1-> execute();
            $number = $stmt1->fetch();
            if($number){
                $response = ['status' => "Cette élève a déja une note pour cette Sequence"];
                break;
            }else{
                $sql = "INSERT INTO note (matricule_El, id_matiere, note1) VALUES ('$mat', '$matiere', '$ma')";
            }
        } elseif ($sequence === 2) {
            $sql = "UPDATE note SET note2 = '$ma' WHERE matricule_El = '$mat' AND id_matiere = '$matiere'";
        } 
        elseif ($sequence === 3) {
            $sql = "UPDATE note SET note3 = '$ma' WHERE matricule_El = '$mat' AND id_matiere = '$matiere'";
        }
        elseif ($sequence === 4) {
            $sql = "UPDATE note SET note4 = '$ma' WHERE matricule_El = '$mat' AND id_matiere = '$matiere'";
        }
        elseif ($sequence === 5) {
            $sql = "UPDATE note SET note5 = '$ma' WHERE matricule_El = '$mat' AND id_matiere = '$matiere'";
        }
        elseif ($sequence === 6) {
            $sql = "UPDATE note SET note6 = '$ma' WHERE matricule_El = '$mat' AND id_matiere = '$matiere'";
        }
        // Add further conditions for other sequences...

        // Prepare and execute SQL
        $stmt = $conn->prepare($sql);
        if ($stmt->execute()) {
            $response = ['status' => "Enregistrer"];
        } else {
            $response = ['status' => "Sorry, an error occurred when registering"];
        }
    }
} else {
    $response = ['status' => 'Invalid data'];
}

// Send the response as JSON
echo json_encode($response);

?>
