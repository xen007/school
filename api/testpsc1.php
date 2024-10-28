<?php
require('db.php');
// $sql = "SELECT * from note";
// $result = $conn->query($sql);

// if ($result->num_rows > 0) {
//     // Afficher les données de chaque ligne
//     echo "<table><tr><th>Colonne 1</th><th>Colonne 2</th></tr>";
//     while($row = $result->fetch_assoc()) {
//         echo "<tr><td>" . $row["Oral1"]. "</td><td>" . $row["Pratique1"]. "</td></tr>";
//     }
//     echo "</table>";
// } else {
//     echo "0 résultats";
// }


$alleval = mysqli_query($db_connect,"SELECT *,ROUND((IFNULL(m1, 0) + IFNULL(m2, 0) + IFNULL(m3, 0)) / 
            (3 - (ISNULL(m1) + ISNULL(m2) + ISNULL(m3))),2) AS avr
       FROM notes INNER JOIN matiere  on notes.id_matiere= matiere.id_matiere inner join evaluation on notes.id_eval = evaluation.id_evaluation ");
$data = [];
$moy = 0;
$bar = 0;
if (mysqli_num_rows($alleval) > 0) {
    while($row = mysqli_fetch_array($alleval)) {
        if (!isset($data[$row['nom_matiere']])) {
            $data[$row['nom_matiere']] = [];
        }
        $moy = ($row['m1'] + $row['m2'] + $row['m3'])/3;
        $moy = round($moy,2);
        $bar += $row['bareme']; 
        $data[$row['nom_matiere']][] = array('id' =>$row['id_evaluation'], 'ideval' =>$row['id_evaluation'],'nom' =>$row['nom_evaluation'],'matiere' =>$row['nom_matiere'],'bareme'=>$row['bareme'],'niveau' =>$row['niveau'],
                        'description'=>$row['description_mat'],'idMat' =>$row['matiere'],'note1'=>$row['m1'],'note2'=>$row['m2'],'note3'=>$row['m3'],'moy'=> $moy ,'bar'=> $bar,'avg'=>$row['avr']
                ); 
    }
} else {
    echo json_encode([]);
}

echo json_encode($data);

?>

<!-- $classeId = '1'; // Identifiant de la classe

// Requête pour sélectionner les élèves de la classe
$elevesQuery = mysqli_query($db_connect, "SELECT * FROM eleve WHERE classe = '$classeId'");

if (!$elevesQuery) {
    die("Échec de la requête : " . mysqli_error($db_connect));
}

$data = [];
if (mysqli_num_rows($elevesQuery) > 0) {
    while ($eleve = mysqli_fetch_array($elevesQuery)) {
        $matricule = $eleve['matricule_El'];

        // Requête pour sélectionner les notes de chaque élève
        $notesQuery = mysqli_query($db_connect, "SELECT *, 
            ROUND((IFNULL(m1, 0) + IFNULL(m2, 0) + IFNULL(m3, 0)) / (3 - (ISNULL(m1) + ISNULL(m2) + ISNULL(m3))), 2) AS avr 
            FROM notes 
            INNER JOIN matiere ON notes.id_matiere = matiere.id_matiere 
            INNER JOIN evaluation ON notes.id_eval = evaluation.id_evaluation 
            WHERE matricule_El = '$matricule' 
            ORDER BY nom_matiere");

        if (!$notesQuery) {
            die("Échec de la requête : " . mysqli_error($db_connect));
        }

        $notes = [];
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
                'note1' => $note['m1'],
                'note2' => $note['m2'],
                'note3' => $note['m3'],
                'moy' => ($note['m1'] + $note['m2'] + $note['m3']) / 3,
                'bar' => $note['bareme'],
                'avg' => $note['avr']
            ];
        }
        
        $data[$matricule] = [
            'eleve' => $eleve,
            'notes' => $notes
        ];
    }
} else {
    echo json_encode([]);
    exit;
}

echo json_encode($data);
?> -->
