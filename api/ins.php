<?php
require('db.php');
    //parcour de la méthode d'envoi de l'url
    switch($method){
        case 'GET'://methode de récupération de données    
            // décompose l'url
            $pat = explode('/',$_SERVER['REQUEST_URI']);
            //verifie si le chemin url est atteint et s'il n'est pas vide
            if(isset($pat[4]) && ($pat[4]!=='')){
            }else{
                // requete de selection
                $selAll = mysqli_query($db_connect,"SELECT * FROM  inscription INNER JOIN eleve on inscription.matricule_El = eleve.matricule_El LEFT JOIN classe ON eleve.classe = classe.id_classe INNER JOIN categorie_classe ON classe.categorie = categorie_classe.id_categorie  ");
                if(mysqli_num_rows($selAll) > 0){
                   
                    while($row= mysqli_fetch_assoc($selAll)){
                        $mnt = ($row['montant1']);
                        $reste = $row['frais_total'] - $mnt ;
                         $motif = 'versement scolarite';

                        $json_array["insdata"][] = array("id"=>$row['id_ins'],"idIns"=>$row['id_ins'],"matricule"=>$row['matricule_El'],"nom"=>$row['nom'],"prenom"=>$row['prenom'],"montant"=>$mnt,"classe"=>$row['libellee_classe'],"reste"=>$reste,
                        'ins'=> $row['frais_total'],'sco'=> $row['frais_sco'], 'motif'=>'versement inscription',
                    );
                    }
                    echo json_encode($json_array["insdata"]);
                }else{
                    echo json_encode(['resultat'=>'Verifiez les informations SVP']);
                }
            }break;


        case 'POST':
            $userpostdata = json_decode(file_get_contents("php://input"));
            $iduser = $userpostdata->mat;
            $montant = $userpostdata->montant;
            $ins = $userpostdata->ins;
            $req= mysqli_query($db_connect,"INSERT INTO inscription (matricule_El,montant1,frais_total) VALUES ('$iduser','$montant','$ins' )");
            if($req){
                echo json_encode(["success"=>"incription effectuée"]);
                return;
            }else echo json_encode(['success'=>'Verifiez les informations SVP']); return;
       

    }