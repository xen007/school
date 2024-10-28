
<?php
require('db.php');
    //echo "test-----".$method; die;
    //parcour de la méthode d'envoi de l'url
    switch($method){
        case"GET":  //methode de récupération de données    
            // décompose l'url
        $pat = explode('/',$_SERVER['REQUEST_URI']);
    
        if(isset($pat[4])  && ($pat[4] !== '')){
            $json_array = array();
            $userid =urldecode($pat[4]);
            //initialise l'index " de l'url à la clé
            // echo "user id is...".$matid; die;
            //requete de recupération des données dans la table avec des jointures et une condition
            $getuserrow=mysqli_query($db_connect, "SELECT  * FROM enseignant ");
            while($row = mysqli_fetch_array($getuserrow)){
            //recupération du resulltat de la requete
            $json_array["matdata"][] = array('ens' =>$row['matricule_Ens'],'nomE'=>$row['nomE']
        ); 
        }
            //affiche les informations récupérés
        echo json_encode($json_array['matdata']);
        return;
        }break;
        case"PUT"://methode d'update
            $userupdata = json_decode(file_get_contents("php://input"));
            //données envoyées
            $userid = $userupdata->idCl;
            $ens = $userupdata->ens; 
            //requete de mis a jour
            $updatedata = mysqli_query($db_connect, "UPDATE classe SET enseignant1 ='$ens'  WHERE id_classe='$userid' ");
            if($updatedata){
                //en cas de succes afficher
                echo json_encode(["success"=>"Classe modifiée avec succès"]);
                return;
            }else echo json_encode(['success'=>'Verifiez les informations SVP']);  //cas d'une erreur       
                
        
}