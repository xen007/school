<?php  
require('db.php');

    //parcour de la méthode d'envoi de l'url
    switch($method){
        case "GET"://methode de récupération de données
            // décompose l'url
            $pat = explode('/',$_SERVER['REQUEST_URI']);
            
            $userupdata = json_decode(file_get_contents("php://input"));
            //données envoyées
                $alluser = mysqli_query($db_connect,"SELECT * FROM matiere,note where classe = 2 ");

                
                               while($userrow = mysqli_fetch_array($getuserrow) ){
                                    //recupération du resulltat de la requete
                        
                             
                                    $json_array['rowUserdata'][]= array( 'idmat' =>$userrow['id_ùatiere'], 'ap'=> $userrow['val'],'coeff'=> $userrow['coef'],'moy'=> $moy,'note1' => $userrow['note1'],'nom' =>$userrow['nom'],'genre' =>$userrow['genre'],'prénom' =>$userrow['prenom'],
                                   

                                 );
                                }
                         
                    //affiche les informations récupérés
                    echo json_encode($json_array["rowUserdata"]);
                 
}