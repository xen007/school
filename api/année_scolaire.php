
<?php
require('db.php');

    switch($method){
        case"GET":
            
            $pat = explode('/',$_SERVER['REQUEST_URI']);
            
                $alluser = mysqli_query($db_connect,"SELECT * FROM année_scolaire");

                if(mysqli_num_rows($alluser) > 0){
                    while($row = mysqli_fetch_array($alluser)){
                        $json_array["userdata"][] = array('id' =>$row['id_année'], 'libellé_année' =>$row['libellé_année']); 
                        
                    }
                    echo json_encode($json_array["userdata"]);
                    return;
                } else{
                    echo json_encode(["resultat"=>"Please check data"]);
                    return;
                }

                

}