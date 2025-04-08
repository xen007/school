<?php
require('db.php');
header('Content-Type: application/json');

// Example data structure in case of empty results
$emptyResponse = [
    'data' => [],
    'studentCounts' => []
];

$input = file_get_contents('php://input');
$requestData = json_decode($input, true);

if (!isset($requestData['classe']) || !isset($requestData['seq'])) {
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

$classe = $requestData['classe'];
$seq = $requestData['seq'];

$elevesQuery = mysqli_query($db_connect, "SELECT * FROM eleve INNER JOIN classe ON eleve.classe = classe.id_classe WHERE classe = '$classe'");
if (!$elevesQuery) {
    die("Échec de la requête : " . mysqli_error($db_connect));
}

$data = [];
$studentCounts = [];

if (mysqli_num_rows($elevesQuery) > 0) {
    while ($eleve = mysqli_fetch_assoc($elevesQuery)) {
        $matricule = $eleve['matricule_El'];
        $classe = $eleve['classe'];

        if (!isset($studentCounts[$classe])) {
            $studentCounts[$classe] = 0;
        }
        $studentCounts[$classe]++;

        // Determine the specific mark based on the sequence
        $mark = "m$seq";

        // Query for the selected sequence
        $notesQuery = mysqli_query($db_connect, "SELECT *, 
            $mark AS note
            FROM notes 
            INNER JOIN matiere ON notes.id_matiere = matiere.id_matiere 
            LEFT JOIN enseignant ON matiere.matricule_Ens = enseignant.matricule_Ens 
            WHERE notes.matricule_El = '$matricule' 
            ORDER BY matiere.nom_matiere");

        if (!$notesQuery) {
            die("Échec de la requête : " . mysqli_error($db_connect));
        }

        $notes = [];
        while ($note = mysqli_fetch_assoc($notesQuery)) {
            // Calculate rank for each subject
            $subjectScores = mysqli_query($db_connect, "SELECT notes.matricule_El, 
                $mark AS note 
                FROM notes 
                WHERE id_matiere='{$note['id_matiere']}' 
                ORDER BY note DESC");

            if (!$subjectScores) {
                die("Échec de la requête : " . mysqli_error($db_connect));
            }

            $rank = 1;
            while ($row = mysqli_fetch_array($subjectScores)) {
                if ($row['matricule_El'] == $matricule) {
                    break;
                }
                $rank++;
            }

            $noteData = [
                'matiere'     => $note['nom_matiere'],
                'niveau'      => $note['niveau'],
                'nomEn'       => $note['nomE'],
                'idMat'       => $note['id_matiere'],
                'coef'        => $note['coefficient'],
                'note'        => $note['note'],
                'ranksubject' => $rank
            ];

            $notes[] = $noteData;
        }

        if (!empty($notes)) {
            $data[$matricule] = [
                'eleve' => array_merge($eleve, ['student_count' => $studentCounts[$classe]]),
                'notes' => $notes,
            ];
        } else {
            // Debugging: Log if notes array is empty
            error_log("No notes found for matricule: $matricule");
        }
    }

    $data['studentCounts'] = $studentCounts;
} else {
    echo json_encode($emptyResponse);
    exit;
}

echo json_encode($data);
$db_connect->close();
?>
