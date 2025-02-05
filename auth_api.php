 <?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

ini_set('log_errors', 1);
ini_set('error_log', 'error.log');

header('Access-Control-Allow-Origin: https://your-nextjs-domain.vercel.app'); 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 3600');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

require_once 'config.php';

try {
    if (!isset($conn)) {
        throw new Exception("Database connection not established");
    }
    
    error_log("Request Method: " . $_SERVER['REQUEST_METHOD']);
    error_log("Raw input: " . file_get_contents("php://input"));

    $data = json_decode(file_get_contents("php://input"), true);
    $action = $_GET['action'] ?? '';

    if ($action === 'register') {
        if (!isset($data['name']) || !isset($data['email']) || !isset($data['password'])) {
            throw new Exception("Missing required fields".
                (!isset($data['name']) ? 'name ' : '') .
                (!isset($data['email']) ? 'email ' : '') .
                (!isset($data['password']) ? 'password' : ''));
        }

        error_log("Attempting to register user: " . $data['email']);
        
        $name = $conn->real_escape_string($data['name']);
        $email = $conn->real_escape_string($data['email']);
        $password = password_hash($data['password'], PASSWORD_DEFAULT);
        
        $sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $name, $email, $password);
        
        if ($stmt->execute()) {
            echo json_encode([
                "success" => true, 
                "message" => "User registered successfully"
            ]);
        } else {
            throw new Exception("Registration failed");
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
