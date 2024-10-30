<?php
require('db.php');

// switch($method){
//     case"GET"://methode de récupération de données    
//         // décompose l'url  
//         $pat = explode('/',$_SERVER['REQUEST_URI']);
//         //verifie si le chemin url est atteint et s'il n'est pas vide
//         if(isset($pat[4])  && ($pat[4] !== '')){
//             $json_array = array();
//             $mat =urldecode($pat[4]); //initialise l'index " de l'url à la clé
//             // echo "user id is...".$evalid; die;
//             //requete de recupération des données dans la table avec des jointures et une condition

//             $alleval = mysqli_query($db_connect,"SELECT *,ROUND((IFNULL(m1, 0) + IFNULL(m2, 0) + IFNULL(m3, 0)) / 
//             (3 - (ISNULL(m1) + ISNULL(m2) + ISNULL(m3))),2) AS avr
//             FROM notes INNER JOIN matiere  on notes.id_matiere= matiere.id_matiere inner join evaluation on notes.id_eval = evaluation.id_evaluation WHERE matricule_El = '$mat' ");
//             $data = [];
//             $moy = 0;
//             $bar = 0; 
//             if (mysqli_num_rows($alleval) > 0) {
//                 while($row = mysqli_fetch_array($alleval)) {
//                     if (!isset($data[$row['nom_matiere']])) {
//                         $data[$row['nom_matiere']] = [];
//                     }
//                     $moy = ($row['m1'] + $row['m2'] + $row['m3'])/3;
//                     $moy = round($moy,2);
//                     $bar += $row['bareme']; 
//                     $data[$row['nom_matiere']][] = array('id' =>$row['id_evaluation'], 'ideval' =>$row['id_evaluation'],'nom' =>$row['nom_evaluation'],'matiere' =>$row['nom_matiere'],'bareme'=>$row['bareme'],'niveau' =>$row['niveau'],
//                                     'description'=>$row['description_mat'],'idMat' =>$row['matiere'],'note1'=>$row['m1'],'note2'=>$row['m2'],'note3'=>$row['m3'],'moy'=> $moy ,'bar'=> $bar,'avg'=>$row['avr'], 'matricule'=>$row['matricule_El']
//                             ); 
//                 }
//             } else {
//                 echo json_encode([]);
//             }

//             echo json_encode($data);
//             break;

//         }else{
//             //recupères toutes les inforevalions de la table
//             $data = [];


//             $alleval = mysqli_query($db_connect,"SELECT * FROM evaluation  INNER JOIN matiere  on evaluation.matiere= matiere.id_matiere left join notes on evaluation.id_evaluation = notes.id_eval  ");
//             if(mysqli_num_rows($alleval) > 0){
//                 //vérifie si les inforevalions sont disponibles et les récupères
//                 while($row = mysqli_fetch_array($alleval)){
//                     $json_array["evaldata"][] = array('id' =>$row['id_evaluation'], 'ideval' =>$row['id_evaluation'],'nom' =>$row['nom_evaluation'],'matiere' =>$row['nom_matiere'],'bareme'=>$row['bareme'],'niveau' =>$row['niveau'],
//                     'idMat' =>$row['matiere'],'note1'=>$row['noteSeq']
//             ); 
                    
//                 }
//                 //affiche les inforevalions récupérés
//                 echo json_encode($json_array['evaldata']);
                
//             } else{
//                 // au cas contraire renvoyer l'erreur
//                 echo json_encode(["resultat"=>"Verifiez les informations SVP"]);
//                 return;
//             }
//             }break;

//         }



$classeId = '1'; // Identifiant de la classe

// Requête pour sélectionner les élèves de la classe
// $elevesQuery = mysqli_query($db_connect, "SELECT * FROM eleve INNER JOIN classe ON eleve.classe = classe.id_classe WHERE classe = '$classeId' ");

// if (!$elevesQuery) {
//     die("Échec de la requête : " . mysqli_error($db_connect));
// }

// $data = [];
// if (mysqli_num_rows($elevesQuery) > 0) {
//     while ($eleve = mysqli_fetch_array($elevesQuery)) {
//         $matricule = $eleve['matricule_El'];
//         $rw  = mysqli_num_rows($elevesQuery);
//         // Requête pour sélectionner les notes de chaque élève
//         $notesQuery = mysqli_query($db_connect, "SELECT *, 
//             ROUND((IFNULL(m1, 0) + IFNULL(m2, 0) + IFNULL(m3, 0)) / (3 - (ISNULL(m1) + ISNULL(m2) + ISNULL(m3))),2) AS avr 
//             FROM notes 
//             INNER JOIN matiere ON notes.id_matiere = matiere.id_matiere 
//             INNER JOIN evaluation ON notes.id_eval = evaluation.id_evaluation 
//             WHERE matricule_El = '$matricule' 
//             ORDER BY nom_matiere");

//         if (!$notesQuery) {
//             die("Échec de la requête : " . mysqli_error($db_connect));
//         }

//         $notes = [];
//         while ($note = mysqli_fetch_array($notesQuery)) {
//             $notes[] = [
//                 'id' => $note['id_evaluation'],
//                 'ideval' => $note['id_evaluation'],
//                 'nom' => $note['nom_evaluation'],
//                 'matiere' => $note['nom_matiere'],
//                 'bareme' => $note['bareme'],
//                 'niveau' => $note['niveau'],
//                 'description' => $note['description_mat'],
//                 'idMat' => $note['id_matiere'],
//                 'note1' => $note['m1'],
//                 'note2' => $note['m2'],
//                 'note3' => $note['m3'],
//                 'bar' => $note['bareme'],
//                 'moy' => $note['avr'],
                
                
//             ];
//         }
        
//         $data[$matricule] = [
//             'eleve' => $eleve,
//             'notes' => $notes,
            
//         ];
//     }
// } else {
//     echo json_encode([]);
//     exit;
// }

// echo json_encode($data);

$elevesQuery = mysqli_query($db_connect, "SELECT * FROM eleve INNER JOIN classe ON eleve.classe = classe.id_classe WHERE classe = '$classeId' ");
if (!$elevesQuery) {
    die("Échec de la requête : " . mysqli_error($db_connect));
}

$data = [];
$studentCounts = [];

if (mysqli_num_rows($elevesQuery) > 0) {
    while ($eleve = mysqli_fetch_array($elevesQuery)) {
        $matricule = $eleve['matricule_El'];
        $classe = $eleve['classe']; // Assuming 'classe' is the class identifier
        
        if (!isset($studentCounts[$classe])) {
            $studentCounts[$classe] = 0;
        }
        $studentCounts[$classe]++;

        // Requête pour sélectionner les notes de chaque élève
        $notesQuery = mysqli_query($db_connect, "SELECT *, 
            ROUND((IFNULL(m1, 0) + IFNULL(m2, 0) + IFNULL(m3, 0)) / (3 - (ISNULL(m1) + ISNULL(m2) + ISNULL(m3))),2) AS avr 
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
                'bar' => $note['bareme'],
                'moy' => $note['avr'],
            ];
        }

        $data[$matricule] = [
            'eleve' => array_merge($eleve, ['student_count' => $studentCounts[$classe]]), // Add student count to the eleve data
            'notes' => $notes,
        ];
    }
    $data['studentCounts'] = $studentCounts;
} else {
    echo json_encode([]);
    exit;
}

echo json_encode($data);
?>
