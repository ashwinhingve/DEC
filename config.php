<?php
$host = "193.203.184.173";
$user = "u436222305_auth_db";
$password = "Demploymentcorner@123";
$database = "u436222305_auth_db";

try {
    $conn = new mysqli($host, $user, $password, $database);
    
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection error: " . $e->getMessage()
    ]);
    exit();
}
?>
