import { products } from './data.js';
import { pintarPlatos, crearBotonesFiltros } from './menu.js';
import { anadirPlatoAlCarrito, carrito, pintarCarrito, vaciarCarrito } from './cart.js';
import { pintarRecibo } from './receipt.js';

export function controlarAperturaCarrito() {
    const botonAbrir = document.querySelector('#cart');
    const panelCarrito = document.querySelector('#cart-container');

    if (!botonAbrir || !panelCarrito) return;

    botonAbrir.addEventListener('click', () => {
        panelCarrito.style.display = 'block';
    });
}

export function manejarFiltros() {
    const contenedorFiltros = document.querySelector('#filters');
    if (!contenedorFiltros) return;

    contenedorFiltros.addEventListener('click', (evento) => {
        if (evento.target.classList.contains('filter')) {
            const categoriaSeleccionada = evento.target.getAttribute('data-category');
            if (categoriaSeleccionada === 'todos') {
                pintarPlatos(products);
            } else {
                const platosFiltrados = products.filter(plato => plato.category === categoriaSeleccionada);
                pintarPlatos(platosFiltrados);
            }
        }
    });
}

export function controlarBotonesCarrito() {
    const contenedorCarrito = document.querySelector('#cart-products');
    if (!contenedorCarrito) return;

    contenedorCarrito.addEventListener('click', (evento) => {
        if (evento.target.closest('.close-button')) {
            document.querySelector('#cart-container').style.display = 'none';
        }

        if (evento.target.classList.contains('btn-incrementar')) {
            const idPlato = parseInt(evento.target.getAttribute('data-id'));
            const plato = carrito.find(item => item.id === idPlato);
            if (plato) {
                plato.cantidad++;
                pintarCarrito();
            }
        }

        if (evento.target.classList.contains('btn-disminuir')) {
            const idPlato = parseInt(evento.target.getAttribute('data-id'));
            const platoIndex = carrito.findIndex(item => item.id === idPlato);
            if (platoIndex !== -1) {
                if (carrito[platoIndex].cantidad > 1) {
                    carrito[platoIndex].cantidad--;
                } else {
                    carrito.splice(platoIndex, 1);
                }
                pintarCarrito();
            }
        }

        if (evento.target.classList.contains('btn-eliminar')) {
            const idPlato = parseInt(evento.target.getAttribute('data-id'));
            const platoIndex = carrito.findIndex(item => item.id === idPlato);
            if (platoIndex !== -1) {
                carrito.splice(platoIndex, 1);
                pintarCarrito();
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    crearBotonesFiltros();
    manejarFiltros();
    pintarPlatos(products);
    controlarAperturaCarrito();
    controlarBotonesCarrito();

    // 1. Escuchar los clics para AÑADIR productos al carrito
    const contenedorProductos = document.querySelector('#products');
    if (contenedorProductos) {
        contenedorProductos.addEventListener('click', (event) => {
            if (event.target.classList.contains('add-button')) {
                const idPlato = parseInt(event.target.getAttribute('data-id'));
                anadirPlatoAlCarrito(idPlato);
            }
        });
    }

    // Guardamos la posición original del recibo en el HTML al cargar la página
    const recibo = document.querySelector('#receipt-container');
    const contenedorPrincipal = recibo ? recibo.parentNode : null;

    // 2. Al pulsar PROCEDER AL PAGO
    const botonProcederPago = document.querySelector('#proceedPay-button');
    if (botonProcederPago) {
        botonProcederPago.addEventListener('click', () => {
            if (carrito.length > 0) {
                let sumaTotal = 0;
                carrito.forEach(plato => { sumaTotal += plato.price * plato.cantidad; });
                
                // Pintamos los datos en el recibo
                pintarRecibo(carrito, sumaTotal);
                
                const asideCarrito = document.querySelector('#cart-container');
                const contenidoCarrito = document.querySelector('#products-container');
                
                if (asideCarrito && contenidoCarrito && recibo) {
                    // Ocultamos el contenido del carrito (título, productos, total y botón)
                    contenidoCarrito.style.display = 'none';
                    
                    // Metemos el recibo dentro del <aside> para que herede el tamaño del lateral derecho
                    asideCarrito.appendChild(recibo);
                    recibo.style.display = 'block';
                }
            } else {
                alert("El carrito está vacío. Añade algún plato antes de ver el recibo.");
            }
        });
    }

    // 3. Al pulsar PAGAR (botón negro)
    const botonPagarFinal = document.querySelector('#pay-button');
    if (botonPagarFinal) {
        botonPagarFinal.addEventListener('click', () => {
            vaciarCarrito();
            
            const asideCarrito = document.querySelector('#cart-container');
            const contenidoCarrito = document.querySelector('#products-container');
            
            if (recibo && contenedorPrincipal && contenidoCarrito && asideCarrito) {
                // Ocultamos el recibo y lo devolvemos a su sitio original en el HTML
                recibo.style.display = 'none';
                contenedorPrincipal.appendChild(recibo);
                
                // Restauramos el contenido del carrito y cerramos la barra lateral
                contenidoCarrito.style.display = 'block';
                asideCarrito.style.display = 'none';
            }
        });
    }

    // 4. Al pulsar la "X" del recibo
    const botonCerrarRecibo = document.querySelector('#close-receipt');
    if (botonCerrarRecibo) {
        botonCerrarRecibo.addEventListener('click', () => {
            const contenidoCarrito = document.querySelector('#products-container');
            
            if (recibo && contenedorPrincipal && contenidoCarrito) {
                // Ocultamos el recibo y lo devolvemos a su sitio original en el HTML
                recibo.style.display = 'none';
                contenedorPrincipal.appendChild(recibo);
                
                // Volvemos a mostrar el contenido original del carrito
                contenidoCarrito.style.display = 'block';
            }
        });
    }
});