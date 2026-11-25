<?php
$clave_secreta = 'luciana2026';
if (($_GET['clave'] ?? '') !== $clave_secreta) {
    die('Acceso denegado.');
}

$host     = 'sql109.infinityfree.com';
$dbname   = 'if0_43535129_portafolio';
$usuario  = 'if0_43535129';
$password = 'TU_CONTRASEÑA_AQUI';

$pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $usuario, $password);
$mensajes = $pdo->query("SELECT * FROM mensajes_contacto ORDER BY fecha_envio DESC")->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Mensajes Recibidos | Base de Datos</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; background: #0f172a; color: #f8fafc; padding: 30px; }
        h1 { color: #38bdf8; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; background: #1e293b; }
        th, td { padding: 12px; border: 1px solid #334155; text-align: left; }
        th { background: #0284c7; color: white; }
    </style>
</head>
<body>
    <h1>Mensajes Guardados en MySQL (<?= count($mensajes) ?>)</h1>
    <table>
        <tr>
            <th>ID</th><th>Nombre</th><th>Correo</th><th>Celular</th><th>Mensaje</th><th>Fecha</th>
        </tr>
        <?php foreach ($mensajes as $m): ?>
        <tr>
            <td><?= htmlspecialchars($m['id']) ?></td>
            <td><?= htmlspecialchars($m['nombre']) ?></td>
            <td><?= htmlspecialchars($m['correo']) ?></td>
            <td><?= htmlspecialchars($m['celular']) ?></td>
            <td><?= htmlspecialchars($m['mensaje']) ?></td>
            <td><?= htmlspecialchars($m['fecha_envio']) ?></td>
        </tr>
        <?php endforeach; ?>
    </table>
</body>
</html>
