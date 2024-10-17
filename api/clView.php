
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
                $getuserrow=mysqli_query($db_connect, "SELECT * FROM matiere left join  enseignant on matiere.matricule_Ens = enseignant.matricule_Ens WHERE niveau='$userid' order by nom_matiere ");
                while($row = mysqli_fetch_array($getuserrow)){
                    //recupération du resulltat de la requete
                    $json_array["matdata"][] = array('id' =>$row['id_matiere'], 'idMat' =>$row['id_matiere'],'nom' =>$row['nom_matiere'],'niveau' =>$row['niveau'],'ens' =>$row['nomE'],);    
                }
                //affiche les informations récupérés
                echo json_encode($json_array['matdata']);
                return;

            }
}