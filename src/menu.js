import { filters, products } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const contenedorFiltros = document.querySelector('#filters');
    const contenedorProductos = document.querySelector('#products');

    filters.forEach(categoria => {
        const boton = document.createElement('button');
        boton.classList.add('filter');
        boton.setAttribute('data-category', categoria);
        
        if (categoria === 'todos') {
            boton.textContent = 'Todos';
        } else {
            boton.textContent = categoria.charAt(0).toUpperCase() + categoria.slice(1);
        }
        contenedorFiltros.appendChild(boton); 
    });

    function pintarPlatos(listaDePlatos) {
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

    pintarPlatos(products);
});