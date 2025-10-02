<?php
include("conexion.php");

if (isset($_GET["id"])) {
    $id = $_GET["id"];

    // Buscar ruta del archivo
    $res = $conexion->query("SELECT ruta FROM archivos WHERE id=$id");
    $fila = $res->fetch_assoc();
    $ruta = $fila["ruta"];

    // Eliminar archivo físico
    if (file_exists($ruta)) {
        unlink($ruta);
    }

    // Eliminar registro de BD
    $conexion->query("DELETE FROM archivos WHERE id=$id");
}

header("Location: semana1.php");
?>
