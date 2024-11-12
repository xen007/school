<?php
include 'db.php';
switch($method){
    case"GET"://methode de récupération de données  
        $alluser = mysqli_query($db_connect,"SELECT * FROM sequence ");
        if(mysqli_num_rows($alluser) > 0){
            while($row = mysqli_fetch_array($alluser)){
                $json_array["userdata"][] = array('id' =>$row['id'], 'libellee_seq' =>$row['libellee_sequence'],'trim' =>$row['trimestre'],
                );  
            }     
        } 
        echo json_encode($json_array["userdata"]);

}