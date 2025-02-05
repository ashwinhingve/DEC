<?php
$host = "localhost";
$user = "root";
$password = "";
$database = "auth_db";

$conn = new mysqli($host, $user, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    echo "Connected successfully";
}
$conn->close();
?>

 