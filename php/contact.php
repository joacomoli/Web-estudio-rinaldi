<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Configuración
$to_email = 'estudiorinaldi@estudiorinaldi.com'; // Cambiar por el email real
$subject_prefix = 'Contacto Web - Estudio Rinaldi';

// Respuesta por defecto
$response = [
    'success' => false,
    'message' => 'Error al procesar el formulario'
];

// Verificar que sea una petición POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response['message'] = 'Método no permitido';
    echo json_encode($response);
    exit;
}

// Obtener y sanitizar datos del formulario
$nombre = isset($_POST['nombre']) ? trim($_POST['nombre']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$telefono = isset($_POST['telefono']) ? trim($_POST['telefono']) : '';
$asunto = isset($_POST['asunto']) ? trim($_POST['asunto']) : '';
$mensaje = isset($_POST['mensaje']) ? trim($_POST['mensaje']) : '';
$area_practica = isset($_POST['area_practica']) ? trim($_POST['area_practica']) : '';

// Validaciones
$errors = [];

if (empty($nombre)) {
    $errors[] = 'El nombre es requerido';
}

if (empty($email)) {
    $errors[] = 'El email es requerido';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'El email no es válido';
}

if (empty($asunto)) {
    $errors[] = 'El asunto es requerido';
}

if (empty($mensaje)) {
    $errors[] = 'El mensaje es requerido';
}

// Si hay errores, retornarlos
if (!empty($errors)) {
    $response['message'] = implode(', ', $errors);
    echo json_encode($response);
    exit;
}

// Preparar el email
$email_subject = $subject_prefix . ' - ' . $asunto;
if (!empty($area_practica)) {
    $email_subject .= ' [' . $area_practica . ']';
}

$email_body = "Nuevo mensaje de contacto desde la web del Estudio Rinaldi\n\n";
$email_body .= "Nombre: " . htmlspecialchars($nombre) . "\n";
$email_body .= "Email: " . htmlspecialchars($email) . "\n";
if (!empty($telefono)) {
    $email_body .= "Teléfono: " . htmlspecialchars($telefono) . "\n";
}
if (!empty($area_practica)) {
    $email_body .= "Área de Práctica: " . htmlspecialchars($area_practica) . "\n";
}
$email_body .= "Asunto: " . htmlspecialchars($asunto) . "\n\n";
$email_body .= "Mensaje:\n" . htmlspecialchars($mensaje) . "\n";

// Headers del email
$headers = "From: " . $email . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Intentar enviar el email
try {
    $mail_sent = mail($to_email, $email_subject, $email_body, $headers);
    
    if ($mail_sent) {
        $response['success'] = true;
        $response['message'] = 'Mensaje enviado correctamente';
        
        // Opcional: Guardar en archivo de log
        $log_entry = date('Y-m-d H:i:s') . " - Contacto de: $nombre ($email)\n";
        file_put_contents('contact_log.txt', $log_entry, FILE_APPEND);
    } else {
        $response['message'] = 'Error al enviar el email. Por favor, intenta nuevamente.';
    }
} catch (Exception $e) {
    $response['message'] = 'Error del servidor: ' . $e->getMessage();
}

// Retornar respuesta JSON
echo json_encode($response);
exit;
?>

