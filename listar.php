<?php
include("conexion.php");

$sql = "SELECT * FROM archivos ORDER BY fecha_subida DESC";
$resultado = $conexion->query($sql);

$contador = 1;
while ($fila = $resultado->fetch_assoc()) {
    echo "<tr>
            <td>".$contador."</td>
            <td>".$fila['nombre']."</td>
            <td>
              <a href='".$fila['ruta']."' target='_blank'>Ver</a> | 
              <a href='eliminar.php?id=".$fila['id']."'>Eliminar</a>
            </td>
          </tr>";
    $contador++;
}
?>
