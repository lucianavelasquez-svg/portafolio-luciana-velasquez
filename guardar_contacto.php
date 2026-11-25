<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'mensaje' => 'Método no permitido.']);
    exit;
}

// 1. DATOS DE CONEXIÓN DE INFINITYFREE (Cámbialos por los de tu panel)
$host     = 'sql109.infinityfree.com';
$dbname   = 'if0_43535129_portafolio';
$usuario  = 'if0_43535129';
$password = 'TU_CONTRASEÑA_AQUI';

// 2. Recibir y limpiar datos
$nombre  = trim($_POST['nombre'] ?? '');
$correo  = trim($_POST['correo'] ?? '');
$celular = trim($_POST['celular'] ?? '');
$mensaje = trim($_POST['mensaje'] ?? '');

// 3. Validación en servidor
if (mb_strlen($nombre) < 3) {
    echo json_encode(['ok' => false, 'mensaje' => 'Ingresa tus apellidos y nombres completos.']);
    exit;
}
if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['ok' => false, 'mensaje' => 'Ingresa un correo electrónico válido.']);
    exit;
}
if (!preg_match('/^\d{9}$/', $celular)) {
    echo json_encode(['ok' => false, 'mensaje' => 'El celular debe tener exactamente 9 dígitos.']);
    exit;
}
if (mb_strlen($mensaje) < 5) {
    echo json_encode(['ok' => false, 'mensaje' => 'Escribe un mensaje más detallado.']);
    exit;
}

// 4. Conectar e insertar en MySQL
try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $usuario,
        $password,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    $sql = "INSERT INTO mensajes_contacto (nombre, correo, celular, mensaje) 
            VALUES (:nombre, :correo, :celular, :mensaje)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':nombre'  => $nombre,
        ':correo'  => $correo,
        ':celular' => $celular,
        ':mensaje' => $mensaje
    ]);

    echo json_encode([
        'ok' => true,
        'mensaje' => '¡Mensaje guardado correctamente en la base de datos! Gracias por comunicarte.'
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'mensaje' => 'Error al conectar con la base de datos. Verifica tus credenciales.'
    ]);
}
