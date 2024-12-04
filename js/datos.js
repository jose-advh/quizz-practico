let datos = [];

const modalAgregar = document.getElementById('agregarDatos');
const modalEliminar = document.getElementById('eliminarDatos');
const cancelarModal = document.getElementById('cancelarModal');
const cancelarEliminar = document.getElementById('cancelarEliminar');
const contenedor = document.getElementById('mainDatos');
const contenedorDatos = document.getElementById('datosPersonas');
const formulario = document.getElementById('formularioAgregar');
const formularioEliminar = document.getElementById('formularioEliminar');
const botonEnviar = document.getElementById('enviarDatos');
const botonEliminar = document.getElementById('eliminarDatosBtn'); 

function abrirModal(idModal) {
    document.getElementById(idModal).classList.remove('ocultar');
    contenedor.classList.add('modal__abierto');
}

function cerrarModal(idModal) {
    document.getElementById(idModal).classList.add('ocultar');
    contenedor.classList.remove('modal__abierto');
}

function limpiarYCerrarModal(event, idFormulario) {
    event.preventDefault();
    document.getElementById(idFormulario).reset();
    cerrarModal(idFormulario);
}

function renderizarDatos() {
    if (datos.length === 0) {
        contenedorDatos.innerHTML = '<p>No hay datos registrados</p>';
        return;
    }

    let html = datos.map(dato => `
        <section>
            <p>${dato.identificacion}</p>
            <p>${dato.nombre}</p>
            <p>${dato.direccion}</p>
            <p>${dato.telefono}</p>
            <p>${dato.correo}</p>
            <button onclick="abrirModalEditar('${dato.identificacion}')">Editar</button>
        </section>
    `).join('');

    contenedorDatos.innerHTML = html;
}

function crearDato(identificacion, nombre, direccion, telefono, correo) {
    if (datos.some(d => d.identificacion === identificacion)) {
        alert('La Cédula/Nit ya está registrada');
        return;
    }

    datos.push({ identificacion, nombre, direccion, telefono, correo });
    renderizarDatos();
    limpiarYCerrarModal(event, 'formularioAgregar');
}

function validarYEnviarDatos(event) {
    event.preventDefault();

    const identificacion = document.getElementById('identificacion').value.trim();
    const nombre = document.getElementById('nombre').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const correo = document.getElementById('correo').value.trim();

    if (!identificacion || !nombre || !direccion || !telefono || !correo) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    crearDato(identificacion, nombre, direccion, telefono, correo);
}

function eliminarDato() {
    const identificacionEliminar = document.getElementById('identificacionEliminar').value.trim();
    if (datos.some(d => d.identificacion === identificacionEliminar)) {
        datos = datos.filter(d => d.identificacion !== identificacionEliminar);
        renderizarDatos();
        limpiarYCerrarModal(event, 'formularioEliminar');
    } else {
        alert('No se encontró el dato con esa identificación.');
    }
}

function abrirModalEditar(identificacion) {
    const dato = datos.find(d => d.identificacion === identificacion);
    if (dato) {
        document.getElementById('identificacion').value = dato.identificacion;
        document.getElementById('nombre').value = dato.nombre;
        document.getElementById('direccion').value = dato.direccion;
        document.getElementById('telefono').value = dato.telefono;
        document.getElementById('correo').value = dato.correo;
        abrirModal('formularioAgregar'); 
        botonEnviar.onclick = function(event) {
            actualizarDato(identificacion, event);
        };
    }
}

function actualizarDato(identificacion, event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const correo = document.getElementById('correo').value.trim();

    if (!nombre || !direccion || !telefono || !correo) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    const index = datos.findIndex(d => d.identificacion === identificacion);
    if (index !== -1) {
        datos[index] = { identificacion, nombre, direccion, telefono, correo };
        renderizarDatos();
        limpiarYCerrarModal(event, 'formularioAgregar');
    }
}

cancelarModal.addEventListener('click', (event) => limpiarYCerrarModal(event, 'formularioAgregar'));
cancelarEliminar.addEventListener('click', (event) => limpiarYCerrarModal(event, 'formularioEliminar'));
modalAgregar.addEventListener('click', () => abrirModal('formularioAgregar'));
modalEliminar.addEventListener('click', () => abrirModal('formularioEliminar'));
botonEnviar.addEventListener('click', validarYEnviarDatos);
botonEliminar.addEventListener('click', eliminarDato);

renderizarDatos();