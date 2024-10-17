<?php
require('db.php');
    //parcour de la méthode d'envoi de l'url
    switch($method){
        case 'GET'://methode de récupération de données    
            // décompose l'url
            $pat = explode('/',$_SERVER['REQUEST_URI']);
            //verifie si le chemin url est atteint et s'il n'est pas vide
            if(isset($pat[4])  && ($pat[4] !== '')){
                $json_array = array();
                $idsco =urldecode($pat[4]); //initialise l'index " de l'url à la clé
                // echo "user id is...".$matid; die;
                //requete de recupération des données dans la table avec des jointures et une condition
                $vers = 0;
                $selAll = mysqli_query($db_connect,"SELECT * FROM scolarite INNER JOIN eleve on scolarite.matricule_El = eleve.matricule_El 
                LEFT JOIN classe ON eleve.classe = classe.id_classe INNER JOIN categorie_classe ON classe.categorie = categorie_classe.id_categorie  WHERE scolarite.matricule_El='$idsco'");
                  while($row = mysqli_fetch_array($selAll)){
                    //recupération du resulltat de la requete
                    $vers+=$row['montant'];
                    $reste = $row['frais_sco'] - $vers;
                    $json_array["insdata"][] = array("id"=>$row['id_scolarite'],"idsco"=>$row['id_scolarite'],"matricule"=>$row['matricule_El'],"nom"=>$row['nom'],"prenom"=>$row['prenom'],"classe"=>$row['libellee_classe'],
                    'sco'=>$row['frais_sco'],'tr1' =>$row['tranche1'],'tr2' =>$row['tranche2'],'tr3' =>$row['tranche3'],
                   'montant'=>$row['montant'],'vers'=>$vers,'reste'=>$reste, 'motif'=>'versement scolarite','date'=>$row['datePaye']
                    );
                  }
                //affiche les informations récupérés
                echo json_encode($json_array['insdata']);
                return;

            }else{
                // requete de selection
                // $selAll = mysqli_query($db_connect,"SELECT * FROM  scolarite INNER JOIN eleve on scolarite.matricule_El = eleve.matricule_El LEFT JOIN classe ON eleve.classe = classe.id_classe ");
                // $selAll = mysqli_query($db_connect,"SELECT * FROM  scolarite INNER JOIN eleve on scolarite.matricule_El = eleve.matricule_El LEFT JOIN classe ON eleve.classe = classe.id_classe ");
                $selAll = mysqli_query($db_connect,"SELECT id_scolarite,scolarite.matricule_El,tranche1,tranche2,tranche3,frais_sco, SUM(montant) AS montant_verser,nom,prenom,libellee_classe  FROM scolarite INNER JOIN eleve on scolarite.matricule_El = eleve.matricule_El 
                LEFT JOIN classe ON eleve.classe = classe.id_classe INNER JOIN categorie_classe ON classe.categorie = categorie_classe.id_categorie GROUP BY scolarite.matricule_El");
                
                if(mysqli_num_rows($selAll) > 0){
                   
                    while($row= mysqli_fetch_assoc($selAll)){
                        $tranche = '';
                       
                        $resteT =0;
                        $reste = 0;
                        $reste = $row['frais_sco']-$row['montant_verser'];
                        if($row['montant_verser'] >= $row['tranche1']){
                            $resteT = $row['montant_verser'] - $row['tranche1'];
                            $tranche = '2';
                            if($resteT >= $row['tranche2']){
                                $resteT = $resteT - $row['tranche2']; 
                                $tranche = '3';
                            }if($resteT == $row['tranche3'] ){
                                $resteT = $row['tranche3'] - $resteT;
                            }  
                        }else{
                            $resteT = $row['tranche1'] - $row['montant_verser'];
                            $tranche = '1';
                        } 
                        $json_array["insdata"][] = array("id"=>$row['id_scolarite'],"idsco"=>$row['id_scolarite'],"matricule"=>$row['matricule_El'],"nom"=>$row['nom'],"prenom"=>$row['prenom'],"classe"=>$row['libellee_classe'],
                        'sco'=>$row['frais_sco'],'verser'=>$row['montant_verser'],'tr1' =>$row['tranche1'],'tr2' =>$row['tranche2'],'tr3' =>$row['tranche3'],
                        'reste'=>$reste,'tranche'=>$tranche,'resteT'=>$resteT,
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
            
            $sco = $userpostdata->sco;
            $req= mysqli_query($db_connect,"INSERT INTO scolarite (matricule_El,montant,datePaye) VALUES ('$iduser','$montant',NOW() )");
            
            if($req){
                echo json_encode(["success"=>"incription effectuée"]);
                return;
            }else echo json_encode(['success'=>'Verifiez les informations SVP']); return;
       

    }