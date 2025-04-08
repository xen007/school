<?php
require('db.php');


    header('Content-Type: application/json');
    
    // Example data structure in case of empty results
    $emptyResponse = [
        'data' => [],
        'studentCounts' => []
    ];
    
    $input = file_get_contents('php://input'); 
    $data = json_decode($input, true); 
    
    if (!isset($data['classe']) || !isset($data['trim'])) {
        echo json_encode(['error' => 'Invalid input']);
        exit;
    }
    
    $classe = $data['classe'];
    $trim = $data['trim'];
    
    $elevesQuery = mysqli_query($db_connect, "SELECT * FROM eleve INNER JOIN classe ON eleve.classe = classe.id_classe WHERE classe = '$classe'");
    if (!$elevesQuery) {
        die("Échec de la requête : " . mysqli_error($db_connect));
    }
    
    $data = [];
    $studentCounts = [];
    
    if (mysqli_num_rows($elevesQuery) > 0) {
        while ($eleve = mysqli_fetch_array($elevesQuery)) {
            $matricule = $eleve['matricule_El'];
            $classe = $eleve['classe'];
    
            if (!isset($studentCounts[$classe])) {
                $studentCounts[$classe] = 0;
            }
            $studentCounts[$classe]++;
    
            // Determine which marks to select based on the chosen trimester
            $marks = [];
            switch ($trim) {
                case '1':
                    $marks = ['m1', 'm2', 'm3'];
                    break;
                case '2':
                    $marks = ['m4', 'm5', 'm6'];
                    break;
                case '3':
                    $marks = ['m7', 'm8','m9'];
                    break;
                default:
                    echo json_encode(['error' => 'Invalid trimester']);
                    exit;
            }
    
            $marksList = implode(', ', $marks);
    
            $notesQuery = mysqli_query($db_connect, "SELECT *, 
                ROUND((IFNULL($marks[0], 0) + IFNULL($marks[1], 0) + IFNULL($marks[2], 0)) / (3 - (ISNULL($marks[0]) + ISNULL($marks[1]) + ISNULL($marks[2]))), 2) AS avr 
                FROM notes 
                INNER JOIN matiere ON notes.id_matiere = matiere.id_matiere 
                INNER JOIN evaluation ON notes.id_eval = evaluation.id_evaluation 
                WHERE matricule_El = '$matricule' 
                ORDER BY nom_matiere");
            if (!$notesQuery) {
                die("Échec de la requête : " . mysqli_error($db_connect));
            }
    
            $notes = [];
            if (mysqli_num_rows($notesQuery) > 0) {
                while ($note = mysqli_fetch_array($notesQuery)) {
                    $notes[] = [
                        'id' => $note['id_evaluation'],
                        'ideval' => $note['id_evaluation'],
                        'nom' => $note['nom_evaluation'],
                        'matiere' => $note['nom_matiere'],
                        'bareme' => $note['bareme'],
                        'niveau' => $note['niveau'],
                        'description' => $note['description_mat'],
                        'idMat' => $note['id_matiere'],
                        'note1' => $note[$marks[0]],
                        'note2' => $note[$marks[1]],
                        'note3' => $note[$marks[2]],
                        'bar' => $note['bareme'],
                        'moy' => $note['avr'],
                    ];
                }
    
                $data[$matricule] = [
                    'eleve' => array_merge($eleve, ['student_count' => $studentCounts[$classe]]), 
                    'notes' => $notes,
                ];
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
        