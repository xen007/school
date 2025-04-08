<?php
$host = "localhost";
$db_name = "role_based_auth";
$username = "root"; // Use your MySQL username
$password = ""; // Use your MySQL password

try {
    $db_connect = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    $db_connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $exception) {
    echo "Connection error: " . $exception->getMessage();
    exit();
}
?>
