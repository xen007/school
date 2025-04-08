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

if (!isset($requestData['classe']) || !isset($requestData['trim'])) {
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

$classe = $requestData['classe'];
$trim = $requestData['trim'];

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

        // Prepare the marks based on the trimester
        switch ($trim) {
            case '1':
                $marks = ['m1', 'm2', 'm3'];
                break;
            case '2':
                $marks = ['m4', 'm5', 'm6'];
                break;
            case '3':
                $marks = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9'];
                break;
            default:
                echo json_encode(['error' => 'Invalid trimester']);
                exit;
        }

        if ($trim === '3') {
            // Query for trimester 3, calculate moy1, moy2, moy3, and Gmoy
            $notesQuery = mysqli_query($db_connect, "SELECT *,
                ROUND((IFNULL(m1, 0) + IFNULL(m2, 0) + IFNULL(m3, 0)) / (3 - (ISNULL(m1) + ISNULL(m2) + ISNULL(m3))), 2) AS moy1,
                ROUND((IFNULL(m4, 0) + IFNULL(m5, 0) + IFNULL(m6, 0)) / (3 - (ISNULL(m4) + ISNULL(m5) + ISNULL(m6))), 2) AS moy2,
                ROUND((IFNULL(m7, 0) + IFNULL(m8, 0) + IFNULL(m9, 0)) / (3 - (ISNULL(m7) + ISNULL(m8) + ISNULL(m9))), 2) AS moy3,
                ROUND(
                    (IFNULL((IFNULL(m1, 0) + IFNULL(m2, 0) + IFNULL(m3, 0)) / (3 - (ISNULL(m1) + ISNULL(m2) + ISNULL(m3))), 0) +
                     IFNULL((IFNULL(m4, 0) + IFNULL(m5, 0) + IFNULL(m6, 0)) / (3 - (ISNULL(m4) + ISNULL(m5) + ISNULL(m6))), 0) +
                     IFNULL((IFNULL(m7, 0) + IFNULL(m8, 0) + IFNULL(m9, 0)) / (3 - (ISNULL(m7) + ISNULL(m8) + ISNULL(m9))), 0))
                    / (
                        3 -
                        (ISNULL((IFNULL(m1, 0) + IFNULL(m2, 0) + IFNULL(m3, 0)) / (3 - (ISNULL(m1) + ISNULL(m2) + ISNULL(m3)))) +
                         ISNULL((IFNULL(m4, 0) + IFNULL(m5, 0) + IFNULL(m6, 0)) / (3 - (ISNULL(m4) + ISNULL(m5) + ISNULL(m6)))) +
                         ISNULL((IFNULL(m7, 0) + IFNULL(m8, 0) + IFNULL(m9, 0)) / (3 - (ISNULL(m7) + ISNULL(m8) + ISNULL(m9)))))
                    )
                , 2) AS Gmoy
                FROM notes
                INNER JOIN matiere ON notes.id_matiere = matiere.id_matiere
                INNER JOIN evaluation ON notes.id_eval = evaluation.id_evaluation
                WHERE matricule_El = '$matricule'
                ORDER BY nom_matiere");
        } else {
            // Query for trimester 1 or 2
            $notesQuery = mysqli_query($db_connect, "SELECT *, 
                ROUND((IFNULL({$marks[0]}, 0) + IFNULL({$marks[1]}, 0) + IFNULL({$marks[2]}, 0)) / (3 - (ISNULL({$marks[0]}) + ISNULL({$marks[1]}) + ISNULL({$marks[2]}))), 2) AS avr 
                FROM notes 
                INNER JOIN matiere ON notes.id_matiere = matiere.id_matiere 
                INNER JOIN evaluation ON notes.id_eval = evaluation.id_evaluation 
                WHERE matricule_El = '$matricule' 
                ORDER BY nom_matiere");
        }

        if (!$notesQuery) {
            die("Échec de la requête : " . mysqli_error($db_connect));
        }

        $notes = [];
        while ($note = mysqli_fetch_assoc($notesQuery)) {
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

            if ($trim === '3') {
                // Add moy1, moy2, moy3, and Gmoy
                $noteData['moy1'] = $note['moy1'];
                $noteData['moy2'] = $note['moy2'];
                $noteData['moy3'] = $note['moy3'];
                $noteData['Gmoy'] = $note['Gmoy'];
            } else {
                // Add notes and average for trimester 1 or 2
                $noteData['note1'] = $note[$marks[0]];
                $noteData['note2'] = $note[$marks[1]];
                $noteData['note3'] = $note[$marks[2]];
                $noteData['moy']   = $note['avr'];
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
   