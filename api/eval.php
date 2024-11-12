
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
                $evalid =urldecode($pat[4]); //initialise l'index " de l'url à la clé
                // echo "user id is...".$evalid; die;
                //requete de recupération des données dans la table avec des jointures et une condition
                $getuserrow=mysqli_query($db_connect, "SELECT * FROM evaluation  WHERE id_evaluation ='$evalid' ");
                while($row = mysqli_fetch_array($getuserrow)){
                    //recupération du resulltat de la requete
                            $json_array["evaldata"] = array('id' =>$row['id_evaluation'], 'ideval' =>$row['id_evaluation'],'nom' =>$row['nom_evaluation'],'idMat' =>$row['matiere'],'bareme' =>$row['bareme'],'niveau' =>$row['niveau']
                        );     
                        }
                //affiche les inforevalions récupérés
                echo json_encode($json_array['evaldata']);
                return;

            }else{
                //recupères toutes les inforevalions de la table
                $alleval = mysqli_query($db_connect,"SELECT * FROM evaluation  INNER JOIN matiere  on evaluation.matiere= matiere.id_matiere ");

                if(mysqli_num_rows($alleval) > 0){
                    //vérifie si les inforevalions sont disponibles et les récupères
                    while($row = mysqli_fetch_array($alleval)){
                        $json_array["evaldata"][] = array('id' =>$row['id_evaluation'], 'ideval' =>$row['id_evaluation'],'nom' =>$row['nom_evaluation'],'matiere' =>$row['nom_matiere'],'bareme'=>$row['bareme'],'niveau' =>$row['niveau'],
                        'idMat' =>$row['matiere'],
                ); 
                        
                    }
                    //affiche les inforevalions récupérés
                    echo json_encode($json_array['evaldata']);
                    
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
                    $matiere = $userpostdata->matiere;
                    $bareme = $userpostdata->bareme; 
                    $niveau = $userpostdata->niveau; 
                    //verifier si la evaluation est déjà enregidtrée
                    $result = mysqli_query($db_connect, "SELECT * FROM evaluation where nom_evaluation ='$nom' and matiere = '$matiere'");
                    if(mysqli_num_rows($result)>0){
                        // si la matiere existe on revoie l'erreur
                        echo json_encode(["success"=>"evaluation deja ajoutée pour la matiere"]);
                    }else{
                    //sion inserer la evaluation 
                    $result = mysqli_query($db_connect, "INSERT INTO evaluation  (nom_evaluation,matiere,bareme,niveau) VALUES ('$nom', '$matiere','$bareme',$niveau) ");
        
                        if($result){
                            //afficher en cas de succes
                            echo json_encode(["success"=>"evaluation  ajoutée avec succès"]);
                            return;
                        }else echo json_encode(['success'=>'Verifiez les informations SVP']); return;
                    }
                    break;
                    case"PUT"://methode d'update
                        $userupdata = json_decode(file_get_contents("php://input"));
                        //données envoyées
                        $evalid = $userupdata->ideval;
                        $nom = $userupdata->nom;
                        $matiere = $userupdata->matiere;
                        $bareme = $userupdata->bareme; 
                        $niveau = $userupdata->niveau; 
                        //requete de mis a jour
                        $updatedata = mysqli_query($db_connect, "UPDATE evaluation  SET nom_evaluation = '$nom', matiere = '$matiere', bareme = '$bareme', niveau = '$niveau' WHERE id_evaluation ='$evalid' ");
                        if($updatedata){
                            //en cas de succes afficher
                            echo json_encode(["success"=>"evaluation  modifiée avec succès"]);
                            return;
                        }else echo json_encode(['success'=>'Verifiez les informations SVP']); //cas d'une erreur
                        break;

                        case"DELETE":
                
                            $pat = explode('/',$_SERVER['REQUEST_URI']);
                            //echo "evalid is.....".$pat[4]; 
                            //requete de suppression
                            $deldata = mysqli_query($db_connect, "DELETE FROM evaluation WHERE id_evaluation ='$pat[4]' ");
                            if($deldata){
                                echo json_encode(["success"=>"evaluation retiré avec succes"]);
                                return;    
                            }else echo json_encode(['success'=>'Verifiez les informations SVP']); 
                            break;
                    

}