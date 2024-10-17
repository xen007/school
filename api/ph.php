<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

include 'db.php';
$objDb = new DbConnect;
$conn = $objDb->connect();




    $eData = file_get_contents("php://input");
    $dData = json_decode($eData, true); 

    $name = $dData['name'];
    $email = $dData['email'];
    $mobile = $dData['mobile'];
     
    $sql =$conn->prepare("INSERT INTO users(prénom,email,mobile,created_at) VALUES(?, ?, ?, NOW())") ;
   
    $res =$sql->execute(array($name ,$email ,$mobile));
 
    
     
    // if($res){
    //     echo "Success!";
    // }
    // else{
    //     echo "Error!";
    // }
    // return json_encode($res);



    

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
            $alluser = mysqli_query($db_connect,"SELECT distinct matricule_El  FROM noters");
                $co=0;
                if(mysqli_num_rows($alluser) > 0){
                    while($row = mysqli_fetch_array($alluser)){
                        $mat = $row['matricule_El'];
                       
                       // $luser = mysqli_query($db_connect,"SELECT * FROM noters INNER JOIN élève on noters.matricule_El = élève.matricule_El WHERE noters.matricule_El = '$mat' ");
                       //  $getuserrow=mysqli_query($db_connect, "SELECT *,SUM((note1 +note2)/2 * coefficient) AS val FROM noters INNER JOIN élève on noters.matricule_El = élève.matricule_El INNER JOIN matière on noters.id_matière = matière.id_matière INNER JOIN classe on élève.classe = classe.id_classe LEFT JOIN enseignant on matière.matricule_Ens = enseignant.matricule_Ens WHERE noters.matricule_El='$mat' ORDER BY matière.nom_matière  ");
                        
                        $getuserrow=mysqli_query($db_connect, "SELECT *, SUM((COALESCE(note1,0) +COALESCE(note2,0))/2 * coefficient) AS val, SUM(coefficient) AS coef FROM noters INNER JOIN élève on noters.matricule_El = élève.matricule_El INNER JOIN matière on noters.id_matière = matière.id_matière INNER JOIN classe on élève.classe = classe.id_classe LEFT JOIN enseignant on matière.matricule_Ens = enseignant.matricule_Ens  WHERE noters.matricule_El='$mat' order by val asc ");
                        while($userrow = mysqli_fetch_array($getuserrow) ){
                            //recupération du resulltat de la requete
                            $ap = '';
                            $moy = $userrow['val']/$userrow['coef'];
                        //     $json_array['rowUserdata'][]= array( 'matricule' =>$userrow['matricule_El'],'nom' =>$userrow['nom'],'genre' =>$userrow['genre'],'prénom' =>$userrow['prénom'],'id' =>$userrow['id_noters'], 'idnoters' =>$userrow['id_noters'],
                        //     'idmatière' =>$userrow['id_matière'],'coef' =>$userrow['coefficient'],'note1' =>$userrow['note1'],'note2' =>$userrow['note2'],'nomMat' =>$userrow['nom_matière'],'nomEn' =>$userrow['nomE'], 'app'=> $userrow['val']
                        //  );
                            $json_array['rowUserdata'][]= array( 'matricule' =>$userrow['matricule_El'], 'app'=> $userrow['val'],'coef'=> $userrow['coef'],'moy'=> $moy
                         );
                        }
                        
                    }
                   

                    
                    echo json_encode($json_array["rowUserdata"]);
                    return;
                } else{
                    echo json_encode(["resultat"=>"Please check data"]);
                    return;
                }

                

}

// while($userrow = mysqli_fetch_array($getuserrow) ){
//     //recupération du resulltat de la requete
//     $ap = '';
//     if (($userrow['note1'] + $userrow['note2'])/2 < 10) {
//         $ap = 'insuffisant';
//     } else if(($userrow['note1'] + $userrow['note2'])/2 == 10) {
//         $ap = 'passable';
//     }
//     else if((($userrow['note1'] + $userrow['note2'])/2 > 10) && (($userrow['note1'] + $userrow['note2'])/2 <= 12)){
//         $ap='passable';
//     }
//     else if((($userrow['note1'] + $userrow['note2'])/2 > 12) && (($userrow['note1'] + $userrow['note2'])/2 <= 14)){
//         $ap='assez bien';
//     }
//     else if((($userrow['note1'] + $userrow['note2'])/2 > 14) && (($userrow['note1'] + $userrow['note2'])/2 <= 16)){
//         $ap='bien';
//     }
//     else if((($userrow['note1'] + $userrow['note2'])/2 >  16) && (($userrow['note1'] + $userrow['note2'])/2 <= 18)){
//         $ap='Très bien';
//     }

//     else {
//         $ap='excellent';
//     }
    

//     $json_array['rowUserdata'][]= array( 'matricule' =>$userrow['matricule_El'],'nom' =>$userrow['nom'],'genre' =>$userrow['genre'],'prénom' =>$userrow['prénom'],
//     'dateNaiss' =>$userrow['dateNaiss'],'tuteur' =>$userrow['tuteur'],'adresse' =>$userrow['adresse'],'lieuNaiss' =>$userrow['lieuNaiss'],'photo' =>$userrow['photo'],'libcl' =>$userrow['libellé_classe'],'idcl' =>$userrow['id_classe'],
//     'phone' =>$userrow['numéro_tuteur'],'infoSup' =>$userrow['infos_supplémentaire'],'niveau' =>$userrow['niveau'],'scolaire' =>$userrow['année_scolaire'],'id' =>$userrow['id_noters'], 'idnoters' =>$userrow['id_noters'],
//     'idmatière' =>$userrow['id_matière'],'coef' =>$userrow['coefficient'],'note1' =>$userrow['note1'],'note2' =>$userrow['note2'],'nomMat' =>$userrow['nom_matière'],'nomEn' =>$userrow['nomE'], 'app'=> $ap
// );
// }