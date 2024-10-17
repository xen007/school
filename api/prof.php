
<?php
require('db.php');

    switch($method){
        case"GET":
            
            $pat = explode('/',$_SERVER['REQUEST_URI']);
            
            if(isset($pat[4])  && ($pat[4] !== '')){
                $json_array = array();
                $userid =urldecode($pat[4]);
                // echo "user id is...".$userid; die;

                $alluser = mysqli_query($db_connect,"SELECT * FROM enseignant WHERE matiere1 LIKE '%$userid%' || matiere2 LIKE '%$userid%' || matiere3 LIKE '%$userid%' ");

                if(mysqli_num_rows($alluser) > 0){
                    while($row = mysqli_fetch_array($alluser)){
                        $json_array["userdata"][] = array('id' =>$row['matricule_Ens'], 'matricule' =>$row['matricule_Ens'],'nom' =>$row['nomE'],'civ' =>$row['civilitee'],'prénom' =>$row['prenomE']
                     );
                        
                    }
                    
                } 
                echo json_encode($json_array["userdata"]);
                return;
            }else{
                $alluser = mysqli_query($db_connect,"SELECT * FROM enseignant ");

                if(mysqli_num_rows($alluser) > 0){
                    while($row = mysqli_fetch_array($alluser)){
                        $json_array["userdata"][] = array('id' =>$row['matricule_Ens'], 'matricule' =>$row['matricule_Ens'],'nom' =>$row['nomE'],'civ' =>$row['civilitee'],'prénom' =>$row['prenomE'],'mat1' =>$row['matiere1'],
                        'mat2' =>$row['matiere2'],'mat3' =>$row['matiere3']
                     );
                        
                    }
                    
                } 
                echo json_encode($json_array["userdata"]);
                return;

            }
    }