const SUPABASE_URL = "https://ovyimvnyqvtjbksggjwq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92eWltdm55cXZ0amJrc2dnandxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzODcxNTQsImV4cCI6MjA4MDk2MzE1NH0.Pz8YZgIRkz_sphdWbL77_S8U2DfP0q_oskXAXUzM_10";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function registrar() {
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const telefono = document.getElementById("telefono").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await client.auth.signUp({ email, password });

  if (error) {
    alert("❌ Error al registrarse: " + error.message);
    return;
  }

  const userId = data.user?.id;

  if (!userId) {
    alert("❌ No se pudo obtener el ID del usuario.");
    return;
  }

  const { error: insertError } = await client
    .from("clientes")
    .insert({
      id: userId,
      email,
      nombre,
      apellido,
      telefono
    });

  if (insertError) {
    alert("❌ Error al guardar datos: " + insertError.message);
    return;
  }

  alert("🎉 ¡Registro exitoso!");
  window.location.href = "herramientas.html";
}


async function login() {
  const email = document.getElementById("emailLogin").value;
  const password = document.getElementById("passwordLogin").value;

  const { error } = await client.auth.signInWithPassword({ email, password });

  if (error) {
    alert("❌ Error al iniciar sesión: " + error.message);
    return;
  }

  window.location.href = "herramientas.html";
}
