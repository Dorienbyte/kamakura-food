 # 🍣 Kamakura Food - Menú Interactivo 

¡Bienvenido a **Kamakura Food**! Este proyecto es una aplicación web interactiva que simula la carta de un restaurante de comida japonesa. Permite a los usuarios navegar por el menú, filtrar los platos por diferentes categorías en tiempo real y, próximamente, gestionar un carrito de compras.

Proyecto desarrollado 
como parte del módulo de JavaScript en el Bootcamp de Programación Full Stack.

---

## 🚀 Características Actuales

* **Renderizado Dinámico:** Los platos se generan automáticamente en el HTML mapeando un archivo de datos (`data.js`).
* **Filtros en Tiempo Real:** Sistema de filtrado interactivo mediante botones que permite alternar entre categorías (*Ramen, Sushi, Entradas, Postres* y *Todos*) usando delegación de eventos (`addEventListener`).
* **Entorno de Desarrollo Moderno:** Configurado con **Vite** para una recarga ultra rápida en el navegador.

---

## 🛠️ Tecnologías Utilizadas

* **HTML5** - Estructura semántica de la aplicación.
* **CSS3** - Diseño y maquetación visual.
* **JavaScript - Lógica de programación y manipulación del DOM.
* **Vite** - Herramienta de construcción y entorno de desarrollo local.

---

## 📂 Estructura del Proyecto

```text
├── assets/             # Imágenes, logos e iconos del restaurante
├── styles/             # Hojas de estilo CSS (menu.css)
├── src/                # Código fuente del motor de la aplicación
│   ├── data.js         # Base de datos local con los platos del menú
│   └── menu.js         # Lógica de renderizado y filtros interactivos
├── index.html          # Vista principal de la aplicación
├── package.json        # Configuración del proyecto y dependencias de Node
├── vite.config.js      # Configuración de Vite
└── README.md           # Documentación del proyecto