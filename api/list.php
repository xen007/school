
<?php
require('db.php');
    $method=$_SERVER['REQUEST_METHOD'];
    //echo "test-----".$method; die;

    switch($method){
        case"GET":
            
            $pat = explode('/',$_SERVER['REQUEST_URI']);
            if(isset($pat[3])  && is_numeric($pat[3])){
                $json_array = array();
                $userid =$pat[3];
                // echo "user id is...".$userid; die;

                $getuserrow=mysqli_query($db_connect, "SELECT * FROM élève WHERE matricule_El='$userid'");
                while($userrow = mysqli_fetch_array($getuserrow)){
                    $json_array['rowUserdata'] = array('id' =>$userrow['matricule_El'], 'matricule' =>$userrow['matricule_El'],'nom' =>$userrow['nom'],'genre' =>$row['genre'],'numero_tuteur' =>$userrow['numéro_tuteur'],'dateNaiss' =>$userrow['dateNaiss'],'classe' =>$userrow['classe'] );
                }
                echo json_encode($json_array['rowUserdata']);
                return;

            }else{
                $alluser = mysqli_query($db_connect,"SELECT * FROM élève");

                if(mysqli_num_rows($alluser) > 0){
                    while($row = mysqli_fetch_array($alluser)){
                        $json_array["userdata"][] = array('id' =>$row['matricule_El'], 'matricule' =>$row['matricule_El'],'nom' =>$row['nom'],'genre' =>$row['genre'],'numéro_tuteur' =>$row['numéro_tuteur'],'dateNaiss' =>$row['dateNaiss'],'classe' =>$row['classe']); 
                    }
                    echo json_encode($json_array["userdata"]);
                    return;
                } else{
                    echo json_encode(["resultat"=>"Please check data"]);
                    return;
                }
            }

        case"POST":
            $userpostdata = json_decode(file_get_contents("php://input"));
            // echo 'success take';
            // print_r($userpostdata);

            $username = $userpostdata->username;
            $useremail = $userpostdata->useremail;
            $status = $userpostdata->status; 

            $result = mysqli_query($db_connect, "INSERT INTO tabuser(username,useremail,status) VALUES ('$username', '$useremail','$status') ");

            if($result){
                echo json_encode(["success"=>"user added successfully"]);
                return;
            }else echo json_encode(['success'=>'Please Check to user Data']); return;

            case"PUT":
                $userupdata = json_decode(file_get_contents("php://input"));
                // echo 'success take';
                // print_r($userupdata);
                $userid = $userupdata->id;
                $username = $userupdata->username;
                $useremail = $userupdata->useremail;
                $status = $userupdata->status; 
    
                $updatedata = mysqli_query($db_connect, "UPDATE tabuser SET username = '$username', useremail = '$useremail', status = '$status' WHERE userid='$userid' ");
    
                if($updatedata){
                    echo json_encode(["success"=>"user updated successfully"]);
                    return;
                }else echo json_encode(['success'=>'Please Check to user Data']); return;
    
                case"DELETE":
        
                    $pat = explode('/',$_SERVER['REQUEST_URI']);
                    //echo "userid is.....".$pat[3]; 
        
                    $deldata = mysqli_query($db_connect, "DELETE FROM tabuser WHERE userid='$pat[3]' ");
        
                    if($deldata){
                        echo json_encode(["success"=>"user deleted  successfully"]);
                        return;
                    }else echo json_encode(['success'=>'Please Check to user Data']); return;
        


    }

