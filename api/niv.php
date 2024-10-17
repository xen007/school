
<?php
require('db.php');
    //parcour de la méthode d'envoi de l'url
    switch($method){
        case"PUT"://methode d'update
            $userupdata = json_decode(file_get_contents("php://input"));
            //données envoyées
            $userid = $userupdata->iduser;
            $stat = $userupdata->stat; 
            $msg = $userupdata->msg; 
            //requete de mis a jour
            $updatedata = mysqli_query($db_connect, "UPDATE eleve SET statut ='$stat', motif = '$msg'  WHERE matricule_El='$userid' ");
            if($updatedata){//en cas de succes afficher
                echo json_encode(["success"=>"Classe modifiée avec succès"]);
                return;
            }else echo json_encode(['success'=>'Verifiez les informations SVP']);
        }