
<?php

require 'db.php'; //requiert le fichier de configuration de la bd
//innitialisation des variables a utiliser
$tuteur =$matricule =$nom =$prénom =$datenaiss =$lieunaiss =$genre = $niveau =$classe =$adresse =$scolaire =$photo =$message ="";

$tuteurErr =$numéroErr =$matriculeErr =$nomErr =$prénomErr =$datenaissErr =$lieunaissErr =$genreErr = $niveauErr =$classeErr =$adresseErr =$scolaireErr =$photoErr =$messageErr ="";

if(!empty($_GET['id'])){
    $id = checkInput($_GET['id']); //recuperation del'identifiant de l'eleve
}

if(!empty($_POST)){ //si y'a un formulaire soumis

   if(empty($_POST['update'])){ //si le formulaire est nommé update
    //affectation des différentes valeurs récupérés qux variables

    $matricule = checkInput($_POST['matricule']);
    $nom = checkInput($_POST['nom']);
    $prénom = checkInput($_POST['prénom']);
    $datenaiss = checkInput($_POST['datenaiss']);
    $lieunaiss = checkInput($_POST['lieunaiss']);
    $adresse = checkInput($_POST['adresse']);
    $genre = checkInput($_POST['genre']);
    $tuteur = checkInput($_POST['tuteur']);
    $phone = checkInput($_POST['phone']);
    $niveau = checkInput($_POST['niveau']);
    $classe = checkInput($_POST['classe']);
    $scolaire = checkInput($_POST['scolaire']);
    
    $photo          = strtolower(checkInput($_FILES['photo']['name']));
    $photoPath      = 'images/' .basename($photo);
    $photoExtension = pathinfo($photoPath, PATHINFO_EXTENSION);
    $message = checkInput($_POST['message']);



        $isSuccess      = true;
        $isUpload       = false;

        
        if(empty($matricule)){        //function vide: eske le la var si est vide
            $matriculeErr = "essayez un matricule...";
            $isSuccess = false;
        }
        if(empty($nom)){        //function vide: eske le la var si est vide
            $nomErr = "essayez un nom...";
            $isSuccess = false;
        }
        if(empty($prénom)){        //function vide: eske le la var si est vide
            $prénomErr = "essayez un prenom...";
            $isSuccess = false;
        }
        if(empty($datenaiss)){        //function vide: eske le la var si est vide
            $datenaissErr = "essayez une date...";
            $isSuccess = false;
        }
        if(empty($lieunaiss)){        //function vide: eske le la var si est vide
            $lieunaissErr = "essayez le lieu aussi...";
            $isSuccess = false;
        }
        if(empty($genre)){        //function vide: eske le la var si est vide
            $genreErr = "entrez le genre..";
            $isSuccess = false;
        }
        if(empty($niveau)){        //function vide: eske le la var si est vide
            $niveauErr = "essayez un niveau...";
            $isSuccess = false;
        }elseif($niveau === 'Sélectionnez le niveau'){
            $niveauErr = "tapez le niveau de l'élève...";
            $isSuccess = false;
        }
        if(empty($classe)){        //function vide: eske le la var si est vide
            $classeErr = "essayz une classe...";
            $isSuccess = false;
        }elseif($classe === 'Sélectionnez une classe'){
            $classeErr = "tapez le niveau de l'élève...";
            $isSuccess = false;
        }
        
        if(empty($adresse)){        //function vide: eske le la var si est vide
            $adresseErr = "essayz une adresse...";
            $isSuccess = false;
        }
        if(empty($scolaire)){        //function vide: eske le la var si est vide
            $scolaireErr = "essayz une annee scolaire...";
            $isSuccess = false;
        }
        if(empty($message)){        //function vide: eske le la var si est vide
            $messageErr = "mettez RAS si aucune information...";
            $isSuccess = false;
        }
    
      // if($isSuccess ){
        $id = checkInput($_POST['id']);
     
        $db= Database::connect();
             $req = $db->prepare("UPDATE élève SET matricule_El = ?, nom= ?, prénom = ?, dateNaiss = ? , lieuNaiss = ?, 
             adresse =?, genre = ?, tuteur = ?, numéro_tuteur = ?, niveau = ?, classe = ?,  année_scolaire= ?, infos_supplémentaire = ? WHERE matricule_El = ? ");
             $req->execute(array($matricule ,$nom ,$prénom ,$datenaiss ,$lieunaiss ,$adresse,$genre, $tuteur, $phone ,$niveau ,$classe ,$scolaire  ,$message,$id));
             
      //  }
        Database::disconnect();
        header('Location: liste.php');
   }     

}
else{  //si non affcher recuperer les informations suivantes pour affichage

    $db= Database::connect();
    $req = $db->prepare('SELECT * FROM élève WHERE matricule_El = ?');
    $req->execute(array($id));
    $stu = $req->fetch();
    $matricule = $stu['matricule_El'];
    $nom = $stu['nom'];
    $prénom = $stu['prénom'];
    $datenaiss = $stu['dateNaiss'];
    $lieunaiss = $stu['lieuNaiss'];
    $adresse = $stu['adresse'];
    $genre = $stu['genre'];
    $tuteur = $stu['tuteur'];
    $phone = $stu['numéro_tuteur'];
    $niveau = $stu['niveau'];
    $classe = $stu['classe'];
    
    $scolaire = $stu['année_scolaire'];
    $message = $stu['infos_supplémentaire'];


}
function checkInput($data){
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
?>

<!DOCTYPE html>
<html>
    <head>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Modification d'eleves</title>

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

        <link rel="stylesheet" href="style.css">
        <script src="script.js"></script>
 
    </head>

    <body>
        
        <div container>
            <div class="" style="background-color: aquamarine;">
                <form method="post" action="update.php" class="form" enctype="multipart/form-data" id="">
                    <div class="row">

                    <input type="hidden"name="id" value ="<?php echo $id;  ?>">
                        <div class=" col-md-6 row align-items-center" style="background-color: aqua;">
                            <div class="col-md-3">
                                <label for="matricule" class="form-label">Matricule</label><span class="blue">*</span>
                            </div>
                            <div class="col-md-8 ">
                                <input type="text" id="matricule" value="<?php  echo $matricule; ?>" name="matricule" placeholder="renseignez votre matricule" class="form-control" aria-labelledby="marti">
                                <div class="col-auto">
                                <span class="help-inline"><?php echo $matriculeErr;?></span>
                                </div>  
                            </div>
                        </div>

                        <div class=" col-md-6 row align-items-center" style="background-color: aqua;">
                            <div class="col-md-3">
                                <label for="nom" class="form-label">Nom</label><span class="blue">*</span>
                            </div>
                            <div class="col-md-8 ">
                                <input type="text" id="nom" name="nom" placeholder="renseignez votre nom" value="<?php  echo $nom; ?>" class="form-control" aria-labelledby="">
                                <div class="col-auto">
                                <span class="help-inline"><?php echo $nomErr;?></span>
                                </div> 
                            </div>
                        </div>

                        <div class=" col-md-6 row align-items-center" style="background-color: aqua;">
                            <div class="col-md-3">
                                <label for="prénom" class="col-form-label">Prénom</label><span class="blue">*</span>
                            </div>
                            <div class="col-md-8 ">
                                <input type="text" id="prénom" name="prénom" placeholder="renseignez votre prénom" value="<?php  echo $prénom; ?>" class="form-control" aria-labelledby="">
                                <div class="col-auto">
                                <span class="help-inline"><?php echo $prénomErr;?></span>
                                </div>  
                            </div>
                        </div>

                        <div class=" col-md-6 row align-items-center" style="background-color: aqua;">
                            <div class="col-md-3">
                                <label for="datenaiss" class="col-form-label">Date de naissance</label><span class="blue">*</span>
                            </div>
                            <div class="col-md-8 ">
                                <input type="date"  id="datenaiss" name="datenaiss" value="<?php  echo $datenaiss; ?>" class="form-control" aria-labelledby="">
                                <div class="col-auto">
                                <span class="help-inline"><?php echo $datenaissErr;?></span>
                                </div> 
                            </div>
                        </div>

                        <div class=" col-md-6 row align-items-center" style="background-color: aqua;">
                            <div class="col-md-3">
                                <label for="lieunaiss" class="col-form-label">Lieu de naissance</label><span class="blue">*</span>
                            </div>
                            <div class="col-md-8 ">
                                <input type="text" id="lieunaiss" name="lieunaiss" value="<?php  echo $lieunaiss; ?>" class="form-control" aria-labelledby="">
                                <div class="col-auto">
                                <span class="help-inline"><?php echo $lieunaissErr;?></span>
                                </div>   
                            </div>
                        </div>

                        <div class=" col-md-6 row align-items-center" style="background-color: aqua;">
                            <div class="col-md-3">
                                <label for="adresse" class="col-form-label">Adresse</label><span class="blue">*</span>
                            </div>
                            <div class="col-md-8 ">
                                <input type="text" id="adresse" name="adresse" placeholder="renseignez l'adressede votre domicile" value="<?php  echo $adresse; ?>" class="form-control" aria-labelledby="">
                                <div class="col-auto">
                                <span class="help-inline"><?php echo $adresseErr;?></span>
                                </div>    
                            </div>
                        </div>

                        <div class=" col-md-6 row align-items-center" style="background-color: aqua;">
                            <div class="col-md-3">
                                <label for="genre" class="col-form-label">genre</label><span class="blue">*</span>
                            </div>
                            <div class="col-md-8 ">
                                <select id="genre" name="genre" class="form-select" aria-label="Default select example">
                                    
                                    <option value="M">M</option>
                                    <option value="F">F</option>
                                </select>
                            </div>
                        </div>

                        <div class=" col-md-6 row align-items-center" style="background-color: aqua;">
                            <div class="col-md-3">
                                <label for="tuteur" class="col-form-label">Tuteur</label><span class="blue">*</span>
                            </div>
                            <div class="col-md-8 ">
                                <input type="text" id="tuteur" name="tuteur" class="form-control" aria-labelledby="" value="<?php  echo $tuteur; ?>">
                                <div class="col-auto">
                                <span class="help-inline"><?php echo $tuteurErr;?></span>
                                </div>    
                            </div>
                        </div>

                        <div class=" col-md-6 row align-items-center" style="background-color: aqua;">
                            <div class="col-md-3">
                                <label for="phone" class="col-form-label">Numéro_Tuteur</label><span class="blue">*</span>
                            </div>
                            <div class="col-md-8 ">
                            <input type="tel" id="phone" name="phone" pattern="[6]{1}[0-9]{2}-[0-9]{3}-[0-9]{3}" value="<?php  echo $phone; ?>" >
                            <small>Format: 693-453-678</small><br><br>
                                <div class="col-auto">
                                <span class="help-inline"><?php echo $numéroErr;?></span>
                                </div>    
                            </div>
                        </div>

                        <div class=" col-md-6 row align-items-center" style="background-color: aqua;">
                            <div class="col-md-3">
                                <label for="genre" class="form-label">Niveau de classe</label><span class="blue">*</span>
                            </div>
                            <div class="col-md-8 ">
                                <select id="niveau" name="niveau" class="form-select" aria-label="Default select example">
                                <?php
                                    $db= Database::connect();
                                    foreach($db->query('SELECT * FROM niveau') as $stud){
                                        if($stud['id_niveau'] == $niveau) //recuperer et afficher le niveau corespondant
                                            echo '<option selected value="' .$stud['id_niveau']. '" >' .$stud['libellé_niveau']. '</option>';
                                        else 
                                        echo '<option value="'.$stud['id_niveau'].'" >'.$stud['libellé_niveau'].'</option>'; 
                                    }
                                    database::disconnect();
                                
                                ?>
                                </select>
                                <div class="col-auto">
                                <span class="help-inline"><?php echo $niveauErr;?></span>
                                </div>   
                            </div>
                        </div>

                        <div class=" col-md-6 row align-items-center" style="background-color: aqua;">
                            <div class="col-md-3">
                                <label for="classe" class="form-label">Classe</label><span class="blue">*</span>
                            </div>
                            <div class="col-md-8 ">
                                <select id="classe" name="classe" class="form-select" aria-label="Default select example">
                                
                                <?php
                                    $db= Database::connect();
                                    foreach($db->query('SELECT * FROM classe') as $stud){
                                        if($stud['id_classe'] == $classe) //recuperer et afficher la classe corespondante
                                            echo '<option selected value="' .$stud['id_classe']. '" >' .$stud['libellé_classe']. '</option>';
                                        else 
                                        echo '<option value="' .$stud['id_classe']. '" >' .$stud['libellé_classe']. '</option>'; 
                                    }
                                    database::disconnect();
                                
                                ?>
                                </select> 
                                <div class="col-auto">
                                <span class="help-inline"><?php echo $classeErr;?></span>
                                </div>  
                            </div>  
                        </div>

                        <div class=" col-md-6 row align-items-center" style="background-color: aqua;">
                            <div class="col-md-3">
                                <label for="scolaire" class="form-label">Année scolaire</label><span class="blue">*</span>
                            </div>
                            <div class="col-md-8 ">
                                <select id="scolaire" name="scolaire" class="form-select" aria-label="Default select example">
                                <?php
                                    $db= Database::connect();
                                    foreach($db->query('SELECT * FROM année_scolaire') as $stud){
                                        if($stud['id_année'] == $classe)
                                            echo '<option selected value="' .$stud['id_année']. '" >' .$stud['libellé_année']. '</option>';
                                        else 
                                        echo '<option value="' .$stud['id_année']. '" >' .$stud['libellé_année']. '</option>'; 
                                    }
                                    database::disconnect();
                                
                                ?>

                                </select> 
                                <div class="col-auto">
                                    
                                </div>  
                            </div>
                        </div>

                        <div class=" col-md-6 row align-items-center" style="background-color: aqua;">
                            <div class="col-md-3">
                            <label for="">Photo: </label> <?php echo $photo; ?>
                                <label for="photo" class="col-form-label">Photo</label><span class="blue">*</span>
                            </div>
                            <div class="col-md-8 ">
                                <input type="file" id="photo" name="photo" placeholder="" class="form-control" aria-labelledby="">
                                <div class="col-auto">
                                   
                                    <span class="help-inline"><?php echo $photoErr;?></span>
                                </div> 
                            </div>
                        </div>

                        <div class=" col-md-6 row align-items-center" style="background-color: aqua;">
                            <div class="col-md-3">
                                <label for="message" class="col-form-label">Informations complémentaires</label>
                            </div>
                            <div class="col-md-8 ">
                                <textarea id="message" name="message" class="form-control" value="<?php  echo $message; ?>" placeholder="Votre Message" rows="4"><?php  echo $message; ?></textarea>
                                <div class="col-auto">
                                <span class="help-inline"><?php echo $messageErr;?></span>
                                </div> 
                            </div>
                        </div>



                    </div>
                    <button type="submit" name="update" class="btn btn-success">Modifier</button>
                    <a href="stview.php" class="btn btn-primary"><span class="bi-arrow-left"></span> Retour</a>
                </form>

            </div>

        </div>
        


    </body>



</html>
