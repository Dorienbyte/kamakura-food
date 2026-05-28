import { products } from './data.js';

export let carrito = [];

export function anadirPlatoAlCarrito(idProducto) {
    const platoEncontrado = products.find(producto => producto.id === idProducto);
    const existeEnCarrito = carrito.find(item => item.id === idProducto);

    if (existeEnCarrito) {
        existeEnCarrito.cantidad++;
    } else {
        carrito.push({ ...platoEncontrado, cantidad: 1 });
    }
    
    pintarCarrito();
}

export function pintarCarrito() {
    const contenedorCarrito = document.querySelector('#cart-products');
    if (!contenedorCarrito) return;
    
    contenedorCarrito.innerHTML = '';

    const botonCerrarHTML = document.createElement('button');
    botonCerrarHTML.classList.add('close-button');
    botonCerrarHTML.innerHTML = '<img src="./assets/img/close.svg" alt="close">';
    contenedorCarrito.appendChild(botonCerrarHTML);

    carrito.forEach(plato => {
        const elemento = document.createElement('div');
        elemento.classList.add('cart-container');
        elemento.innerHTML = `
            <div class="text-container">
                <h3>${plato.name}</h3>
                <h5>${plato.price} €</h5>
            </div>
            <div class="quantity-container">
                <button class="btn-incrementar" data-id="${plato.id}">+</button>
                <p class="quantity">${plato.cantidad}</p>
                <button class="btn-disminuir" data-id="${plato.id}">-</button>
                <button class="btn-eliminar" data-id="${plato.id}">🗑️</button>
            </div>
        `;
        contenedorCarrito.appendChild(elemento);
    });

    // LLAMADA AUTOMÁTICA: Cada vez que se pinta el carrito, recalculamos el precio total
    calcularTotal();
}

export function calcularTotal() {
    let sumaTotal = 0;

    carrito.forEach(plato => {
        sumaTotal += plato.price * plato.cantidad;
    });

    // Buscamos el ID exacto del elemento donde queremos mostrar el total (en este caso, #cart-total)
    const elementoTotalReal = document.querySelector('#cart-total');

    if (elementoTotalReal) {
        elementoTotalReal.textContent = `Total: ${sumaTotal.toFixed(2)} €`;
    }
}

// ⬇️ ESTA ES LA FUNCIÓN NUEVA QUE HE AÑADIDO ABAJO DEL TODO ⬇️
export function vaciarCarrito() {
    carrito.length = 0; // Vaciamos el array por completo
    pintarCarrito();    // Volvemos a pintar el carrito (ahora se quedará vacío y el total a 0 €)
    alert("¡Pedido realizado con éxito, gracias por comprar en Kamakura Food!");
}