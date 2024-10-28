
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
                $matid =urldecode($pat[4]); //initialise l'index " de l'url à la clé
                // echo "user id is...".$matid; die;
                //requete de recupération des données dans la table avec des jointures et une condition
                $getuserrow=mysqli_query($db_connect, "SELECT * FROM matiere  WHERE id_matiere='$matid' ");
                while($row = mysqli_fetch_array($getuserrow)){
                    //recupération du resulltat de la requete
                            $json_array["matdata"] = array('id' =>$row['id_matiere'], 'idMat' =>$row['id_matiere'],'nom' =>$row['nom_matiere'],'classe' =>$row['classe'],'ens' =>$row['matricule_Ens']
                            ,'filiere' =>$row['filiere'],'description' =>$row['description_mat'],'niveau'=>$row['niveau']
                        );     
                        }
                //affiche les informations récupérés
                echo json_encode($json_array['matdata']);
                return;

            }else{
                //recupères toutes les informations de la table
                $allmat = mysqli_query($db_connect,"SELECT * FROM matiere left join  enseignant on matiere.matricule_Ens = enseignant.matricule_Ens left join niveau on matiere.niveau = niveau.id_niveau ");

                if(mysqli_num_rows($allmat) > 0){
                    //vérifie si les informations sont disponibles et les récupères
                    while($row = mysqli_fetch_array($allmat)){
                        $json_array["matdata"][] = array('id' =>$row['id_matiere'], 'idMat' =>$row['id_matiere'],'nom' =>$row['nom_matiere'],'classe' =>$row['classe'],'niv'=>$row['niveau'],'nomE' =>$row['nomE'],'prenomE' =>$row['prenomE'],
                            'filiere' =>$row['filiere'],'description' =>$row['description_mat'],'niveau' =>$row['libellee_niveau']
                ); 
                        
                    }
                    //affiche les informations récupérés
                    echo json_encode($json_array['matdata']);
                    
                } else{
                    // au cas contraire renvoyer l'erreur
                    echo json_encode(["resultat"=>"Verifiez les informations SVP"]);
                    return;
                }
                }break;
                
                case"POST": //cas de la méthode d'envoi" de données
                    //garder les données envoyés dans une variable
                    $userpostdata = json_decode(file_get_contents("php://input"));
                    // echo 'success take';
                    // print_r($userpostdata);
                    
                    //récupération des  données envoyés
                    $nom = $userpostdata->nom;
                    $niveau = $userpostdata->niveau;
                    // $classe = $userpostdata->classe;
                     
                    $description = $userpostdata->description; 
                    $filiere = $userpostdata->filiere; 
                    //verifier si la matiereest déjà enregidtrée
                    $result = mysqli_query($db_connect, "SELECT * FROM matiere where nom_matiere='$nom' and niveau = '$niveau'");
                    if(mysqli_num_rows($result)>0){
                        // si la niveau existe on revoie l'erreur
                        echo json_encode(["success"=>"matieredeja pour le niveau"]);
                    }else{
                    //sion inserer la matiere
                    $result = mysqli_query($db_connect, "INSERT INTO matiere (nom_matiere,description_mat,matricule_Ens,filiere,niveau) VALUES ('$nom','$description',null,'$filiere','$niveau') ");
        
                        if($result){
                            //afficher en cas de succes
                            echo json_encode(["success"=>"matiere ajoutée avec succès"]);
                            return;
                        }else echo json_encode(['success'=>'Verifiez les informations SVP']); return;
                    }
                    break;
                    case"PUT"://methode d'update
                        $userupdata = json_decode(file_get_contents("php://input"));
                        //données envoyées
                        $matid = $userupdata->idMat;
                        $nom = $userupdata->nom;
                        $niveau = $userupdata->niveau;
                        // $classe = $userupdata->classe;
                        $description = $userupdata->description; 
                        $filiere = $userupdata->filiere; 
                        //requete de mis a jour
 $updatedata = mysqli_query($db_connect, "UPDATE matiere SET nom_matiere = '$nom', niveau = '$niveau',filiere = '$filiere', description_mat= '$description'  WHERE id_matiere='$matid' ");
               
                        if($updatedata){
                            //en cas de succes afficher
                            echo json_encode(["success"=>"matiere modifiée avec succès"]);
                            return;
                        }else echo json_encode(['success'=>'Verifiez les informqtions SVP']); //cas d'une erreur
                        break;

                        case"DELETE":
                
                            $pat = explode('/',$_SERVER['REQUEST_URI']);
                            //echo "matid is.....".$pat[4]; 
                            //requete de suppression
                            $deldata = mysqli_query($db_connect, "DELETE FROM matiereWHERE id_matiere='$pat[4]' ");
                            if($deldata){
                                echo json_encode(["success"=>"matiereretiré avec succes"]);
                                return;    
                            }else echo json_encode(['success'=>'Verifiez les informqtions SVP']); 
                            break;
                    

}