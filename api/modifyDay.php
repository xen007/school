<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');

include 'Dbase.php';
$db = new Dbase;
$conn = $db->connect();
$pat = explode('/', $_SERVER['REQUEST_URI']);

$val = [];

if (isset($pat[4]) && ($pat[4] !== '')) {
    $matricule = $pat[4];
    $sql = "SELECT * FROM jourdispo WHERE matricule_Ens ='$matricule'";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC); // Fetch all rows

    foreach ($users as $user) { // Loop through each user's availability
        $days = [];

        if ($user['lundi'] == 1) $days[] = ["id_jour" => 1, "libellee_jour" => "Lundi"];
        if ($user['mardi'] == 1) $days[] = ["id_jour" => 2, "libellee_jour" => "Mardi"];
        if ($user['mercredi'] == 1) $days[] = ["id_jour" => 3, "libellee_jour" => "Mercredi"];
        if ($user['jeudi'] == 1) $days[] = ["id_jour" => 4, "libellee_jour" => "Jeudi"];
        if ($user['vendredi'] == 1) $days[] = ["id_jour" => 5, "libellee_jour" => "Vendredi"];

        if (!empty($days)) {
            $val = $days;
            break; // If availability is found, break out of the loop
        }
    }

    if (empty($val)) {
        $val = ["Aucune disponibilité trouvée"];
    }

    echo json_encode($val);
    return;
}
?>
