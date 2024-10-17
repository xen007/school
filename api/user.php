
<?php  
error_reporting(E_ALL);
ini_set('display_errors',1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

//connexion à la base de données
$db_connect = mysqli_connect("localhost" ,"root","", "used");
if($db_connect === false){
    die("Error: could not connect".mysqli_connect_error());
}
//recupération de la méthode de transfert et reception de données
$method=$_SERVER['REQUEST_METHOD'];
//echo "test-----".$method; die;

    

    //parcour de la méthode d'envoi de l'url
    switch($method){
        case "GET"://methode de récupération de données
            // décompose l'url
            $pat = explode('/',$_SERVER['REQUEST_URI']);
            
            $userupdata = json_decode(file_get_contents("php://input"));
            //données envoyées
            $userid ='SM0002';
            $n1 = 1;
            $n2 = 2;
            $nt= 1;
            
          
                $getuserrow=mysqli_query($db_connect, "SELECT *, note$n1 as note1, note$n2 as note2 FROM note INNER JOIN eleve on note.matricule_El = eleve.matricule_El INNER JOIN matiere on note.id_matiere = matiere.id_matiere INNER JOIN classe on eleve.classe = classe.id_classe LEFT JOIN enseignant on matiere.matricule_Ens = enseignant.matricule_Ens WHERE note.matricule_El='$userid' ORDER BY matiere.nom_matiere  ");
                    while($userrow = mysqli_fetch_array($getuserrow) ){
                        //recupération du resulltat de la requete
                        $ap = '';
                        if ($userrow['note1'] == null ) {
                            if (($userrow['note2']) < 10) {
                                $ap = 'insuffisant';
                            } else if(($userrow['note2']) == 10) {
                                $ap = 'passable';
                            }
                            else if((($userrow['note2']) > 10) && (($userrow['note2']) <= 12)){
                                $ap='passable';
                            }
                            else if((($userrow['note2']) > 12) && (($userrow['note2']) <= 14)){
                                $ap='assez bien';
                            }
                            else if((($userrow['note2']) > 14) && (($userrow['note2']) <= 16)){
                                $ap='bien';
                            }
                            else if((($userrow['note2']) >  16) && (($userrow['note2']) <= 18)){
                                $ap='Très bien';
                            }
                            else {
                                $ap='excellent';
                            }
                        } else if($userrow['note2'] == null ) {
                        
                        if (($userrow['note1'])< 10) {
                            $ap = 'insuffisant';
                        } else if(($userrow['note1'])== 10) {
                            $ap = 'passable';
                        }
                        else if((($userrow['note1'])> 10) && (($userrow['note1'])<= 12)){
                            $ap='passable';
                        }
                        else if((($userrow['note1'])> 12) && (($userrow['note1'])<= 14)){
                            $ap='assez bien';
                        }
                        else if((($userrow['note1'])> 14) && (($userrow['note1'])<= 16)){
                            $ap='bien';
                        }
                        else if((($userrow['note1'])>  16) && (($userrow['note1'])<= 18)){
                            $ap='Très bien';
                        }
                        else {
                            $ap='excellent';
                        }
                    }else{
                        if (($userrow['note1'] + $userrow['note2'])/2 < 10) {
                            $ap = 'insuffisant';
                        } else if(($userrow['note1'] + $userrow['note2'])/2 == 10) {
                            $ap = 'passable';
                        }
                        else if((($userrow['note1'] + $userrow['note2'])/2 > 10) && (($userrow['note1'] + $userrow['note2'])/2 <= 12)){
                            $ap='passable';
                        }
                        else if((($userrow['note1'] + $userrow['note2'])/2 > 12) && (($userrow['note1'] + $userrow['note2'])/2 <= 14)){
                            $ap='assez bien';
                        }
                        else if((($userrow['note1'] + $userrow['note2'])/2 > 14) && (($userrow['note1'] + $userrow['note2'])/2 <= 16)){
                            $ap='bien';
                        }
                        else if((($userrow['note1'] + $userrow['note2'])/2 >  16) && (($userrow['note1'] + $userrow['note2'])/2 <= 18)){
                            $ap='Très bien';
                        }
                        else {
                            $ap='excellent';
                        }
                    }
                        
                        $json_array['rowUserdata'][]= array( 'matricule' =>$userrow['matricule_El'],'nom' =>$userrow['nom'],
                       
                        'idmatiere' =>$userrow['id_matiere'],'coef' =>$userrow['coefficient'],'note1' =>$userrow['note1'],'note2' =>$userrow['note2'],'nomMat' =>$userrow['nom_matiere'],'nomEn' =>$userrow['nomE'], 'app'=> $ap
                    );
                }
               
                 echo json_encode($json_array['rowUserdata']);
                   
}
 