<?php
    header("Access-Control-allow-Methods: GET, POST"); // means server can only access php file by GET and POST method. we can also determine which sever can access the php file or we can open access to every server with header( Access-Control-Allow-Origin * )
    header("Access-Control-Allow-Origin: *"); //this CORS header enable any domain to send HTTP requests to these endpoints
    header("Access-Control-Allow-Headers: Content-Type");
   

$conn = new mysqli("localhost", "root", "", "ecole");
if(mysqli_connect_error()){
    echo mysqli_connect_error();
    exit();
}

else{
    $eData = file_get_contents("php://input"); // file_get_contents("php://input")Takes raw data from the request 
    $dData = json_decode($eData, true); //Takes raw data from the request

    //Takes raw data from the request

    // takes only value of user in array $dData

    
    $sql = "SELECT * FROM enseignant";
    $res = mysqli_query($conn, $sql);
    $result = "data filled";
    
    else{
        $result = "";
    }
    
    $conn -> close();
    $response[] = array("Bon" => $result); //here the variable response will return the contain of the variable $result with name Bon. reason why in registration.js we are going return response[0].Bon
    echo json_encode($response);
};

?>