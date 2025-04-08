<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$username = $data['username'];
$matricule = $data['matricule'];
$password = $data['password'];
$confirmPassword = $data['confirmPassword'];
$role = $data['role'];

$response = array();

if (empty($username) || empty($matricule) || empty($password) || empty($confirmPassword) || empty($role)) {
    $response['status'] = 'error';
    $response['message'] = 'All fields are required.';
    echo json_encode($response);
    exit();
}

if ($password !== $confirmPassword) {
    $response['status'] = 'error';
    $response['message'] = 'Passwords do not match.';
    echo json_encode($response);
    exit();
}

// Check if username already exists
$sql = "SELECT id FROM users WHERE username = ?";
$stmt = $db_connect->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $response['status'] = 'error';
    $response['message'] = "Nom d'utilisateur existe déjà.";
    echo json_encode($response);
    $stmt->close();
    $db_connect->close();
    exit();
}

$stmt->close();

// Hash the password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Insert new user into the database
$sql = "INSERT INTO users (username, id_matricule, password, role) VALUES (?, ?, ?, ?)";
$stmt = $db_connect->prepare($sql);
$stmt->bind_param("ssss", $username, $matricule, $hashedPassword, $role);

if ($stmt->execute()) {
    $response['status'] = 'success';
    $response['message'] = 'Registration successful';
} else {
    $response['status'] = 'error';
    $response['message'] = 'Registration failed. Please try again.';
}

$stmt->close();
$db_connect->close();

echo json_encode($response);
?>
