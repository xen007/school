
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');


include 'Dbase.php';
$db = new Dbase;
$conn = $db->connect();
    $pat = explode('/',$_SERVER['REQUEST_URI']);
         if(isset($pat[4])  && ($pat[4] !== '')){
             $json_array = array();
             $userid =$pat[4];
             $sql = "SELECT enseignant.*, jourdispo.* FROM enseignant inner join jourdispo on enseignant.matricule_Ens = jourdispo.matricule_Ens WHERE enseignant.matricule_Ens='$userid' AND jourdispo.matricule_Ens = '$userid' ";
             $stmt = $conn->prepare($sql);
             $stmt-> execute();
         while($users = $stmt->fetch(PDO::FETCH_ASSOC)){
             $json_array['rowUserdata'] = array('matricule' =>$users['matricule_Ens'],'nom' =>$users['nomE'],'civ' =>$users['civilitee'],'prenom' =>$users['prenomE'],
                     'date_naiss' =>$users['dateNaiss'],'adresse' =>$users['adresse'],'lieu_naiss' =>$users['lieuNaiss'],'img' =>$users['photo'], 'email' =>$users['email'],
                     'tel' =>$users['telephone'],'cv' =>$users['cv'],'cni' =>$users['cni'], 'pass' =>$users['mot_de_passe'], 'matiere1' =>$users['matiere1'], 'matiere2' =>$users['matiere2'], 'matiere3' =>$users['matiere3'], 'lundi' =>$users['lundi'],'mardi' =>$users['mardi'],'mercredi' =>$users['mercredi'],'jeudi' =>$users['jeudi'], 'vendredi' =>$users['vendredi'],
         );

         echo json_encode($users);
         return;

         } 
        }
        
        
         else{
                
         echo json_encode(["resultat"=>"Verifiez les informations SVP"]);
             return;
        }
?>