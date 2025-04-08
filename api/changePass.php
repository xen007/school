<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$db_connect = mysqli_connect("localhost", "root", "", "monou");
if ($db_connect === false) {
    die("Error: could not connect " . mysqli_connect_error());
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $previousPassword = $data['previousPassword'];
    $newPassword = $data['newPassword'];
    $username = $data['username'];
    $matricule = $data['matricule'];

    $sql = "SELECT password FROM users WHERE username = ? OR id_matricule = ?";
    $stmt = mysqli_prepare($db_connect, $sql);
    mysqli_stmt_bind_param($stmt, "ss", $username, $matricule);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $user = mysqli_fetch_assoc($result);

    if (password_verify($previousPassword, $user['password'])) {
        $newPasswordHash = password_hash($newPassword, PASSWORD_DEFAULT);
        $update_sql = "UPDATE users SET password = ? WHERE id_matricule = ?";
        $update_stmt = mysqli_prepare($db_connect, $update_sql);
        mysqli_stmt_bind_param($update_stmt, "ss", $newPasswordHash, $matricule);

        if (mysqli_stmt_execute($update_stmt)) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to change password.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Previous password is incorrect.']);
    }

    mysqli_stmt_close($stmt);
    mysqli_stmt_close($update_stmt);
}

mysqli_close($db_connect);
?>
