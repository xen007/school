
<?php
require('db.php');
//parcour de la méthode d'envoi de l'url
switch($method){
    case"GET"://methode de récupération de données    
        // décompose l'url   
        $pat = explode('/',$_SERVER['REQUEST_URI']);
        //verifie si le chemin url est atteint et s'il n'est pas vide  
          
            if(isset($pat[4]) ){
                $userid =$pat[4];
                     //recupères toutes les informations de la table
                    $alluser = mysqli_query($db_connect,"SELECT * FROM ecole WHERE id_ecole = $userid");
                    if(mysqli_num_rows($alluser) > 0){
                        //vérifie si les informations sont disponibles et les récupères
                        while($row = mysqli_fetch_array($alluser)){
                            $json_array["ecdata"] = array('id' =>$row['id_ecole'],'nomec'=>$row['nom_ecole'],'devise' =>$row['devise'], 'logo' =>$row['logo']); 
                        }
                        //affiche les informations récupérés
                        echo json_encode($json_array['ecdata']);
                        return;
                    } else{
                        // au cas contraire renvoyer l'erreur
                        echo json_encode(["resultat"=>"Verifiez les informations SVP"]);
                        return;
                    }
            }

            case'POST':
                // Database connection

                
                if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                    // Parse form data
                    $userid = $_POST['id'];
                    $devise = $_POST['devise'];
                    $nomec = $_POST['nomec'];
                    
                  
                    // Check if a logo file is uploaded
                    if (isset($_FILES['logo']) && $_FILES['logo']['error'] === UPLOAD_ERR_OK) {
                        $logo = $_FILES['logo']['name'];
                        $logo_temp = $_FILES['logo']['tmp_name'];
                        $dest = $_SERVER['DOCUMENT_ROOT'].'/ssm/api/logo/'.$logo;
                
                        // Move uploaded file to the destination
                        if (move_uploaded_file($logo_temp, $dest)) {
                            // Update query with the logo
                            $updatedata = mysqli_query($db_connect, "UPDATE ecole SET nom_ecole = '$nomec', devise = '$devise', logo = '$logo' WHERE id_ecole='$userid'");
                        } else {
                            echo json_encode(['success' => 'Échec du téléchargement du logo. Veuillez réessayer.']);
                            return;
                        }
                    } else {
                        // Update query without the logo
                        $updatedata = mysqli_query($db_connect, "UPDATE ecole SET nom_ecole = '$nomec', devise = '$devise' WHERE id_ecole='$userid'");
                    }
               
                if ($updatedata) {
                    echo json_encode(["success" => "Données mises à jour avec succès"]);
                } else {
                    echo json_encode(['success' => 'Échec de la mise à jour. Veuillez vérifier les informations.']);
                }
                }
               


    
}
?>
