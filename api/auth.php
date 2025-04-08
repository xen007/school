<?php
include 'db.php';
session_start();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if ($data) {
        $identifier = $data['username']; // This can be username or matricule
        $password = $data['password'];

        // Check if user exists
        $checkUserQuery = "SELECT * FROM users WHERE username = ? OR id_matricule = ?";
        $checkUserStmt = $db_connect->prepare($checkUserQuery);
        $checkUserStmt->bind_param("ss", $identifier, $identifier);
        $checkUserStmt->execute();
        $result = $checkUserStmt->get_result();

        if ($result->num_rows > 0) {
            // Verify user credentials
            $user = $result->fetch_assoc();

            // Check if the password is hashed or unhashed
            if (password_verify($password, $user['password'])) {
                // Password is hashed and matches
                $_SESSION['user'] = [
                    'id' => $user['id'],
                    'username' => $user['username'],
                    'matricule' => $user['id_matricule'],
                    'role' => $user['role']
                ];
                echo json_encode(['status' => 'success', 'user' => $_SESSION['user']]);
            } else if ($password === $user['password']) {
                // Password is unhashed and matches
                // Hash the password and update the database for future logins
                $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
                $updatePasswordQuery = "UPDATE users SET password = ? WHERE id = ?";
                $updatePasswordStmt = $db_connect->prepare($updatePasswordQuery);
                $updatePasswordStmt->bind_param("si", $hashedPassword, $user['id']);
                $updatePasswordStmt->execute();

                // Update session and respond with success
                $_SESSION['user'] = [
                    'id' => $user['id'],
                    'username' => $user['username'],
                    'matricule' => $user['id_matricule'],
                    'role' => $user['role']
                ];
                echo json_encode(['status' => 'success', 'user' => $_SESSION['user']]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Wrong username or password']);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'User not found']);
        }

        $checkUserStmt->close(); // Close the statement
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No data received']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}

$db_connect->close();
?>
