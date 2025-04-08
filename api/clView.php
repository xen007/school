
<?php
require('db.php');
    //parcour de la méthode d'envoi de l'url
//     switch($method){
//         case"GET"://methode de récupération de données    
//             // décompose l'url 
//             $pat = explode('/',$_SERVER['REQUEST_URI']);
//             //verifie si le chemin url est atteint et s'il n'est pas vide
//             if(isset($pat[4])  && ($pat[4] !== '')){
//                 $json_array = array();
//                 $userid =$pat[4];
//                 // echo "user id is...".$userid; die;
//                 //requete de recupération des données dans la table avec des jointures et une condition
//                 $getuserrow=mysqli_query($db_connect, "SELECT * FROM matiere left join  enseignant on matiere.matricule_Ens = enseignant.matricule_Ens WHERE niveau='$userid' order by nom_matiere ");
//                 while($row = mysqli_fetch_array($getuserrow)){
//                     //recupération du resulltat de la requete
//                     $json_array["matdata"][] = array('id' =>$row['id_matiere'], 'idMat' =>$row['id_matiere'],'nom' =>$row['nom_matiere'],'niveau' =>$row['niveau'],'ens' =>$row['nomE'],);    
//                 }
//                 //affiche les informations récupérés
//                 echo json_encode($json_array['matdata']);
//                 return;

//             }
// }


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
                $alluser = mysqli_query($db_connect,"SELECT * FROM eleve LEFT JOIN classe on eleve.classe = classe.id_classe  LEFT JOIN categorie_classe ON classe.categorie = categorie_classe.id_categorie WHERE classe= '$userid' order by nom asc ");
                //vérifie si les informations sont disponibles et les récupères
                if(mysqli_num_rows($alluser) > 0){
                    while($row = mysqli_fetch_array($alluser)){
                        $json_array["userdata"][] = array('id' =>$row['matricule_El'], 'matricule' =>$row['matricule_El'],'nom' =>$row['nom'],'genre' =>$row['genre'],'prenom' =>$row['prenom'],
                        'dateNaiss' =>$row['dateNaiss'],'classe' =>$row['libellee_classe'],'cl' =>$row['classe'],'tuteur' =>$row['tuteur'],'adresse' =>$row['adresse'],'lieuNaiss' =>$row['lieuNaiss'],
                        'phone' =>$row['numero_tuteur'],'infoSup' =>$row['infos_supplementaire'],'photo'=>$row['photo'], 'niveau' =>$row['niveau'],'scolaire' =>$row['annee_scolaire'],'stat' =>$row['statut'],
                        'ins'=> $row['frais_ins'],'sco'=> $row['frais_sco'],'ptuteur'=>$row['profession_tuteur'],'mere'=>$row['mere'],'phoneM'=>$row['numero_mere'],'pmere'=>$row['profession_mere'],'redoublant'=> $row['redoublant']
                     );
                        
                    }
                    //affiche les informations récupérés
                    echo json_encode($json_array["userdata"]);
                    return;
                }
            }
}

