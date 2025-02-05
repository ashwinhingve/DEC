  <?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
ini_set('log_errors', 1);
ini_set('error_log', 'debug.log');

$allowed_origins = [
    'https://dec-azure.vercel.app',
    'http://dec-azure.vercel.app',
    'https://www.dec-azure.vercel.app'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Max-Age: 86400"); 
}


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

header('Content-Type: application/json');


require_once 'config.php';

try {
    if (!isset($conn)) {
        throw new Exception("Database connection not established");
    }
    
    $rawInput = file_get_contents("php://input");
    error_log("Received Raw Input: " . $rawInput);
    
    $data = json_decode($rawInput, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Invalid JSON: " . json_last_error_msg());
    }
    
    $action = $_GET['action'] ?? '';
    error_log("Requested Action: " . $action);
    
    if ($action === 'register') {
        if (!isset($data['name']) || !isset($data['email']) || !isset($data['password'])) {
            throw new Exception("Missing required fields");
        }
        
      
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            throw new Exception("Invalid email format");
        }
        
        $name = $conn->real_escape_string($data['name']);
        $email = $conn->real_escape_string($data['email']);
        $password = password_hash($data['password'], PASSWORD_DEFAULT);
        
        
        $checkSql = "SELECT id FROM users WHERE email = ?";
        $checkStmt = $conn->prepare($checkSql);
        $checkStmt->bind_param("s", $email);
        $checkStmt->execute();
        if ($checkStmt->get_result()->num_rows > 0) {
            throw new Exception("Email already registered");
        }
        $checkStmt->close();
        
    
        $sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $name, $email, $password);
        
        if ($stmt->execute()) {
            echo json_encode([
                "success" => true,
                "message" => "Registration successful"
            ]);
        } else {
            throw new Exception("Registration failed: " . $conn->error);
        }
        $stmt->close();
    }
    elseif ($action === 'login') {
        if (!isset($data['email']) || !isset($data['password'])) {
            throw new Exception("Missing email or password");
        }
        
        $email = $conn->real_escape_string($data['email']);
        
        $sql = "SELECT * FROM users WHERE email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            if (password_verify($data['password'], $user['password'])) {
                unset($user['password']); 
                echo json_encode([
                    "success" => true,
                    "user" => $user
                ]);
            } else {
                throw new Exception("Invalid credentials");
            }
        } else {
            throw new Exception("User not found");
        }
        $stmt->close();
    }
    else {
        throw new Exception("Invalid action");
    }
} catch (Exception $e) {
    error_log("Error: " . $e->getMessage());
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
} finally {
    if (isset($conn)) {
        $conn->close();
    }
}
?>
