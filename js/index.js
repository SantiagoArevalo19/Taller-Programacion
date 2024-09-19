// Variables globales
let actividades = [];
let actividadIndexAEliminar = null; // Guardar el índice de la actividad a eliminar

// Obtener referencias de los elementos
const formActividad = document.getElementById('form-actividad');
const tablaActividades = document.getElementById('tbody-actividades');
const promedioSpan = document.getElementById('promedio');
const estadoSpan = document.getElementById('estado');
const modal = document.getElementById('modal');
const actividadAEliminarSpan = document.getElementById('actividad-a-eliminar');
const confirmarEliminarBtn = document.getElementById('confirmar-eliminar');
const cancelarEliminarBtn = document.getElementById('cancelar-eliminar');

// Escuchar el envío del formulario
formActividad.addEventListener('submit', function (e) {
    e.preventDefault();
    const actividad = document.getElementById('actividad').value;
    const nota = parseFloat(document.getElementById('nota').value);

    // Agregar la nueva actividad al array
    actividades.push({ actividad, nota });
    
    // Limpiar el formulario
    formActividad.reset();
    
    // Actualizar la tabla
    actualizarTabla();
});

// Función para actualizar la tabla de actividades
function actualizarTabla() {
    // Limpiar la tabla
    tablaActividades.innerHTML = '';

    // Recorrer las actividades y agregar las filas a la tabla
    actividades.forEach((actividad, index) => {
        const fila = document.createElement('tr');
        
        fila.innerHTML = `
            <td>${actividad.actividad}</td>
            <td>${actividad.nota.toFixed(1)}</td>
            <td>
                <button class="edit" onclick="editarActividad(${index})">Modificar</button>
                <button class="delete" onclick="mostrarModal(${index})">Eliminar</button>
            </td>
        `;
        
        tablaActividades.appendChild(fila);
    });

    // Actualizar promedio y estado
    actualizarPromedioYEstado();
}

// Función para mostrar el modal y solicitar confirmación de eliminación
function mostrarModal(index) {
    actividadIndexAEliminar = index; // Guardar el índice de la actividad a eliminar
    const actividad = actividades[index].actividad;
    actividadAEliminarSpan.textContent = actividad; // Mostrar el nombre de la actividad en el modal
    modal.style.display = 'flex'; // Mostrar el modal
}

// Función para eliminar una actividad
function eliminarActividad() {
    actividades.splice(actividadIndexAEliminar, 1); // Eliminar del array
    actualizarTabla(); // Actualizar la tabla
    cerrarModal(); // Cerrar el modal
}

// Función para cerrar el modal sin eliminar
function cerrarModal() {
    modal.style.display = 'none'; // Ocultar el modal
}

// Escuchar los botones del modal
confirmarEliminarBtn.addEventListener('click', eliminarActividad);
cancelarEliminarBtn.addEventListener('click', cerrarModal);

// Función para editar una actividad
function editarActividad(index) {
    const actividad = actividades[index];
    document.getElementById('actividad').value = actividad.actividad;
    document.getElementById('nota').value = actividad.nota;

    // Eliminar la actividad actual para ser reemplazada
    eliminarActividad(index);
}

// Función para calcular y actualizar el promedio y estado
function actualizarPromedioYEstado() {
    if (actividades.length === 0) {
        promedioSpan.textContent = '0';
        estadoSpan.textContent = 'No Aplica';
        return;
    }

    // Calcular el promedio
    const sumaNotas = actividades.reduce((sum, actividad) => sum + actividad.nota, 0);
    const promedio = sumaNotas / actividades.length;

    // Actualizar el promedio en la interfaz
    promedioSpan.textContent = promedio.toFixed(1);

    // Actualizar el estado en función del promedio
    estadoSpan.textContent = promedio >= 3.0 ? 'Aprobado' : 'No Aprobado';
}
