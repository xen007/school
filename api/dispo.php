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
             $ens_id =intval($pat[4]);
    $getuserrow = "SELECT * FROM jourdispo where matricule_Ens = '$ens_id' ";
    while($userrow = mysqli_fetch_array($getuserrow)){
      if ($userrow['lundi'] == 1) {
        # code...
      } else {
        # code...
      }
      
        $json_array['rowUserdata'] = array('id' =>$userrow['matricule_El'], 'matricule' =>$userrow['matricule_El'],
     );
    }

        echo json_encode($users);
        return;}elseif ($pat[4] === '') {
            echo json_encode([]);
                return;
        }
        else{
                
            echo json_encode(["resultat"=>"Verifiez les informations SVP"]);
                return;
           }
?>