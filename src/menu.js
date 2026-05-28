import { filters, products } from './data.js';

export function pintarPlatos(listaDePlatos) {
    const contenedorProductos = document.querySelector('#products');
    contenedorProductos.innerHTML = '';

    listaDePlatos.forEach(plato => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('product-container');
        tarjeta.innerHTML = `
            <h3>${plato.name}</h3>
            <p>${plato.description}</p>
            <div class="price-container">
                <h5>${plato.price} €</h5>
                <button class="add-button" data-id="${plato.id}">Añadir</button>
            </div>
        `;
        contenedorProductos.appendChild(tarjeta);
    });
}

export function crearBotonesFiltros() {
    const contenedorFiltros = document.querySelector('#filters');
    
    filters.forEach(categoria => {
        const boton = document.createElement('button');
        const categoriaLimpia = categoria.trim();
        boton.classList.add('filter');
        boton.setAttribute('data-category', categoriaLimpia);

        if (categoriaLimpia === 'todos') {
            boton.textContent = 'Todos';
        } else {
            boton.textContent = categoriaLimpia.charAt(0).toUpperCase() + categoriaLimpia.slice(1);
        }
        contenedorFiltros.appendChild(boton);
    });
}