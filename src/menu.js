import { products } from './data.js';

const productsContainer = document.getElementById('products');

function printMenu(menuList) {
    // Limpiamos el contenedor
    productsContainer.innerHTML = '';
    
    // Recorremos la lista de platos
    menuList.forEach((product) => {
        productsContainer.innerHTML += `
            <div class="product-container">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="price-container">
                    <h5>${product.price.toFixed(2)} €</h5>
                    <button class="add-button" data-id="${product.id}">Añadir</button>
                </div>
            </div>
        `;
    });
}

// Ejecutamos la función para pintar los platos por primera vez
printMenu(products);

// =========================================================
// NUEVO CÓDIGO: LOS FILTROS (¡Lo que nos faltaba pegar!)
// =========================================================

// 1. Apuntamos a la caja de los botones en el HTML
const filtersContainer = document.getElementById('filters');

// 2. Creamos el colador
function filterProducts(category) {
    // Ponemos el chivato para ver qué categoría llega
    console.log("Has pulsado la categoría:", category);

    if (category === 'all') {
        printMenu(products);
        return;
    }

    const filteredList = products.filter(product => product.category === category);
    printMenu(filteredList);
}

// 3. Conectamos el cable detector de clics
filtersContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('filter')) {
        const selectedCategory = event.target.getAttribute('data-category');
        filterProducts(selectedCategory);
    }
});