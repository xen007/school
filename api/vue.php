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
                $getuserrow=mysqli_query($db_connect, "SELECT e.*, c.libellee_classe FROM eleve AS e INNER JOIN classe AS c on e.classe = c.id_classe   WHERE matricule_El='$userid' ");
                while($userrow = mysqli_fetch_array($getuserrow)){
                    $json_array['rowUserdata'] = array('id' =>$userrow['matricule_El'], 'matricule' =>$userrow['matricule_El'],'nom' =>$userrow['nom'],'genre' =>$userrow['genre'],'prénom' =>$userrow['prenom'],
                    'dateNaiss' =>$userrow['dateNaiss'],'idclasse' =>$userrow['classe'],'classe' =>$userrow['libellee_classe'],'tuteur' =>$userrow['tuteur'],'adresse' =>$userrow['adresse'],'lieuNaiss' =>$userrow['lieuNaiss'],'photo' =>$userrow['photo'],
                    'phone' =>$userrow['numero_tuteur'],'infoSup' =>$userrow['infos_supplementaire'],'niveau' =>$userrow['niveau'],'scolaire' =>$userrow['annee_scolaire']
                
                 );
                }//affiche les informations récupérés
                echo json_encode($json_array['rowUserdata']);
                return;
            }

        }