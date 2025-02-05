  <?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
ini_set('log_errors', 1);
ini_set('error_log', 'error.log');

$allowedOrigin = 'https://dec-azure.vercel.app';

if (isset($_SERVER['HTTP_ORIGIN'])) {
    if ($_SERVER['HTTP_ORIGIN'] === $allowedOrigin) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    }
}

header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 86400'); 

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
    
    
    error_log("Request Method: " . $_SERVER['REQUEST_METHOD']);
    error_log("Origin: " . ($_SERVER['HTTP_ORIGIN'] ?? 'No origin'));
    
    
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception("Invalid request method");
    }
    
    
    $rawInput = file_get_contents("php://input");
    error_log("Raw input: " . $rawInput);
    
    $data = json_decode($rawInput, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Invalid JSON data");
    }
    
    $action = $_GET['action'] ?? '';
    
    if ($action === 'register') {
        if (!isset($data['name']) || !isset($data['email']) || !isset($data['password'])) {
            throw new Exception("Missing required fields: " .
                (!isset($data['name']) ? 'name ' : '') .
                (!isset($data['email']) ? 'email ' : '') .
                (!isset($data['password']) ? 'password' : ''));
        }
        
        error_log("Attempting to register user: " . $data['email']);
        
        
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
        $checkResult = $checkStmt->get_result();
        
        if ($checkResult->num_rows > 0) {
            throw new Exception("Email already registered");
        }
        $checkStmt->close();
        
        $sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $name, $email, $password);
        
        if ($stmt->execute()) {
            echo json_encode([
                "success" => true,
                "message" => "User registered successfully"
            ]);
        } else {
            throw new Exception("Registration failed: " . $conn->error);
        }
        $stmt->close();
    }
    else if ($action === 'login') {
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
