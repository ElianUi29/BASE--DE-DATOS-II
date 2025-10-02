<?php
include("conexion.php");

$carpeta = "uploads/";

// Si no existe la carpeta, la creamos
if (!is_dir($carpeta)) {
    mkdir($carpeta, 0777, true);
}

if (isset($_FILES["archivo"])) {
    $nombreArchivo = basename($_FILES["archivo"]["name"]);
    $rutaDestino = $carpeta . $nombreArchivo;

    // Subir al servidor
    if (move_uploaded_file($_FILES["archivo"]["tmp_name"], $rutaDestino)) {
        // Guardar en la base de datos
        $sql = "INSERT INTO archivos (nombre, ruta) VALUES ('$nombreArchivo', '$rutaDestino')";
        if ($conexion->query($sql) === TRUE) {
            header("Location: semana1.php"); // vuelve a la página principal
        } else {
            echo "❌ Error en BD: " . $conexion->error;
        }
    } else {
        echo "❌ Error al subir archivo.";
    }
}
?>
