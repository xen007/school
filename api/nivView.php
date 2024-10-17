<?php
require('db.php');
    switch($method){
        case"GET":
            
            $pat = explode('/',$_SERVER['REQUEST_URI']);
            
                if(isset($pat[4])  && ($pat[4] !== '')){
                    $json_array = array(); 
                    $userid =$pat[4];
                    // echo "user id is...".$userid; die;
    
                    $getuserrow=mysqli_query($db_connect, "SELECT * FROM  classe left join enseignant ON classe.enseignant1 = enseignant.matricule_Ens left JOIN categorie_classe ON classe.categorie = categorie_classe.id_categorie WHERE niveau='$userid' ");
                    while($row = mysqli_fetch_array($getuserrow)){
                            $cl=$row['id_classe'];
                            $stnum =  mysqli_query($db_connect,"SELECT * FROM eleve where classe = '$cl' ");
                           $rw  = mysqli_num_rows($stnum);
                           $json_array["classdata"][] = array('id' =>$row['id_classe'], 'idClasse' =>$row['id_classe'],'libellé_classe' =>$row['libellee_classe'],'niveau' =>$row['niveau'],'cat' =>$row['libellee_cat'],
                           'enseignant' =>$row['enseignant1'],
                           'nomprof' => $row['nomE'],'capacité' =>$row['capaciteAcceuil'],'nombre_élève' =>$rw,'sco' =>$row['frais_sco'],'ins' =>$row['frais_ins']
           ,'tr1' =>$row['tranche1'],'tr2' =>$row['tranche2'],'tr3' =>$row['tranche3']);      
                       }
                    echo json_encode($json_array['classdata']);
                    return;

    
                }
        
}
// <?php
//     error_reporting(E_ALL);
//     ini_set('display_errors',1);
//     header("Access-Control-Allow-Origin: *");
//     header("Access-Control-Allow-Headers: *");
//     header("Access-Control-Allow-Methods: *");



//     $db_connect = mysqli_connect("localhost" ,"root","", "test");
//     if($db_connect === false){
//         die("Error: could not connect".mysqli_connect_error());
//     }

//     $method=$_SERVER['REQUEST_METHOD'];
//     //echo "test-----".$method; die;

//     switch($method){
//         case"GET":
            
//             $pat = explode('/',$_SERVER['REQUEST_URI']);
            
//                 if(isset($pat[4])  && ($pat[4] !== '')){
//                     $json_array = array(); 
//                     $userid =$pat[4];
//                     // echo "user id is...".$userid; die;
    
//                     $getuserrow=mysqli_query($db_connect, "SELECT * FROM classe WHERE niveau='$userid' ");
//                     while($row = mysqli_fetch_array($getuserrow)){
//                                 $json_array["classdata"][] = array('id' =>$row['id_classe'], 'idClasse' =>$row['id_classe'],'libellé_classe' =>$row['libellé_classe'],'niveau' =>$row['niveau'],'enseignant' =>$row['enseignant_principal'],'capacité' =>$row['capacitéAcceuil'],'nombre_élève' =>$row['nombre_élève']); 
//                                 $us=$row['id_classe'];
//                         $getu=mysqli_query($db_connect, "SELECT * FROM matière WHERE classe='$us' ");
//                         // while($row = mysqli_fetch_array($getu)){
//                         //             $json_array["matdata"][] = array('id' =>$row['id_matière'], 'idMat' =>$row['id_matière'],'nom' =>$row['nom_matière'],'classe' =>$row['classe'],'ens' =>$row['matricule_Ens'],'coef' =>$row['coefficient']);            
//                         //         }
                                
//                         //     }
//                         //     echo json_encode(($json_array['matdata']));
//                     echo json_encode($json_array['classdata']);  
//                     while($row = mysqli_fetch_array($getu)){
//                                     $json_array["matdata"][] = array('id' =>$row['id_matière'], 'idMat' =>$row['id_matière'],'nom' =>$row['nom_matière'],'classe' =>$row['classe'],'ens' =>$row['matricule_Ens'],'coef' =>$row['coefficient']);            
//                                 }
                                
//                             }
//                             echo json_encode(($json_array['matdata']));
                    
//                     // if($getuserrow){
//                     //     $getuserrow=mysqli_query($db_connect, "SELECT * FROM matière WHERE classe='$us' ");
//                     //     while($row = mysqli_fetch_array($getuserrow)){
//                     //                 $json_array["matdata"][] = array('id' =>$row['id_matière'], 'idMat' =>$row['id_matière'],'nom' =>$row['nom_matière'],'classe' =>$row['classe'],'ens' =>$row['matricule_Ens'],'coef' =>$row['coefficient']);            
//                     //             }
//                     //     echo json_encode($json_array['matdata']);
//                     //     return;
        
//                     // }
//                 }
                
        
// }