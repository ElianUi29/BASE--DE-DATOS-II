// Cargar archivos al iniciar
document.addEventListener("DOMContentLoaded", mostrarArchivos);

// Subir archivo
document.getElementById("formArchivo").addEventListener("submit", function(e) {
  e.preventDefault();
  const archivo = document.getElementById("inputArchivo").files[0];
  if (archivo) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const nuevoArchivo = {
        nombre: archivo.name,
        tipo: archivo.type,
        url: event.target.result
      };

      let archivos = JSON.parse(localStorage.getItem("archivosSemana1")) || [];
      archivos.push(nuevoArchivo);
      localStorage.setItem("archivosSemana1", JSON.stringify(archivos));

      mostrarArchivos();

      // 👉 Mostrar automáticamente el archivo en el visor
      abrirModal(nuevoArchivo);

      document.getElementById("formArchivo").reset();
    };
    reader.readAsDataURL(archivo);
  }
});

// Mostrar archivos en tabla
function mostrarArchivos() {
  const lista = document.getElementById("listaArchivos");
  lista.innerHTML = "";

  let archivos = JSON.parse(localStorage.getItem("archivosSemana1")) || [];

  archivos.forEach((archivo, index) => {
    const fila = document.createElement("tr");

    // Columna #
    const colNum = document.createElement("td");
    colNum.textContent = index + 1;

    // Columna nombre
    const colNombre = document.createElement("td");
    colNombre.textContent = archivo.nombre;

    // Columna acciones
    const colAcciones = document.createElement("td");

    // Botón ver
    const btnVer = document.createElement("button");
    btnVer.textContent = "Ver";
    btnVer.classList.add("btn-ver");
    btnVer.onclick = function() {
      abrirModal(archivo);
    };

    // Botón eliminar
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.classList.add("btn-eliminar");
    btnEliminar.onclick = function() {
      eliminarArchivo(index);
    };

    colAcciones.appendChild(btnVer);
    colAcciones.appendChild(btnEliminar);

    fila.appendChild(colNum);
    fila.appendChild(colNombre);
    fila.appendChild(colAcciones);
    lista.appendChild(fila);
  });
}

// Eliminar archivo
function eliminarArchivo(index) {
  let archivos = JSON.parse(localStorage.getItem("archivosSemana1")) || [];
  archivos.splice(index, 1);
  localStorage.setItem("archivosSemana1", JSON.stringify(archivos));
  mostrarArchivos();
}

// Modal
const modal = document.getElementById("modal");
const visorArchivo = document.getElementById("visorArchivo");
const cerrarModal = document.getElementById("cerrarModal");

function abrirModal(archivo) {
  const tipo = archivo.tipo;
  let contenido = "";

  if (tipo.startsWith("image/")) {
    // 📷 Mostrar imagen
    contenido = `<img src="${archivo.url}" style="max-width:100%; max-height:500px;">`;
  } else if (tipo === "application/pdf") {
    // 📄 Mostrar PDF
    contenido = `<iframe src="${archivo.url}" width="100%" height="500px"></iframe>`;
  } else if (tipo.startsWith("text/") || archivo.nombre.endsWith(".html") || archivo.nombre.endsWith(".css") || archivo.nombre.endsWith(".js")) {
    // 📜 Mostrar texto
    fetch(archivo.url)
      .then(res => res.text())
      .then(data => {
        visorArchivo.innerHTML = `<pre style="text-align:left; white-space:pre-wrap;">${data}</pre>`;
      });
    modal.style.display = "block";
    return;
  } else {
    // 🔗 Para otros tipos solo mostrar link de descarga
    contenido = `<p>No se puede previsualizar este archivo. <a href="${archivo.url}" target="_blank">Descargar aquí</a></p>`;
  }

  visorArchivo.innerHTML = contenido;
  modal.style.display = "block";
}

cerrarModal.onclick = function() {
  modal.style.display = "none";
  visorArchivo.innerHTML = "";
};

window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
    visorArchivo.innerHTML = "";
  }
};
