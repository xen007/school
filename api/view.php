
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
             $sql = "SELECT * FROM enseignant WHERE matricule_Ens='$userid' ";
             $stmt = $conn->prepare($sql);
             $stmt-> execute();
         while($users = $stmt->fetch(PDO::FETCH_ASSOC)){
             $json_array['rowUserdata'] = array('matricule' =>$users['matricule_Ens'],'nom' =>$users['nomE'],'civ' =>$users['civilitee'],'prenom' =>$users['prenomE'],
                     'date_naiss' =>$users['dateNaiss'],'adresse' =>$users['adresse'],'lieu_naiss' =>$users['lieuNaiss'],'img' =>$users['photo'], 'email' =>$users['email'],
                     'tel' =>$users['telephone'],'cv' =>$users['cv'],'cni' =>$users['cni'], 'pass' =>$users['mot_de_passe'] 
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