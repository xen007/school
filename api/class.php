
<?php
    error_reporting(E_ALL);
    ini_set('display_errors',1);
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");



    $db_connect = mysqli_connect("localhost" ,"root","", "test");
    if($db_connect === false){
        die("Error: could not connect".mysqli_connect_error());

    }

    $method=$_SERVER['REQUEST_METHOD'];
    //echo "test-----".$method; die;

    switch($method){
        case"GET":
            
            $pat = explode('/',$_SERVER['REQUEST_URI']);
            
                // $alluser = mysqli_query($db_connect,"SELECT * FROM classe");

                // if(mysqli_num_rows($alluser) > 0){
                //     while($row = mysqli_fetch_array($alluser)){
                //         $json_array["userdata"][] = array('id' =>$row['id_classe'], 'idClasse' =>$row['id_classe'],'libellé_classe' =>$row['libellé_classe'],'niveau' =>$row['niveau'],'enseignant' =>$row['enseignant_principal'],'capacité' =>$row['capacitéAcceuil'],'nombre_élève' =>$row['nombre_élève']); 
                        
                //     }
                //     echo json_encode($json_array["userdata"]);
                //     return;
                // } else{
                //     echo json_encode(["resultat"=>"Please check data"]);
                //     return;
                // }

                if(isset($pat[4])  && ($pat[4] !== '')){
                    $json_array = array();
                    $userid =urldecode($pat[4]);
                    // echo "user id is...".$userid; die;
    
                    $getuserrow=mysqli_query($db_connect, "SELECT * FROM classe WHERE niveau='$userid' ");
                    while($row = mysqli_fetch_array($getuserrow)){
                                $json_array["classdata"][] = array('id' =>$row['id_classe'], 'idClasse' =>$row['id_classe'],'libellé_classe' =>$row['libellé_classe'],'niveau' =>$row['niveau'],'enseignant' =>$row['enseignant_principal'],'capacité' =>$row['capacitéAcceuil'],'nombre_élève' =>$row['nombre_élève']); 
                                
                            }
                    echo json_encode($json_array['classdata']);
                    return;
    
                }else{
                    $alluser = mysqli_query($db_connect,"SELECT * FROM classe");
    
                    if(mysqli_num_rows($alluser) > 0){
                        while($row = mysqli_fetch_array($alluser)){
                            $json_array["classdata"][] = array('id' =>$row['id_classe'], 'idClasse' =>$row['id_classe'],'libellé_classe' =>$row['libellé_classe'],'niveau' =>$row['niveau'],'enseignant' =>$row['enseignant_principal'],'capacité' =>$row['capacitéAcceuil'],'nombre_élève' =>$row['nombre_élève']); 
                            
                        }
                            echo json_encode($json_array['classdata']);
                        return;
                    } else{
                        echo json_encode(["resultat"=>"Verifiez les informations SVP"]);
                        return;
                    }
                }
                

}