<?php 
require('db.php'); 
header('Content-Type: application/json'); 

$emptyResponse = [
    'data' => [],
    'studentCounts' => []
];

$input = file_get_contents('php://input');
$requestData = json_decode($input, true);

if (!isset($requestData['classe']) || !isset($requestData['trim'])) {
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

$classe = $requestData['classe'];
$trim = $requestData['trim'];

// Use prepared statements to prevent SQL injection
$stmt = $db_connect->prepare("
    SELECT eleve.*, classe.*, notes.* 
    FROM eleve 
    INNER JOIN classe ON eleve.classe = classe.id_classe 
    INNER JOIN notes ON eleve.matricule_El = notes.matricule_El 
    WHERE eleve.classe = ? AND eleve.statut != 0
");
$stmt->bind_param("s", $classe);
$stmt->execute();
$elevesQuery = $stmt->get_result();


if (!$elevesQuery) {
    die("Échec de la requête : " . mysqli_error($db_connect));
}

$data = [];
$studentCounts = [];

if ($elevesQuery->num_rows > 0) {
    while ($eleve = $elevesQuery->fetch_assoc()) {
        $matricule = $eleve['matricule_El'];
        $classe = $eleve['classe'];

        if (!isset($studentCounts[$classe])) {
            $studentCounts[$classe] = 0;
        }
        $studentCounts[$classe]++;

        // Prepare the marks based on the trimester
        switch ($trim) {
            case '1':
                $marks = ['m1', 'm2', 'm3'];
                break;
            case '2':
                $marks = ['m4', 'm5', 'm6'];
                break;
            case '3':
                $marks = ['m7', 'm8', 'm9'];
                break;
            case '4':
                $marks = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9'];
                break;
            default:
                echo json_encode(['error' => 'Invalid trimester']);
                exit;
        }

        if ($trim === '4') {
            // Query for trimester 4
            $notesQuery = $db_connect->prepare("
                SELECT *, 
                ROUND((IFNULL(m1, 0) + IFNULL(m2, 0) + IFNULL(m3, 0)) / NULLIF(3 - (ISNULL(m1) + ISNULL(m2) + ISNULL(m3)), 0), 2) AS moy1,
                ROUND((IFNULL(m4, 0) + IFNULL(m5, 0) + IFNULL(m6, 0)) / NULLIF(3 - (ISNULL(m4) + ISNULL(m5) + ISNULL(m6)), 0), 2) AS moy2,
                ROUND((IFNULL(m7, 0) + IFNULL(m8, 0) + IFNULL(m9, 0)) / NULLIF(3 - (ISNULL(m7) + ISNULL(m8) + ISNULL(m9)), 0), 2) AS moy3
                FROM notes 
                INNER JOIN matiere ON notes.id_matiere = matiere.id_matiere
                INNER JOIN evaluation ON notes.id_eval = evaluation.id_evaluation
                WHERE matricule_El = ? 
                ORDER BY nom_matiere
            ");
            $notesQuery->bind_param("s", $matricule);
            $notesQuery->execute();
            $notesResult = $notesQuery->get_result();
        } else {
            // Query for trimesters 1, 2, or 3
            $notesQuery = $db_connect->prepare("
                SELECT * FROM notes 
                INNER JOIN matiere ON notes.id_matiere = matiere.id_matiere 
                INNER JOIN evaluation ON notes.id_eval = evaluation.id_evaluation 
                WHERE matricule_El = ? 
                ORDER BY nom_matiere
            ");
            $notesQuery->bind_param("s", $matricule);
            $notesQuery->execute();
            $notesResult = $notesQuery->get_result();
        }

        if (!$notesResult) {
            die("Échec de la requête : " . mysqli_error($db_connect));
        }

        $notes = [];
        while ($note = $notesResult->fetch_assoc()) {
            $noteData = [
                'id'          => $note['id_evaluation'],
                'ideval'      => $note['id_evaluation'],
                'nom'         => $note['nom_evaluation'],
                'matiere'     => $note['nom_matiere'],
                'bareme'      => $note['bareme'],
                'niveau'      => $note['niveau'],
                'description' => $note['description_mat'],
                'idMat'       => $note['id_matiere'],
                'bar'         => $note['bareme'],
            ];

            if ($trim === '4') {
                $noteData['moy1'] = $note['moy1'];
                $noteData['moy2'] = $note['moy2'];
                $noteData['moy3'] = $note['moy3'];
                $validMoys = array_filter([$note['moy1'], $note['moy2'], $note['moy3']], 'is_numeric');
                $noteData['Gmoy'] = count($validMoys) > 0 ? round(array_sum($validMoys) / count($validMoys), 2) : null;
            } else {
                $noteData['note1'] = $note[$marks[0]] ?? null;
                $noteData['note2'] = $note[$marks[1]] ?? null;
                $noteData['note3'] = $note[$marks[2]] ?? null;
                $validNotes = array_filter([$note[$marks[0]], $note[$marks[1]], $note[$marks[2]]], 'is_numeric');
                $noteData['moy'] = count($validNotes) > 0 ? round(array_sum($validNotes) / count($validNotes), 2) : null;
            }

            $notes[] = $noteData;
        }

        $data[$matricule] = [
            'eleve' => array_merge($eleve, ['student_count' => $studentCounts[$classe]]),
            'notes' => $notes,
        ];
    }
    $data['studentCounts'] = $studentCounts;
} else {
    echo json_encode($emptyResponse);
    exit;
}

echo json_encode($data);
$db_connect->close();
?>
