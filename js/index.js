
let actividades = [];
let actividadIndexAEliminar = null; //  este es para Guardar cada la actividad a eliminar y se declara el array

// Obtener referencias de los elementos DOM
const formActividad = document.getElementById('contenido-actividad');
const tablaActividades = document.getElementById('tabla-actividades');
const promedioSpan = document.getElementById('promedio');
const estadoSpan = document.getElementById('estado');
const modal = document.getElementById('modal');
const actividadAEliminarSpan = document.getElementById('actividad-a-eliminar');
const confirmarEliminarBtn = document.getElementById('moddsi');
const cancelarEliminarBtn = document.getElementById('moddno');

//  envío del formulario aca se guarda lo que se ingresa a la tabla
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

// actualizar la tabla de actividades
function actualizarTabla() {
    // Limpiar la tabla
    tablaActividades.innerHTML = '';

    // aqui lo que se hace es recorrer las actividades y agregar las filas a la tabla
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

// mostrar el modal y solicitar confirmación de eliminación
function mostrarModal(index) {
    actividadIndexAEliminar = index; // Guardar a eliminar
    const actividad = actividades[index].actividad;
    actividadAEliminarSpan.textContent = actividad; // Mostrar el nombre de la actividad en el modal
    modal.style.display = 'flex'; // Mostrar 
}

// ACA es eliminar 
function eliminarActividad() {
    actividades.splice(actividadIndexAEliminar, 1); // Eliminar del array
    actualizarTabla(); // Actualizar la tabla
    cerrarModal(); // Cerrar el modal
}

//  para cerrar el modal sin eliminar
function cerrarModal() {
    modal.style.display = 'none'; // Ocultar el modal
}

//  botones del modal
confirmarEliminarBtn.addEventListener('click', eliminarActividad);
cancelarEliminarBtn.addEventListener('click', cerrarModal);

// ACA es para modificar 
function editarActividad(index) {
    const actividad = actividades[index];
    document.getElementById('actividad').value = actividad.actividad;
    document.getElementById('nota').value = actividad.nota;

    // Eliminar la actividad actual para ser reemplazada
    eliminarActividad(index);
}

// ACA calcular y actualizar el promedio y estado
function actualizarPromedioYEstado() {
    if (actividades.length === 0) {
        promedioSpan.textContent = '0';
        estadoSpan.textContent = 'No Aplica';
        return;
    }

   
    const sumaNotas = actividades.reduce((sum, actividad) => sum + actividad.nota, 0);
    const promedio = sumaNotas / actividades.length;

    // Actualizar el promedio para que se muestre en la pagina 
    promedioSpan.textContent = promedio.toFixed(1);

    // Actualizar el promedio Xd
    estadoSpan.textContent = promedio >= 3.0 ? 'Aprobado' : 'No Aprobado';
}
