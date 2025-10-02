<?php
$host = "localhost";
$user = "root";    // en XAMPP por defecto es root
$pass = "upla_2025";        // vacío por defecto
$db   = "universidad"; // tu base de datos

$conexion = new mysqli($host, $user, $pass, $db);

if ($conexion->connect_error) {
    die("❌ Error en la conexión: " . $conexion->connect_error);
}
?>
