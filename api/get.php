<?php
require('db.php');

    //parcour de la méthode d'envoi de l'url
    $query2 = "select * from eleve order by matricule_El desc limit 1";
    $result2 = mysqli_query($db_connect,$query2);
    $last_id = '';
    if ($row = mysqli_fetch_assoc($result2)){
    $last_id = $row['matricule_El'];
   
    } if ($last_id == "" )
    {
        $stud_ID = "2024NGSOP001";
    }
    else
    {
        $idd = (int) str_replace("2024NGSOP", "", $last_id);
        $id = str_pad($idd + 1, 3, '0', STR_PAD_LEFT);
        $stud_ID = '2024NGSOP' . $id;
    }
    $json_array['rowUserdata'] = array('matricule' => $stud_ID);

//affiche les informations récupérés
echo json_encode($json_array['rowUserdata']);