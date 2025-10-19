// Espera a que todo el contenido de la página se cargue
document.addEventListener('DOMContentLoaded', function() {

    // --- Lógica para Copiar Cupones ---
    const botonesCopiar = document.querySelectorAll('.btn-copiar');

    botonesCopiar.forEach(function(boton) {
        boton.addEventListener('click', function() {
            const codigoACopiar = boton.dataset.codigo;
            navigator.clipboard.writeText(codigoACopiar).then(function() {
                boton.classList.add('copiado');
                setTimeout(function() {
                    boton.classList.remove('copiado');
                }, 2000);
            }).catch(function(err) {
                console.error('Error al copiar el código: ', err);
                alert('Error al copiar el código.');
            });
        });
    });

    // ============================================= //
    //          LÓGICA DE LA CALCULADORA             //
    // ============================================= //

    // 1. Seleccionar los elementos del DOM
    const montoInput = document.getElementById('monto');
    const descuentoInput = document.getElementById('descuento');
    const botonCalcular = document.getElementById('btn-calcular');
    const resultadoDiv = document.getElementById('resultado-calculadora');
    
    // Seleccionamos los nuevos spans
    const totalOriginalSpan = document.getElementById('total-original');
    const descuentoAplicadoSpan = document.getElementById('descuento-aplicado');
    const precioFinalSpan = document.getElementById('precio-final');

    // 2. Añadir un evento de 'click' al botón
    botonCalcular.addEventListener('click', function() {
        // 3. Obtener y convertir los valores de los inputs
        const monto = parseFloat(montoInput.value);
        const descuento = parseFloat(descuentoInput.value);

        // 4. Validar que los valores sean números positivos
        if (isNaN(monto) || isNaN(descuento) || monto <= 0 || descuento < 0) {
            alert('Por favor, ingresa un monto y un descuento válidos.');
            return; 
        }

        // 5. Realizar los cálculos
        const ahorro = monto * (descuento / 100);
        const precioFinal = monto - ahorro;

        // 6. Mostrar los resultados en el DOM
        totalOriginalSpan.textContent = `$${monto.toFixed(2)}`;
        descuentoAplicadoSpan.textContent = `-$${ahorro.toFixed(2)}`;
        precioFinalSpan.textContent = `$${precioFinal.toFixed(2)}`;
        
        // 7. Mostrar el contenedor de resultados
        resultadoDiv.classList.remove('resultado-oculto');
    });
    
});