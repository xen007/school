<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$conn = new mysqli("localhost","root","","sign");

if(mysqli_connect_error()){
    echo mysqli_connect_error();
    exit();
}
else{
    $eData = file_get_contents("php://input");
    $dData = json_decode($eData, true); 

    $name = $dData['name'];
        $email = $dData['email'];
        $mobile = $dData['mobile'];
     
    $sql = "INSERT INTO reactusers(name,mobile,email) VALUES('$name','$mobile','$email');";
    $res = mysqli_query($conn, $sql);
     
    if($res){
        echo "Success!";
    }
    else{
        echo "Error!";
    }
    $conn->close();
    return json_encode($response);
}