
<?php
require('db.php');
    //parcour de la méthode d'envoi de l'url
    switch($method){
        case"GET"://methode de récupération de données    
            // décompose l'url   
            $pat = explode('/',$_SERVER['REQUEST_URI']);
            //verifie si le chemin url est atteint et s'il n'est pas vide    
                if(isset($pat[4])  && ($pat[4] !== '')){
                    $json_array = array(); 
                    $userid =$pat[4];
                    // echo "user id is...".$userid; die;
                    //requete de recupération des données dans la table avec des jointures et une condition
                    $getuserrow=mysqli_query($db_connect, "SELECT * FROM classe LEFT JOIN categorie_classe ON classe.categorie = categorie_classe.id_categorie WHERE id_classe='$userid' ");
                    while($row = mysqli_fetch_array($getuserrow)){
                                $json_array["classdata"] = array('id' =>$row['id_classe'], 'idClasse' =>$row['id_classe'],'libellé_classe' =>$row['libellee_classe'],'niveau' =>$row['niveau'],'cat' =>$row['categorie'],'enseignant' =>$row['enseignant1'], 'enseignant2' =>$row['enseignant2'],'capacité' =>$row['capaciteAcceuil'],'nombre_élève' =>$row['nombre_eleve']
                            ,'sco' =>$row['frais_sco'],'ins' =>$row['frais_ins'],'tr1' =>$row['tranche1'],'tr2' =>$row['tranche2'],'tr3' =>$row['tranche3'],'filiere'=>$row['filiere']
                        ); 
                                
                            }
                    echo json_encode($json_array['classdata']);
                    return;
    
                }else{
                     //recupères toutes les informations de la table
                    $alluser = mysqli_query($db_connect,"SELECT * FROM classe left join enseignant ON classe.enseignant1 = enseignant.matricule_Ens LEFT JOIN categorie_classe ON classe.categorie = categorie_classe.id_categorie ORDER BY niveau ASC");
                    if(mysqli_num_rows($alluser) > 0){
                        //vérifie si les informations sont disponibles et les récupères
                        while($row = mysqli_fetch_array($alluser)){
                            $cl=$row['id_classe'];
                            $stnum =  mysqli_query($db_connect,"SELECT * FROM eleve where classe = '$cl' ");
                           $rw  = mysqli_num_rows($stnum);
                            $json_array["classdata"][] = array('id' =>$row['id_classe'], 'idClasse' =>$row['id_classe'],'libellé_classe' =>$row['libellee_classe'],'niveau' =>$row['niveau'],'cat' =>$row['libellee_cat'],
                            'enseignant' =>$row['enseignant1'], 'enseignant2' =>$row['enseignant2'],
                            'nomprof' => $row['nomE'],'capacité' =>$row['capaciteAcceuil'],'nombre_élève' =>$rw,'sco' =>$row['frais_sco'],'ins' =>$row['frais_ins']
            ,'tr1' =>$row['tranche1'],'tr2' =>$row['tranche2'],'tr3' =>$row['tranche3']);      
                        }
                        //affiche les informations récupérés
                        echo json_encode($json_array['classdata']);
                        return;
                    } else{
                        // au cas contraire renvoyer l'erreur
                        echo json_encode(["resultat"=>"Verifiez les informations SVP"]);
                        return;
                    }
               
                }

                case"POST"://cas de la méthode d'envoi" de données
                    //garder les données envoyés dans une variable
                    $userpostdata = json_decode(file_get_contents("php://input"));

                    $nom = $userpostdata->nom;
                    $niveau = strtoupper($userpostdata->niveau);
                    $cat = $userpostdata->cat; 
                    $capacité = $userpostdata->capacité; 
                    $ens = $userpostdata->ens; 
                    $filiere = $userpostdata->filiere; 
                    //verifier si la matiere est déjà enregidtrée
                    $result = mysqli_query($db_connect, "SELECT * FROM classe where libellee_classe ='$nom' and niveau = '$niveau'");
                    if(mysqli_num_rows($result)>0){
                        //sion inserer la classe
                        echo json_encode(["success"=>"la classe existe pour ce niveau"]);
                    }else{
                    
                        $result = mysqli_query($db_connect, "INSERT INTO classe(libellee_classe,niveau,categorie,enseignant1,enseignant2,capaciteAcceuil,filiere) VALUES ('$nom', '$niveau','$cat',NULL,NULL,'$capacité','$filiere') ");
    
                        // echo json_encode($json_array['classdata']);
                        if($result){
                            // por le niveau 1 a 4 inserer les matieres suivantes et leur coef
                            echo json_encode(["success"=>" ajoutée avec succès"]);
                            return;
                        } else echo json_encode(['success'=>'Verifiez les informations SVP']); return;
                    }

                case"PUT"://methode d'update
                    $userupdata = json_decode(file_get_contents("php://input"));
                    // echo 'success take';
                    // print_r($userupdata);
                    //données envoyées
                    $userid = $userupdata->idClasse;
                    $nom = $userupdata->libellé_classe;
                    $cat= $userupdata->cat;
                    $niveau = $userupdata->niveau;
                    $capacité = $userupdata->capacité; 
                    $filiere = $userupdata->filiere; 
                    // $sco = $userupdata->sco; 
                    // $ins = $userupdata->ins; 
                    //requete de mis a jour
                    $updatedata = mysqli_query($db_connect, "UPDATE classe SET libellee_classe = '$nom', niveau = '$niveau',categorie = '$cat', capaciteAcceuil = '$capacité', filiere = '$filiere'  WHERE id_classe='$userid' ");
                    if($updatedata){
                        //en cas de succes afficher
                        echo json_encode(["success"=>"Classe modifiée avec succès"]);
                        return;
                    }else echo json_encode(['success'=>'Verifiez les informations SVP']); 

                    case"DELETE":
                        
                        $pat = explode('/',$_SERVER['REQUEST_URI']);
                        //echo "userid is.....".$pat[4]; 
                        //requete de suppression
                        $deldata = mysqli_query($db_connect, "DELETE FROM classe WHERE id_classe='$pat[4]' ");
                        if($deldata){
                            echo json_encode(["success"=>" retiré avec succes"]);
                            return;
                            
                        }else echo json_encode(['success'=>'Verifiez les informations SVP']);
        
                
        
}