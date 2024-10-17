<?php
    error_reporting(E_ALL);
    ini_set('display_errors',1);
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");



    $db_connect = mysqli_connect("localhost" ,"root","", "sign");
    if($db_connect === false){
        die("Error: could not connect".mysqli_connect_error());

    }

    $method=$_SERVER['REQUEST_METHOD'];
    //echo "test-----".$method; die;

    switch($method){
        case"GET":
            
            // echo 'get api'; die;
            $path= explode('/', $_SERVER['REQUEST_URI']);

            if(isset($path[3] )&& is_numeric($path[3])){
                echo 'get Api single row '; die;
            }else{
                // echo 'return all data';

                $dest = $_SERVER['DOCUMENT_ROOT']."test"."/";
                $allproduct = mysqli_query($db_connect,"SElECT * FROM tabproduct");

                if(mysqli_num_rows($allproduct) >0){
                    
                    while($row = mysqli_fetch_array($allproduct)){
                        $json_array["productdata"][] = array(
                            "id"=>$row["idpro"],
                            "title"=>$row["title"],
                            "price"=>$row["price"],
                            "picture"=>$row["picture"]
                        );
                    }
                    echo json_encode($json_array["productdata"]);
                    return;
                }else{
                    echo json_encode(["result"=>"please check for good data"]);
                    return;
                }
            
            }
        case"POST":

            if(isset($_FILES['picture'])){
                $ptitle=$_POST['ptitle'];
                $price = $_POST['price'];
                $picture = $_FILES['picture']['name'];
                $picture_temp= $_FILES['picture']['tmp_name'];
                $dest=$_SERVER['DOCUMENT_ROOT'].'/test/image'."/".$picture;

                $result = mysqli_query($db_connect, "INSERT INTO tabproduct(title,price,picture) VALUES ('$ptitle', '$price', '$picture')" );

                if($result){
                    move_uploaded_file($picture_temp,$dest);
                    echo json_encode(["success"=>"Product inserted correctly"]);
                    return;
                }else{
                    echo json_encode(["succes"=>"Product failed to insert"]);
                }
            }
            else{
                echo json_encode(["success", "Data not in correct format"]);
            }

            
        case"PUT":
         
        case"DELETE":
        
             


    }

