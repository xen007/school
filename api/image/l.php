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

        case "GET":
            $pat = explode('/',$_SERVER['REQUEST_URI']);
            if(isset($pat[3])  && ($pat[3] !== '')){
                $json_array = array();
                $userid =$pat[3];
                // echo "user id is...".$userid; die;

                $getuserrow=mysqli_query($db_connect, "SELECT * FROM élève  WHERE matricule_El='$userid' ");
                while($userrow = mysqli_fetch_array($getuserrow)){
                    $json_array['rowUserdata'] = array('id' =>$userrow['matricule_El'], 'matricule' =>$userrow['matricule_El'],'nom' =>$userrow['nom'],'genre' =>$userrow['genre'],'prénom' =>$userrow['prénom'],
                    'dateNaiss' =>$userrow['dateNaiss'],'classe' =>$userrow['classe'],'tuteur' =>$userrow['tuteur'],'adresse' =>$userrow['adresse'],'lieuNaiss' =>$userrow['lieuNaiss'],'photo' =>$userrow['photo'],
                    'phone' =>$userrow['numéro_tuteur'],'infoSup' =>$userrow['infos_supplémentaire'],'niveau' =>$userrow['niveau'],'scolaire' =>$userrow['année_scolaire']
                
                 );
                }
                echo json_encode($json_array['rowUserdata']);
                return;

            }else{
                $alluser = mysqli_query($db_connect,"SELECT * FROM élève INNER JOIN classe on élève.classe = classe.id_classe  ");

                if(mysqli_num_rows($alluser) > 0){
                    while($row = mysqli_fetch_array($alluser)){
                        $json_array["userdata"][] = array('id' =>$row['matricule_El'], 'matricule' =>$row['matricule_El'],'nom' =>$row['nom'],'genre' =>$row['genre'],'prénom' =>$row['prénom'],
                        'dateNaiss' =>$row['dateNaiss'],'classe' =>$row['libellé_classe'],'cl' =>$row['classe'],'tuteur' =>$row['tuteur'],'adresse' =>$row['adresse'],'lieuNaiss' =>$row['lieuNaiss'],
                        'phone' =>$row['numéro_tuteur'],'infoSup' =>$row['infos_supplémentaire'],'photo'=>$row['photo'], 'niveau' =>$row['niveau'],'scolaire' =>$row['année_scolaire']
                    
                     );
                        
                    }
                    echo json_encode($json_array["userdata"]);
                    return;
                } else{
                    echo json_encode(["resultat"=>"Verifiez les informations SVP"]);
                }
            }
            break;
            case "DELETE":
        
                $pat = explode('/',$_SERVER['REQUEST_URI']);
                //echo "userid is.....".$pat[3]; 
                if(isset($pat[3]) && ($pat[3] != "") ){
                    $seldata = mysqli_query($db_connect,"SELECT * FROM élève WHERE matricule_El = '$pat[3]' ");
                    if($seldata){

                        $deldata = mysqli_query($db_connect, "DELETE FROM élève WHERE matricule_El='$pat[3]' ");
        
                        if($deldata){
                     
                            $recup = mysqli_query($db_connect,"SELECT * FROM classe WHERE id_classe ='$classe' ");
                            while($row = mysqli_fetch_array($recup)){
                                $cap=$row['nombre_élève'];
                                $libel = $row['libellé_classe'] ;  
                            }
                            $ncap = $cap-=1;
                            $resut=mysqli_query($db_connect,"UPDATE classe set nombre_élève='$ncap' WHERE id_classe = '$classe' ");
                        
                            if($resut){
                                echo json_encode(["success"=>"l'élève a été supprimé avec succès"]);
                                return;
                            } 
                        }else echo json_encode(['success'=>'Vérifiez les informations SVP']); 

                    }
                    else{
                        echo json_encode(['success'=>'pas de données trouvées']);
                    }
                }
        }