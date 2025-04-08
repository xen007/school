<?php
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
    // Validate incoming data
    $requiredFields = ['evaluation', 'classe', 'seq', 'matiere', 'markNoteToStore'];
    foreach ($requiredFields as $field) {
        if (!isset($data[$field])) {
            echo json_encode(['status' => 'error', 'message' => 'Missing required field: ' . $field]);
            exit();
        }
    }

    $evaluation = intval($data['evaluation']);
    $classe = intval($data['classe']);
    $seq = intval($data['seq']);
    $matiere = intval($data['matiere']);

    // Check the database connection
    if ($db_connect->connect_error) {
        echo json_encode(['status' => 'error', 'message' => 'Database connection failed: ' . $db_connect->connect_error]);
        exit();
    }

    // Verify that the evaluation matches the subject and class
    $evalCheckQuery = "SELECT * FROM evaluation WHERE id_evaluation = ? AND matiere = ? ";
    $evalCheckStmt = $db_connect->prepare($evalCheckQuery);
    if (!$evalCheckStmt) {
        echo json_encode(['status' => 'error', 'message' => 'Failed to prepare evaluation check query']);
        exit();
    }
    $evalCheckStmt->bind_param('ii', $evaluation, $matiere);
    $evalCheckStmt->execute();
    $evalCheckResult = $evalCheckStmt->get_result();
    if ($evalCheckResult->num_rows === 0) {
        echo json_encode(['status' => 'error', 'message' => 'Evaluation does not match the subject and class']);
        exit();
    }

    foreach ($data['markNoteToStore'] as $item) {
        $matricule = $db_connect->real_escape_string($item['matricule']);
        $note = isset($item['note']) ? $db_connect->real_escape_string($item['note']) : NULL;

        // Check if a note already exists for the matricule and evaluation
        $checkNoteQuery = "SELECT * FROM notes WHERE matricule_El = ? AND id_eval = ?";
        $checkNoteStmt = $db_connect->prepare($checkNoteQuery);
        if (!$checkNoteStmt) {
            echo json_encode(['status' => 'error', 'message' => 'Failed to prepare note check query']);
            exit();
        }
        $checkNoteStmt->bind_param('si', $matricule, $evaluation);
        $checkNoteStmt->execute();
        $noteCheckResult = $checkNoteStmt->get_result();

        // Insert logic if seq is 1 or if no existing record is found
        if ($seq == 1 || $noteCheckResult->num_rows == 0) {
            $insertQuery = "INSERT INTO notes (id_matiere, id_eval, classe, sequence, matricule_El, m$seq) VALUES (?, ?, ?, ?, ?, ?)";
            $insertStmt = $db_connect->prepare($insertQuery);
            if (!$insertStmt) {
                echo json_encode(['status' => 'error', 'message' => 'Failed to prepare insert query']);
                exit();
            }
            $insertStmt->bind_param('iiiiis', $matiere, $evaluation, $classe, $seq, $matricule, $note);
            if (!$insertStmt->execute()) {
                echo json_encode(['status' => 'error', 'message' => 'Failed to insert data']);
                exit();
            }
        } else {
            // Update logic: only update non-NULL notes
            if ($note !== NULL) {
                $updateQuery = "UPDATE notes SET m$seq = ? WHERE matricule_El = ? AND id_eval = ?";
                $updateStmt = $db_connect->prepare($updateQuery);
                if (!$updateStmt) {
                    echo json_encode(['status' => 'error', 'message' => 'Failed to prepare update query']);
                    exit();
                }
                $updateStmt->bind_param('ssi', $note, $matricule, $evaluation);
                if (!$updateStmt->execute()) {
                    echo json_encode(['status' => 'error', 'message' => 'Failed to update data']);
                    exit();
                }
            }
        }
    }

    echo json_encode(['status' => 'success', 'message' => 'Notes successfully processed']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No data received']);
}
?>
