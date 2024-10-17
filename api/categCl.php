<?php
include ('db.php');

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
            $getuserrow=mysqli_query($db_connect, "SELECT * FROM categorie_classe WHERE id_categorie='$userid' ");
            while($row = mysqli_fetch_array($getuserrow)){
                $json_array["catdata"] = array('id' =>$row['id_categorie'],'libellee' => $row['libellee_cat'],'des' =>$row['description'],'sco' =>$row['frais_sco'],'ins' =>$row['frais_ins']
            ,'tr1' =>$row['tranche1'],'tr2' =>$row['tranche2'],'tr3' =>$row['tranche3']); 
                
            }
            echo json_encode($json_array['catdata']);
            return;
            }else{
                $alluser = mysqli_query($db_connect,"SELECT * FROM categorie_classe ");
                if(mysqli_num_rows($alluser) > 0){
                    //vérifie si les informations sont disponibles et les récupères
                    while($row = mysqli_fetch_array($alluser)){
                        $json_array["catdata"][] = array('id' =>$row['id_categorie'],'libellee' => $row['libellee_cat'],'des' =>$row['description'],'sco' =>$row['frais_sco'],'ins' =>$row['frais_ins']
                        ,'tr1' =>$row['tranche1'],'tr2' =>$row['tranche2'],'tr3' =>$row['tranche3']); 
                    }
                    //affiche les informations récupérés
                    echo json_encode($json_array['catdata']);
                    return;
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
                $des = $userpostdata->des;
                $ins = $userpostdata->ins; 
                $sco = $userpostdata->sco; 
                $tr1 = $userpostdata->tr1; 
                $tr2 = $userpostdata->tr2; 
                $tr3 = $userpostdata->tr3; 
                //sion inserer la cat
                $result = mysqli_query($db_connect, "INSERT INTO categorie_classe (libellee_cat,description,frais_ins,frais_sco,tranche1,tranche2,tranche3) VALUES ('$nom', '$des','$ins','$sco','$tr1','$tr2','$tr3') ");
                    if($result){
                        //afficher en cas de succes
                        echo json_encode(["success"=>"Ajoutée avec succès"]);
                        return;
                    }else echo json_encode(['success'=>'Verifiez les informations SVP']); return;
                
                break;

            case"PUT"://methode d'update
                $userupdata = json_decode(file_get_contents("php://input"));
                //données envoyées
                $userid = $userupdata->id;
                $nom = $userupdata->libellee;
                $des = $userupdata->des;
                $ins = $userupdata->ins; 
                $tr1 = $userupdata->tr1; 
                $tr2 = $userupdata->tr2; 
                $tr3 = $userupdata->tr3; 
                $sco = $userupdata->sco; 
                //sion inserer la cat
                $result = mysqli_query($db_connect, "UPDATE categorie_classe SET libellee_cat = '$nom' ,description = '$des' ,frais_ins =' $ins',frais_sco =' $sco',tranche1 ='$tr1',tranche2 ='$tr2',tranche3 ='$tr3' WHERE id_categorie =' $userid' ");
                    if($result){
                        //afficher en cas de succes
                        echo json_encode(["success"=>"Modifié avec succès"]);
                        return;
                    }else echo json_encode(['success'=>'Verifiez les informations SVP']); return;
                

    
}