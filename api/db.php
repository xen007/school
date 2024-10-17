<?php
// initiateur et entête pour permette l'acces distant sur le serveur php et donc ses fichiers
error_reporting(E_ALL);
ini_set('display_errors',1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

//connexion à la base de données
$db_connect = mysqli_connect("localhost" ,"root","", "used");
if($db_connect === false){
    die("Error: could not connect".mysqli_connect_error());
}
//recupération de la méthode de transfert et reception de données
$method=$_SERVER['REQUEST_METHOD'];
//echo "test-----".$method; die;

    