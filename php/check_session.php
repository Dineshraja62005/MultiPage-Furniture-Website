<?php
session_start();
header('Content-Type: application/json');
require 'db_connect.php';

if (isset($_SESSION['user_id'])) {
    try {
        // Fetch user details
        $stmt = $pdo->prepare("SELECT id, name, email, role FROM users WHERE id = ?");
        $stmt->execute([$_SESSION['user_id']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            echo json_encode([
                'success' => true,
                'isLoggedIn' => true,
                'user' => $user
            ]);
        } else {
            // Session exists but user not found
            session_destroy();
            echo json_encode([
                'success' => true,
                'isLoggedIn' => false
            ]);
        }
    } catch(PDOException $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Session check failed: ' . $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        'success' => true,
        'isLoggedIn' => false
    ]);
}
?>