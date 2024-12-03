let datos = [];

document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault();

    const identificacion = document.getElementById('identificacion').value;
    const nombre = document.getElementById('nombre').value;
    const direccion = document.getElementById('direccion').value;
    const telefono = document.getElementById('telefono').value;
    const correo = document.getElementById('correo').value;

    // Pruebas
    console.log('identificacion', identificacion);
    console.log('nombre', nombre);
    console.log('direccion', direccion);
    console.log('telefono', telefono);
    console.log('correo', correo);

    if (identificacion === '' || nombre === '' || direccion === '' || telefono === '' || correo === '') {
        alert('Por favor, complete todos los campos.');
    } else {
        crearDato(identificacion , nombre, direccion, telefono, correo);
    }

    function crearDato(identificacion, nombre, direccion, telefono, correo) {
        for (var i in datos) {
            if (datos[i].identificacion == identificacion) {
                alert('La Cédula/Nit ya está registrada');
                return;
            }
        }   

        let datosAlmacenados = { 
            identificacion: identificacion, nombre: nombre, direccion: direccion, telefono: telefono, correo: correo 
        };

        datos.push(datosAlmacenados);
    }

    console.log(datos);


});
