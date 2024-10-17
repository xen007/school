
<?php
require('db.php');
//parcour de la méthode d'envoi de l'url
switch($method){
    case"GET"://methode de récupération de données    
        // décompose l'url   
        $pat = explode('/',$_SERVER['REQUEST_URI']);
        //verifie si le chemin url est atteint et s'il n'est pas vide    
            if(isset($_GET['tab']) ){
                $userupdata = json_decode(file_get_contents("php://input"));
                    $tab =$_GET['tab'];
                    $userid =$_GET['id'];
                     //recupères toutes les informations de la table
                    $alluser = mysqli_query($db_connect,"SELECT * FROM $tab WHERE id = $userid");
                    if(mysqli_num_rows($alluser) > 0){
                        //vérifie si les informations sont disponibles et les récupères
                        while($row = mysqli_fetch_array($alluser)){
                            if ($tab == 'sequence') {
                                $json_array["seqdata"] = array('id' =>$row['id'], 'idsequence' =>$row['id'],'libellee' =>$row['libellee_sequence'],'debut' =>$row['date_debut'],'fin' =>$row['date_fin']); 
                            }elseif ($tab == 'trimestre') {
                                $json_array["seqdata"] = array('id' =>$row['id'], 'idtrimestre' =>$row['id'],'libellee' =>$row['libellee_trimestre'],'debut' =>$row['date_debut'],'fin' =>$row['date_fin']); 
                            }else{
                            $annee = '2024-2025';
                            $json_array["seqdata"] = array('id' =>$row['id'],'libellee' => $annee,'debut' =>$row['date_debut'],'fin' =>$row['date_fin']); 
                            }
                        }
                        //affiche les informations récupérés
                        echo json_encode($json_array['seqdata']);
                        return;
                    } else{
                        // au cas contraire renvoyer l'erreur
                        echo json_encode(["resultat"=>"Verifiez les informations SVP"]);
                        return;
                    }
            }else{
                $json_array = array(); 
                $userid =$pat[4];
                $alluser = mysqli_query($db_connect,"SELECT * FROM $userid ");
                if(mysqli_num_rows($alluser) > 0){
                    //vérifie si les informations sont disponibles et les récupères
                    while($row = mysqli_fetch_array($alluser)){
                        if ($userid == 'sequence') {
                            $json_array["seqdata"][] = array('id' =>$row['id'], 'idsequence' =>$row['id'],'libellee' =>$row['libellee_sequence'],'debut' =>$row['date_debut'],'fin' =>$row['date_fin']); 
                        }elseif ($userid == 'trimestre') {
                            $json_array["seqdata"][] = array('id' =>$row['id'], 'idtrimestre' =>$row['id'],'libellee' =>$row['libellee_trimestre'],'debut' =>$row['date_debut'],'fin' =>$row['date_fin']); 
                        }else{
                        $annee = '2024-2025';
                        $json_array["seqdata"][] = array('id' =>$row['id'],'libellee' => $annee,'debut' =>$row['date_debut'],'fin' =>$row['date_fin']); 
                        }
                    }
                    //affiche les informations récupérés
                    echo json_encode($json_array['seqdata']);
                    return;
                }
                
            }

            case"PUT"://methode d'update
                $userupdata = json_decode(file_get_contents("php://input"));
                //données envoyées
                $tab = $userupdata->tab;
                $userid = $userupdata->id;
                $debut = $userupdata->debut;
                $fin = $userupdata->fin; 
                //requete de mis a jour
                if ($tab == 'sequence') {
                    $updatedata = mysqli_query($db_connect, "UPDATE $tab SET date_debut = '$debut', date_fin = '$fin'  WHERE id='$userid' ");
                }elseif ($tab == 'trimestre') {
                    $updatedata = mysqli_query($db_connect, "UPDATE $tab SET date_debut = '$debut', date_fin = '$fin'  WHERE id='$userid' ");
                }else{
                    $updatedata = mysqli_query($db_connect, "UPDATE $tab SET date_debut = '$debut', date_fin = '$fin'  WHERE id='$userid' ");
                }
                if($updatedata){
                    //en cas de succes afficher
                    echo json_encode(["success"=>" Période défini avec succès"]);
                    return;
                }else echo json_encode(['success'=>'Verifiez les informations SVP']); 

    
}