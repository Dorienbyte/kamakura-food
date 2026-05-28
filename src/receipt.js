export function pintarRecibo(carrito, sumaTotal) {
    const contenedorReciboProductos = document.querySelector('#receipt-product');
    const contenedorReciboContainer = document.querySelector('#receipt-container');
    const totalRecibo = document.querySelector('#receipt-total');

    if (!contenedorReciboProductos || !contenedorReciboContainer) return;

    // Vaciamos el contenedor para quitar los platos anteriores
    contenedorReciboProductos.innerHTML = '';

    // Pintamos los platos dinámicamente
    carrito.forEach(plato => {
        const subtotal = plato.price * plato.cantidad;
        
        // Creamos el contenedor del plato
        const elementoPlato = document.createElement('div');
        
        //  CLAVE: Le añadimos la clase original de la profe para que el CSS se aplique solo
        elementoPlato.classList.add('receipt-product');
        
        // Metemos la estructura interna original de la plantilla
        elementoPlato.innerHTML = `
            <h3>${plato.name}</h3>
            <div class="receipt-price">
                <p>Cantidad: ${plato.cantidad}</p>
                <h5>Subtotal ${subtotal.toFixed(2)} €</h5>
            </div>
        `;
        
        contenedorReciboProductos.appendChild(elementoPlato);
    });

    // Actualizamos el total del recibo
    if (totalRecibo) {
        totalRecibo.textContent = `Total: ${sumaTotal.toFixed(2)} €`;
    }

    // Mostramos el recibo usando los estilos de la profe
    contenedorReciboContainer.style.display = 'block';
}