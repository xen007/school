<?php
require('db.php');
    
    //parcour de la méthode d'envoi de l'url
    switch($method){
        case "GET"://methode de récupération de données    
            // décompose l'url  
            $pat = explode('/',$_SERVER['REQUEST_URI']);
            //verifie si le chemin url est atteint et s'il n'est pas vide
            if(isset($pat[4])  && ($pat[4] !== '')){
                $json_array = array();
                $userid =urldecode($pat[4]);
                // echo "user id is...".$userid; die;
                //requete de recupération des données dans la table avec des jointures et une condition
                $getuserrow=mysqli_query($db_connect, "SELECT * FROM eleve  WHERE matricule_El='$userid' ");
                while($userrow = mysqli_fetch_array($getuserrow)){
                    //recupération du resulltat de la requete
                    $json_array['rowUserdata'] = array('id' =>$userrow['matricule_El'], 'matricule' =>$userrow['matricule_El'],'nom' =>$userrow['nom'],'genre' =>$userrow['genre'],'prenom' =>$userrow['prenom'],
                    'dateNaiss' =>$userrow['dateNaiss'],'classe' =>$userrow['classe'],'tuteur' =>$userrow['tuteur'],'adresse' =>$userrow['adresse'],'lieuNaiss' =>$userrow['lieuNaiss'],'photo' =>$userrow['photo'],
                    'phone' =>$userrow['numero_tuteur'],'infoSup' =>$userrow['infos_supplementaire'],'niveau' =>$userrow['niveau'],'scolaire' =>$userrow['annee_scolaire'],'stat' =>$userrow['statut']
                
                 );
                }
                //affiche les informations récupérés
                echo json_encode($json_array['rowUserdata']);
                return;

            }else{
                //recupères toutes les informations de la table
                $alluser = mysqli_query($db_connect,"SELECT * FROM eleve LEFT JOIN classe on eleve.classe = classe.id_classe  LEFT JOIN categorie_classe ON classe.categorie = categorie_classe.id_categorie ");
                //vérifie si les informations sont disponibles et les récupères
                if(mysqli_num_rows($alluser) > 0){
                    while($row = mysqli_fetch_array($alluser)){
                        $json_array["userdata"][] = array('id' =>$row['matricule_El'], 'matricule' =>$row['matricule_El'],'nom' =>$row['nom'],'genre' =>$row['genre'],'prenom' =>$row['prenom'],
                        'dateNaiss' =>$row['dateNaiss'],'classe' =>$row['libellee_classe'],'cl' =>$row['classe'],'tuteur' =>$row['tuteur'],'adresse' =>$row['adresse'],'lieuNaiss' =>$row['lieuNaiss'],
                        'phone' =>$row['numero_tuteur'],'infoSup' =>$row['infos_supplementaire'],'photo'=>$row['photo'], 'niveau' =>$row['niveau'],'scolaire' =>$row['annee_scolaire'],'stat' =>$row['statut'],
                        'ins'=> $row['frais_ins'],'sco'=> $row['frais_sco']
                     );
                        
                    }
                    //affiche les informations récupérés
                    echo json_encode($json_array["userdata"]);
                    return;
                } else{
                    // au cas contraire renvoyer l'erreur
                    echo json_encode(["resultat"=>"Verifiez les informations SVP"]);
                    return;
                }
            }
            case "DELETE":
        
                $pat = explode('/',$_SERVER['REQUEST_URI']);
                //echo "userid is.....".$pat[4]; 
                if(isset($pat[4]) && ($pat[4] != "") ){
                    $seldata = mysqli_query($db_connect,"SELECT * FROM eleve WHERE matricule_El = '$pat[4]' ");
                    if($seldata){

                        $deldata = mysqli_query($db_connect, "DELETE FROM eleve WHERE matricule_El='$pat[4]' ");
        
                        if($deldata){
                            echo json_encode(["success"=>"l'eleve a été supprimé avec succès"]);
                            return;
                        }else echo json_encode(['success'=>'Vérifiez les informations SVP']); 

                    }
                    else{
                        echo json_encode(['success'=>'pas de données trouvées']);
                    }
                }
        } 