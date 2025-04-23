<?php
// Detailed Database Connection Test
try {
    // Database configuration
    $host = 'localhost';
    $dbname = 'woodstory';
    $username = 'root';  // Your MySQL username
    $password = '';      // Your MySQL password

    // Create PDO connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    
    // Set error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Test basic database interaction
    $stmt = $pdo->query("SELECT COUNT(*) FROM users");
    $userCount = $stmt->fetchColumn();

    // Prepare connection details
    $connectionDetails = [
        'Status' => 'Success',
        'Host' => $host,
        'Database' => $dbname,
        'Total Users' => $userCount,
        'PHP Version' => phpversion(),
        'PDO Drivers' => implode(', ', PDO::getAvailableDrivers())
    ];

    // Output in a readable format
    echo "<html><body>";
    echo "<h1>Database Connection Test</h1>";
    echo "<table border='1' style='border-collapse: collapse; width: 50%;'>";
    foreach ($connectionDetails as $key => $value) {
        echo "<tr>";
        echo "<td style='padding: 10px;'><strong>$key</strong></td>";
        echo "<td style='padding: 10px;'>$value</td>";
        echo "</tr>";
    }
    echo "</table>";

    // Try to fetch some user data
    $stmt = $pdo->query("SELECT id, name, email, role FROM users LIMIT 5");
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo "<h2>Recent Users</h2>";
    echo "<table border='1' style='border-collapse: collapse; width: 50%;'>";
    echo "<tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th></tr>";
    foreach ($users as $user) {
        echo "<tr>";
        echo "<td>" . htmlspecialchars($user['id']) . "</td>";
        echo "<td>" . htmlspecialchars($user['name']) . "</td>";
        echo "<td>" . htmlspecialchars($user['email']) . "</td>";
        echo "<td>" . htmlspecialchars($user['role']) . "</td>";
        echo "</tr>";
    }
    echo "</table>";

    echo "</body></html>";

} catch(PDOException $e) {
    // Detailed error handling
    echo "<html><body>";
    echo "<h1>Database Connection Failed</h1>";
    echo "<p>Error: " . htmlspecialchars($e->getMessage()) . "</p>";
    echo "<h2>Troubleshooting Tips:</h2>";
    echo "<ul>";
    echo "<li>Check if MySQL is running</li>";
    echo "<li>Verify database name is correct</li>";
    echo "<li>Confirm username and password</li>";
    echo "<li>Ensure the database exists</li>";
    echo "</ul>";
    echo "</body></html>";
}
?>