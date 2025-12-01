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
// ⬆️ IMPORTANTE: Aquí se cierra el evento de carga (DOMContentLoaded)


// ==========================================
//   PARTE 2: LÓGICA DEL MINI CARRITO
//   (Funciones globales para los onclick)
// ==========================================

let carritoTotal = 0;
let descuentoActivo = 0; 

// Función llamada desde el HTML al tocar "Agregar +"
function agregarAlCarrito(precio) {
    carritoTotal += precio;
    actualizarInterfaz();
}

// Función llamada desde los botones de cupones
function aplicarCupon(porcentaje) {
    if (carritoTotal === 0) {
        alert("¡Tu carrito está vacío! Agrega perfumes primero.");
        return;
    }
    
    descuentoActivo = porcentaje;
    
    // Mostramos el mensaje de descuento
    const mensaje = document.getElementById('msg-descuento');
    if (mensaje) {
        mensaje.classList.remove('oculto');
    }
    
    actualizarInterfaz();
    alert(`¡Genial! Se aplicó un ${porcentaje}% de descuento.`);
}

// Función para reiniciar todo
function vaciarCarrito() {
    carritoTotal = 0;
    descuentoActivo = 0;
    
    const mensaje = document.getElementById('msg-descuento');
    if (mensaje) {
        mensaje.classList.add('oculto');
    }
    
    actualizarInterfaz();
}

// Función central que hace los cálculos y actualiza el texto
function actualizarInterfaz() {
    // 1. Cálculos matemáticos
    const montoAhorrado = carritoTotal * (descuentoActivo / 100);
    const precioFinal = carritoTotal - montoAhorrado;

    // 2. Formateador para que se vea como moneda Argentina ($1.000,00)
    const formateador = new Intl.NumberFormat('es-AR', { 
        style: 'currency', 
        currency: 'ARS',
        minimumFractionDigits: 0 
    });

    // 3. Escribir en el HTML
    // Usamos 'getElementById' asegurándonos de que existan en el nuevo HTML
    const subtotalEl = document.getElementById('subtotal');
    const descuentoEl = document.getElementById('monto-descuento');
    const totalEl = document.getElementById('total-final');

    if (subtotalEl) subtotalEl.textContent = formateador.format(carritoTotal);
    if (descuentoEl) descuentoEl.textContent = "-" + formateador.format(montoAhorrado);
    if (totalEl) totalEl.textContent = formateador.format(precioFinal);
}