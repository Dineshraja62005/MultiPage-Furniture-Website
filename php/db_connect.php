<?php
// Database configuration
$host = 'localhost';
$dbname = 'woodstory';
$username = 'root';  // default for most local setups
$password = 'root';      // default for most local setups

try {
    // Create PDO connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    
    // Set error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Disable emulated prepared statements for security
    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
} catch(PDOException $e) {
    // Handle connection error
    die(json_encode([
        'success' => false, 
        'message' => 'Database connection failed: ' . $e->getMessage()
    ]));
}
?>