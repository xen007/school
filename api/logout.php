<?php
session_start();
session_destroy();
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo json_encode(['status' => 'success', 'message' => 'Logged out successfully']);
?>
