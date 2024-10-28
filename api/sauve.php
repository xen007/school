<?php
error_reporting(E_ALL);
ini_set('display_errors',1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$databases = ['pschool'];
$user = "root";
$pass = "";
$host = "localhost";
date_default_timezone_set('Africa/Douala');
if(!file_exists("C:/xampp/htdocs/ssm/databases")){
    mkdir("C:/xampp/htdocs/ssm/databases");
}
foreach($databases as $database){
    if(!file_exists("C:/xampp/htdocs/ssm/databases/$database")){
        mkdir("C:/xampp/htdocs/ssm/databases/$database");
    }
    $filename = $database."_".date("F_d_Y")."@".date("g_ia").uniqid("_", false);
    $folder = "C:/xampp/htdocs/ssm/databases/$database/".$filename.".sql";
    exec("C:/xampp/mysql/bin/mysqldump --user={$user} --password={$pass} --host={$host} {$database} --result-file={$folder}",$output);

}
if($output){
    //afficher en cas de succes
    echo json_encode(["success"=>"reussi"]);
    return;
}else echo json_encode(['success'=>'Verifiez les informations SVP']); return;
