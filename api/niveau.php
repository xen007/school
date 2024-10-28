
<?php
require('db.php');

    switch($method){
        case"GET":
            
            $pat = explode('/',$_SERVER['REQUEST_URI']);
            
                $alluser = mysqli_query($db_connect,"SELECT * FROM niveau");

                if(mysqli_num_rows($alluser) > 0){
                    while($row = mysqli_fetch_array($alluser)){
                        $json_array["userdata"][] = array('id' =>$row['id_niveau'], 'libellee_niveau' =>$row['libellee_niveau'],'filiere'=>$row['filiere'],'cycle' =>$row['cycle']); 
                        
                    }
                    echo json_encode($json_array["userdata"]);
                    return;
                } else{
                    echo json_encode(["resultat"=>"Please check data"]);
                    return;
                }
        case "PUT":
            $userupdata = json_decode(file_get_contents("php://input"));

            $id= $userupdata->idNi;
            $lib = $userupdata->lib_niv;

            $setniv = mysqli_query($db_connect,"UPDATE niveau SET libellee_niveau = '$lib' WHERE id_niveau = '$id' ");
            if($userupdata){
                echo json_encode(["success"=>"Classe modifiée avec succès"]);
                return;
            }else echo json_encode(['success'=>'Verifiez les informations SVP']); 


}