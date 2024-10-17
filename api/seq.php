<?php  
require('db.php');

    //parcour de la méthode d'envoi de l'url
    switch($method){
        case "GET"://methode de récupération de données
            // décompose l'url
            $pat = explode('/',$_SERVER['REQUEST_URI']);
            
            $userupdata = json_decode(file_get_contents("php://input"));
            //données envoyées
            $ns = $_GET['ns'];

            if(isset($_GET['id'])){
                $userid =$_GET['id'];
                $getuserrow=mysqli_query($db_connect, "SELECT *, note$ns as note1 FROM note INNER JOIN eleve on note.matricule_El = eleve.matricule_El INNER JOIN matiere on note.id_matiere = matiere.id_matiere INNER JOIN classe on eleve.classe = classe.id_classe LEFT JOIN enseignant on matiere.matricule_Ens = enseignant.matricule_Ens WHERE note.matricule_El='$userid' ORDER BY matiere.nom_matiere  ");
                    if (mysqli_num_rows($getuserrow) > 0) {
                        while($userrow = mysqli_fetch_array($getuserrow) ){
                            //recupération du resulltat de la requete
                            $ap = '';
                            if ($userrow['note1'] < 10) {
                                $ap = 'insuffisant';
                            } else if($userrow['note1'] == 10) {
                                $ap = 'passable';
                            }
                            else if(($userrow['note1'] > 10) && ($userrow['note1']  <= 12)){
                                $ap='passable';
                            }
                            else if(($userrow['note1'] > 12) && ($userrow['note1'] <= 14)){
                                $ap='assez bien';
                            }
                            else if(($userrow['note1'] > 14) && ($userrow['note1'] <= 16)){
                                $ap='bien';
                            }
                            else if(($userrow['note1'] >  16) && ($userrow['note1']<= 18)){
                                $ap='Très bien';
                            }
                            else {
                                $ap='excellent';
                            }
                            
                            $json_array['rowUserdata'][]= array( 'matricule' =>$userrow['matricule_El'],'scolaire' =>$userrow['annee_scolaire'],'id' =>$userrow['id_note'], 'idnote' =>$userrow['id_note'],
                            'idmatiere' =>$userrow['id_matiere'],'coef' =>$userrow['coefficient'],'note1' =>$userrow['note1'],'note2' =>$userrow['note2'],'nomMat' =>$userrow['nom_matiere'],'nomEn' =>$userrow['nomE'], 'app'=> $ap
                        );
                        
                    }echo json_encode($json_array['rowUserdata']);
                    } else {
                        echo json_encode(["resultat"=>"Verifiez les informations SVP"]);
                    }
                    
                
            }else{
                $alluser = mysqli_query($db_connect,"SELECT distinct matricule_El FROM note  ");

                if(mysqli_num_rows($alluser) > 0){ 
                    while($userrow = mysqli_fetch_array($alluser) ){
                        $mat = $userrow['matricule_El'];
                        $scoef = 0;
                        $getuserrow=mysqli_query($db_connect, "SELECT *,eleve.prenom,eleve.adresse,eleve.dateNaiss,eleve.lieuNaiss,eleve.annee_scolaire, SUM(COALESCE(note$ns,0) * coefficient) AS val, SUM(coefficient) AS coef FROM note INNER JOIN eleve on note.matricule_El = eleve.matricule_El INNER JOIN matiere on note.id_matiere = matiere.id_matiere INNER JOIN classe on eleve.classe = classe.id_classe LEFT JOIN enseignant on matiere.matricule_Ens = enseignant.matricule_Ens  WHERE note.matricule_El='$mat' and note$ns != 'null' order by val desc");
                        if(mysqli_num_rows($getuserrow) > 0){
                           
                               while($userrow = mysqli_fetch_array($getuserrow) ){
                                    //recupération du resulltat de la requete
                        
                                    $moy = $userrow['val'];
                                    $moy = round($moy,3);

                                    $json_array['rowUserdata'][]= array( 'matricule' =>$userrow['matricule_El'], 'ap'=> $userrow['val'],'coeff'=> $userrow['coef'],'moy'=> $moy,'note1' => $userrow['note1'],'nom' =>$userrow['nom'],'genre' =>$userrow['genre'],'prénom' =>$userrow['prenom'],
                                    'adresse' =>$userrow['adresse'],'lieuNaiss' =>$userrow['lieuNaiss'],'dateNaiss' =>$userrow['dateNaiss'],'libcl' =>$userrow['libellee_classe'],'idcl' =>$userrow['id_classe'],'scolaire'=>$userrow['annee_scolaire'],'effectif'=>$userrow['nombre_eleve']

                                 );
                                }
                                
                        };
                    }
                    //affiche les informations récupérés
                    echo json_encode($json_array["rowUserdata"]);
                    return;
                } else{
                    echo json_encode(["resultat"=>"Verifiez les informations SVP"]);
                    return;
                }      
}
}