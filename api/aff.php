
<?php
require('db.php');

    switch($method){
        case"GET":
            
        $pat = explode('/',$_SERVER['REQUEST_URI']);
        
        
        if(isset($pat[4])  && ($pat[4] !== '')){
            $json_array = array();
            $userid = urldecode($pat[4]);

            // $getuserrow=mysqli_query($db_connect, "SELECT distinct matricule_Ens FROM enseignant WHERE matière Like '$userid' ");

            $alluser = mysqli_query($db_connect,"SELECT * FROM enseignant ");

                if(mysqli_num_rows($alluser) > 0){
                    while($row = mysqli_fetch_array($alluser)){
                        $json_array["userdata"][] = array('id' =>$row['matricule_Ens'], 'matricule' =>$row['matricule_Ens'],'nom' =>$row['nom'],'civ' =>$row['civilité'],'prénom' =>$row['prénom']
                     );
                        
                    }
                    echo json_encode($json_array["userdata"]);
                    return;
                } else{
                    echo json_encode(["resultat"=>"Verifiez les informations SVP"]);
                    return;
                }
            }break;
            
       
       
            case"PUT":
                $userupdata = json_decode(file_get_contents("php://input"));
                // echo 'success take';
                // print_r($userupdata);
                $userid = $userupdata->idSub;
                $ens = $userupdata->ens; 
    
                $updatedata = mysqli_query($db_connect, "UPDATE matiere SET matricule_Ens ='$ens'  WHERE id_matiere='$userid' ");

                if($updatedata){
                    echo json_encode(["success"=>"Classe modifiée avec succès"]);
                    return;
                }else echo json_encode(['success'=>'Verifiez les informations SVP']);         
                        
}