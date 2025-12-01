// ==========================================
//   PARTE 1: LÓGICA DE COPIAR CUPONES
//   (Se ejecuta cuando carga la página)
// ==========================================
document.addEventListener('DOMContentLoaded', function() {

    const botonesCopiar = document.querySelectorAll('.btn-copiar');

    botonesCopiar.forEach(function(boton) {
        boton.addEventListener('click', function() {
            const codigoACopiar = boton.dataset.codigo;
            
            navigator.clipboard.writeText(codigoACopiar).then(function() {
                // Feedback visual: Agrega clase 'copiado'
                boton.classList.add('copiado');
                
                // Quita la clase a los 2 segundos
                setTimeout(function() {
                    boton.classList.remove('copiado');
                }, 2000);
            }).catch(function(err) {
                console.error('Error al copiar el código: ', err);
                alert('Error al copiar el código.');
            });
        });
    });

}); 
// ==========================================
//   PARTE 1: LÓGICA DE COPIAR (NOTIFICACIÓN FLOTANTE)
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const botonesCopiar = document.querySelectorAll('.btn-copiar');

    botonesCopiar.forEach(function(boton) {
        boton.addEventListener('click', function() {
            const codigo = boton.dataset.codigo;
            
            // Copiar al portapapeles
            navigator.clipboard.writeText(codigo).then(() => {
                mostrarToast(`Código ${codigo} copiado`);
            });
        });
    });
});

// Función para mostrar el Toast corregido
function mostrarToast(mensaje) {
    const toast = document.getElementById("toast");
    
    // 1. Poner el texto
    toast.textContent = mensaje;
    
    // 2. Agregar la clase que lo hace visible
    toast.className = "mostrar";

    // 3. Quitar la clase después de 3 segundos (3000ms)
    setTimeout(function(){ 
        toast.className = toast.className.replace("mostrar", ""); 
    }, 3000);
}

// ==========================================
//   PARTE 2: LÓGICA DEL CARRITO CON CANTIDADES
// ==========================================

// Base de datos de precios (debe coincidir con HTML)
const precios = {
    'alexandria': 120000,
    'nefs': 95000,
    'hacivat': 80000,
    'erbapura': 110000,
    'oud': 130000,
    'bleecker': 105000
};

// Estado del carrito: { 'alexandria': 2, 'nefs': 0 ... }
let carrito = {
    'alexandria': 0,
    'nefs': 0,
    'hacivat': 0,
    'erbapura': 0,
    'oud': 0,
    'bleecker': 0
};

let descuentoActivo = 0; // Porcentaje (0, 10, 20)

// Función para sumar (+) o restar (-) cantidad
function cambiarCantidad(idProducto, cantidad) {
    // Evitar negativos
    if (carrito[idProducto] + cantidad < 0) return;

    carrito[idProducto] += cantidad;

    // Actualizar el numerito en la tarjeta
    document.getElementById(`qty-${idProducto}`).textContent = carrito[idProducto];

    actualizarInterfaz();
}

function aplicarCupon(porcentaje) {
    const totalItems = Object.values(carrito).reduce((a, b) => a + b, 0);
    
    if (totalItems === 0) {
        alert("El carrito está vacío.");
        return;
    }

    descuentoActivo = porcentaje;
    
    document.getElementById('msg-descuento').classList.remove('oculto');
    actualizarInterfaz();
    
    // Usamos la misma notificación flotante para confirmar
    mostrarNotificacion(`Descuento del ${porcentaje}% aplicado`);
}

function vaciarCarrito() {
    // Reiniciar contadores a 0
    for (let id in carrito) {
        carrito[id] = 0;
        document.getElementById(`qty-${id}`).textContent = 0;
    }
    
    descuentoActivo = 0;
    document.getElementById('msg-descuento').classList.add('oculto');
    actualizarInterfaz();
}

function actualizarInterfaz() {
    // 1. Calcular Subtotal sumando (precio * cantidad) de cada uno
    let subtotal = 0;
    for (let id in carrito) {
        subtotal += carrito[id] * precios[id];
    }

    // 2. Calcular Descuento
    const montoAhorrado = subtotal * (descuentoActivo / 100);
    const precioFinal = subtotal - montoAhorrado;

    // 3. Formatear y mostrar
    const formateador = new Intl.NumberFormat('es-AR', { 
        style: 'currency', currency: 'ARS', minimumFractionDigits: 0 
    });

    document.getElementById('subtotal').textContent = formateador.format(subtotal);
    document.getElementById('monto-descuento').textContent = "-" + formateador.format(montoAhorrado);
    document.getElementById('total-final').textContent = formateador.format(precioFinal);
}