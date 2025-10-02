<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Semana 1</title>
  <link rel="stylesheet" href="semana1.css">
</head>
<body>
  <header>
    <div class="izquierda">
      <img src="UPLA.png" alt="Logo" class="logo">
      <div class="info">
        <p class="universidad">Universidad Peruana Los Andes</p>
        <h1 class="nombre">Elian Vicente Ramos</h1>
      </div>
    </div>
    <nav>
      <a href="index.html">Inicio</a>
      <a href="tareas.html">Tareas</a>
      <a href="perfil.html">Perfil</a>
    </nav>
  </header>

  <main>
    <div class="cuadro">
      <h2>Semana 1</h2>
      <p>Sube tus documentos</p>

      <!-- Formulario subir archivo -->
      <form class="form-subir" action="subir.php" method="POST" enctype="multipart/form-data">
        <input type="file" name="archivo" id="inputArchivo" required>
        <button type="submit" class="btn-subir">Subir Archivo</button>
      </form>

      <!-- Tabla de archivos -->
      <table class="tabla-archivos">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre del Archivo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody id="listaArchivos">
          <?php include("listar.php"); ?>
        </tbody>
      </table>
    </div>
  </main>

  <footer>
    <p class="bajo">2025 Universidad Peruana los Andes</p>
  </footer>

  <!-- Ventana modal -->
  <div id="modal" class="modal">
    <div class="modal-contenido">
      <span id="cerrarModal" class="cerrar">&times;</span>
      <div id="visorArchivo"></div>
    </div>
  </div>

  <script src="semana1.js"></script>
</body>
</html>
