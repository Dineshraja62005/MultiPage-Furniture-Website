<?php
session_start();
header('Content-Type: application/json');
require 'db_connect.php';

// Get JSON input
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Validate input
if (!isset($data['email']) || !isset($data['password'])) {
    echo json_encode([
        'success' => false, 
        'message' => 'Email and password are required'
    ]);
    exit;
}

$email = trim($data['email']);
$password = $data['password'];

// Validate inputs
if (empty($email) || empty($password)) {
    echo json_encode([
        'success' => false, 
        'message' => 'Email and password cannot be empty'
    ]);
    exit;
}

try {
    // Find user by email
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Check if user exists and password is correct
    if ($user && password_verify($password, $user['password'])) {
        // Remove sensitive info
        unset($user['password']);

        // Set session
        $_SESSION['user_id'] = $user['id'];

        echo json_encode([
            'success' => true, 
            'message' => 'Login successful',
            'user' => $user
        ]);
    } else {
        echo json_encode([
            'success' => false, 
            'message' => 'Invalid email or password'
        ]);
    }
} catch(PDOException $e) {
    echo json_encode([
        'success' => false, 
        'message' => 'Login failed: ' . $e->getMessage()
    ]);
}
?>