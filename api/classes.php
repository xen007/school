
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
            
                if(isset($pat[4])  && ($pat[4] !== '')){
                    $json_array = array();
                    $userid =$pat[4];
                    // echo "user id is...".$userid; die;
    
                    $getuserrow=mysqli_query($db_connect, "SELECT * FROM classe WHERE id_classe='$userid' ");
                    while($row = mysqli_fetch_array($getuserrow)){
                                $json_array["classdata"]= array('id' =>$row['id_classe'], 'idClasse' =>$row['id_classe'],'libellé_classe' =>$row['libellé_classe'],'niveau' =>$row['niveau'],'enseignant' =>$row['enseignant_principal'],'capacité' =>$row['capacitéAcceuil'],'nombre_élève' =>$row['nombre_élève']); 
                                
                            }
                    echo json_encode($json_array['classdata']);
                    return;
    
                }else{
                    $alluser = mysqli_query($db_connect,"SELECT * FROM classe");
    
                    if(mysqli_num_rows($alluser) > 0){
                        while($row = mysqli_fetch_array($alluser)){
                            $json_array["classdata"][] = array('id' =>$row['id_classe'], 'idClasse' =>$row['id_classe'],'libellé_classe' =>$row['libellé_classe'],'niveau' =>$row['niveau'],'ens' =>$row['enseignant_principal'],'capacité' =>$row['capacitéAcceuil'],'nombre_élève' =>$row['nombre_élève']); 
                            
                        }
                            echo json_encode($json_array['classdata']);
                        return;
                    } else{
                        echo json_encode(["resultat"=>"Verifiez les informations SVP"]);
                    
                    }
                }
                break;
            
                case"POST":
                    $userpostdata = json_decode(file_get_contents("php://input"));
                    // echo 'success take';
                    // print_r($userpostdata);
         
                    $nom = $userpostdata->nom;
                    $niveau = strtoupper($userpostdata->niveau);
                    $capacité = $userpostdata->capacité; 
                    $ens = $userpostdata->ens; 

                    $result = mysqli_query($db_connect, "SELECT * FROM classe where libellé_classe ='$nom' and niveau = '$niveau'");
                    if(mysqli_num_rows($result)>0){
                        echo json_encode(["success"=>"la classe existe pour ce niveau"]);
                    }else{
                    
                        $result = mysqli_query($db_connect, "INSERT INTO classe(libellé_classe,niveau,enseignant_principal,capacitéAcceuil) VALUES ('$nom', '$niveau',NULL,'$capacité') ");
                         $result = mysqli_query($db_connect, "SELECT * FROM classe WHERE libellé_classe = '$nom' ");
                         while($row = mysqli_fetch_array($result)){
                            // $json_array["classdata"][] = array('id' =>$row['id_classe'], 'idClasse' =>$row['id_classe'],'libellé_classe' =>$row['libellé_classe'],'niveau' =>$row['niveau'],'enseignant' =>$row['enseignant_principal'],'capacité' =>$row['capacitéAcceuil'],'nombre_élève' =>$row['nombre_élève']); 
                            $nom = $row['id_classe'];
                        }
                        
                        // echo json_encode($json_array['classdata']);
                        if($result){
                            switch($niveau){
                                case"1":
                                case"2":                                    
                                case"3":                                    
                                case"4":                                    

                                    $mat = array(
                                        "0" => array("Mathématiques", $nom, "3"),
                                        "1" => array("Physique", $nom, "2"),
                                        "2" => array("Chimie", $nom, "2"),
                                        "3" => array("Geographie", $nom, "2"),
                                        "4" => array("Histoire", $nom, "2"),
                                        "5" => array("Français", $nom, "3"),
                                        "6" => array("PCT", $nom, "2"),
                                        "7" => array("SVT", $nom, "2"),
                                        "8" => array("Informatique", $nom, "2"),
                                        "9" => array("Anglais", $nom, "3"),
                                      
                                      
                                    );

                                    case"5":
                                    case"6":
                                    case"7":
                                        $mat = array(
                                            "0" => array("Mathématiques", $nom, "4"),
                                            "1" => array("Physique", $nom, "3"),
                                            "2" => array("Chimie", $nom, "3"),
                                            "3" => array("Geographie", $nom, "2"),
                                            "4" => array("Histoire", $nom, "2"),
                                            "5" => array("Français", $nom, "3"),
                                            "6" => array("PCT", $nom, "2"),
                                            "7" => array("SVT", $nom, "2"),
                                            "8" => array("Informatique", $nom, "2"),
                                            "9" => array("Anglais", $nom, "4"),
                                            
                                            
                                        );
                                    if(is_array($mat)){
                                        foreach ($mat as $row) {
                                            $fieldVal1 = mysqli_real_escape_string($db_connect, $row[0]);
                                            $fieldVal2 = mysqli_real_escape_string($db_connect, $row[1]);
                                            $fieldVal3 = mysqli_real_escape_string($db_connect, $row[2]);

                                            $result = mysqli_query($db_connect,"INSERT INTO matière (nom_matière, classe, coefficient,matricule_Ens) VALUES ( '". $fieldVal1."','".$fieldVal2."','".$fieldVal3."',NULL)");
                                        }
                                    }
                            }
                                echo json_encode(["success"=>" ajoutée avec succès"]);
                                return;
                            }else echo json_encode(['success'=>'Verifiez les informations SVP']); return;
                            }
                            break;
                            case"PUT":
                                $userupdata = json_decode(file_get_contents("php://input"));
                                // echo 'success take';
                                // print_r($userupdata);
                                $userid = $userupdata->idClasse;
                                $nom = $userupdata->libellé_classe;
                                $niveau = $userupdata->niveau;
                                $capacité = $userupdata->capacité; 
                                $ens = $userupdata->enseignant; 
                    
                                $updatedata = mysqli_query($db_connect, "UPDATE classe SET libellé_classe = '$nom', niveau = '$niveau', enseignant_principal ='$ens', capacitéAcceuil = '$capacité'  WHERE id_classe='$userid' ");
                    
                                if($updatedata){
                                    echo json_encode(["success"=>"Classe modifiée avec succès"]);
                                    return;
                                }else echo json_encode(['success'=>'Verifiez les informations SVP']); 
                                break;
        

                            case"DELETE":
                        
                                $pat = explode('/',$_SERVER['REQUEST_URI']);
                                //echo "userid is.....".$pat[4]; 
                    
                                $deldata = mysqli_query($db_connect, "DELETE FROM classe WHERE id_classe='$pat[4]' ");
                    
                                if($deldata){
                                    echo json_encode(["success"=>" retiré avec succes"]);
                                    return;
                                    
                                }else echo json_encode(['success'=>'Verifiez les informations SVP']); 
                                break;
                

}   