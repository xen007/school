
<?php
require('db.php');

    switch($method){
        case"GET":
            
            $pat = explode('/',$_SERVER['REQUEST_URI']);
            
                $alluser = mysqli_query($db_connect,"SELECT * FROM filiere");

                if(mysqli_num_rows($alluser) > 0){
                    while($row = mysqli_fetch_array($alluser)){
                        $json_array["userdata"][] = array('id' =>$row['id_filiere'], 'libellee_filiere' =>$row['libellee_filiere'],'codeFil' =>$row['code_filiere']); 
                        
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

            $setniv = mysqli_query($db_connect,"UPDATE filiere SET libellee_filiere = '$lib' WHERE id_filiere = '$id' ");
            if($userupdata){
                echo json_encode(["success"=>"Classe modifiée avec succès"]);
                return;
            }else echo json_encode(['success'=>'Verifiez les informations SVP']); 


}