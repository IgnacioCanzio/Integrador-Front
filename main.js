const productosGuardados = JSON.parse(localStorage.getItem('productos'));
const productos = productosGuardados || {
  Hamburguesas: [
    {id: 1, nombre: 'Americana', precio: 6000, imagen: 'https://images.pexels.com/photos/28902882/pexels-photo-28902882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
    {id: 2, nombre: 'Queso Azul', precio: 5500, imagen: 'https://images.pexels.com/photos/25853410/pexels-photo-25853410/free-photo-of-plato-comida-naturaleza-muerta-fotografia-de-comida.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
    {id: 3, nombre: 'Vegana', precio: 6500, imagen: 'https://images.pexels.com/photos/6546026/pexels-photo-6546026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}, 
    {id: 4, nombre: 'Big Mac', precio: 5500, imagen: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} 
  ],
  Pizzas: [
    {id: 5, nombre: 'Muzza', precio: 10000, imagen: 'https://images.pexels.com/photos/3644/pizza-restaurant-dinner-lunch.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}, 
    {id: 6, nombre: 'De Verduras', precio: 13500, imagen: 'https://images.pexels.com/photos/27363858/pexels-photo-27363858/free-photo-of-pizza-de-calabacin-de-verano.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
    {id: 7, nombre: 'Calabresa', precio: 14500, imagen: 'https://images.pexels.com/photos/4109128/pexels-photo-4109128.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}, 
    {id: 8, nombre: 'Caprese', precio: 13500, imagen: 'https://images.pexels.com/photos/13814644/pexels-photo-13814644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} 
  ],
  Papas: [
    {id: 9, nombre: 'Comunes', precio: 6000, imagen: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}, 
    {id: 10, nombre: 'Chedar y Panceta', precio: 7500, imagen: 'https://images.pexels.com/photos/16108600/pexels-photo-16108600/free-photo-of-comida-patatas-fritas-vista-de-alto-angulo-tiro-vertical.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}, 
    {id: 11, nombre: 'Huevo', precio: 6500, imagen: 'https://images.pexels.com/photos/5779569/pexels-photo-5779569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} 
  ],
  Bebidas: [
    {id: 12, nombre: 'Coca-Cola', precio: 1000, imagen: 'https://images.pexels.com/photos/2983100/pexels-photo-2983100.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
    {id: 13, nombre: 'Coca-Zero', precio: 1000, imagen: 'https://images.pexels.com/photos/10902848/pexels-photo-10902848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}, 
    {id: 14, nombre: 'Limonada', precio: 1000, imagen: 'https://images.pexels.com/photos/1289256/pexels-photo-1289256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}, 
    {id: 15, nombre: 'Cerveza', precio: 1500, imagen: 'https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} 
  ]
};

let carrito = [];


// Función para mostrar los productos
let categoriaActual = '';

export function mostrarProductos(categoria) {
  const contenedor = document.getElementById('productos');

  // Si la categoría ya está visible, la ocultamos y salimos
  if (categoriaActual === categoria) {
    contenedor.innerHTML = '';  // Limpiar productos
    categoriaActual = '';  // Reiniciar la categoría actual
    return;
  }

  // Si seleccionamos una nueva categoría, cambiamos la actual y mostramos los productos
  categoriaActual = categoria;
  contenedor.innerHTML = '';  // Limpiar productos anteriores

  // Crear un título para la categoría
  const tituloCategoria = document.createElement('h2');
  tituloCategoria.textContent = `${categoria}`;
  contenedor.appendChild(tituloCategoria);

  // Mostrar los productos de la categoría seleccionada
  productos[categoria].forEach(producto => {
    const productoDiv = document.createElement('div');
    productoDiv.classList.add('producto');

    productoDiv.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      <button onclick="window.añadirAlCarrito(${producto.id}, '${categoria}')">Añadir al carrito</button>
    `;

    contenedor.appendChild(productoDiv);
  });
}



// Función para añadir productos al carrito
function añadirAlCarrito(id, categoria) {
  const producto = productos[categoria].find(p => p.id === id);
  if (producto) {
    carrito.push(producto);
    actualizarCarrito();
  }
}

// Función para quitar productos del carrito
function quitarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

// Función para actualizar el carrito de compras
function actualizarCarrito() {
  const contenedorCarrito = document.getElementById('carrito');
  contenedorCarrito.innerHTML = '';  // Limpiar carrito anterior

  if (carrito.length === 0) {
    contenedorCarrito.innerHTML = '<p>El carrito está vacío</p>';
    localStorage.removeItem('carrito'); // Limpiar el carrito en localStorage si está vacío
    return;
  }

  carrito.forEach((producto, index) => {
    const carritoItem = document.createElement('div');
    carritoItem.innerHTML = `
      <p>${producto.nombre} - $${producto.precio}</p>
      <button onclick="quitarDelCarrito(${index})">Quitar</button>
    `;
    contenedorCarrito.appendChild(carritoItem);
  });

  // Mostrar el total
  const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
  const totalDiv = document.createElement('div');
  totalDiv.innerHTML = `<h3>Total: $${total}</h3>`;
  contenedorCarrito.appendChild(totalDiv);

  // Guardar el carrito en localStorage
  localStorage.setItem('carrito', JSON.stringify(carrito));
}


document.querySelector('.accordion').addEventListener('click', function() {
  const panel = document.getElementById('categoria-panel');
  const contenedorProductos = document.getElementById('productos');

  // Cambiar la visibilidad del panel
  if (panel.style.display === "none" || panel.style.display === "") {
    panel.style.display = "block"; // Mostrar el panel
  } else {
    panel.style.display = "none";  // Ocultar el panel
    contenedorProductos.innerHTML = '';  // Ocultar los productos
  }
});

// Hacer accesibles las funciones globalmente
window.mostrarProductos = mostrarProductos;
window.añadirAlCarrito = añadirAlCarrito;
window.quitarDelCarrito = quitarDelCarrito;

// Función para buscar productos
export function buscarProductos() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const contenedor = document.getElementById('productos');
  contenedor.innerHTML = '';  // Limpiar productos anteriores

  let productosEncontrados = false;  // Para rastrear si se encontraron productos

  // Verificar si el query es una categoría
  Object.keys(productos).forEach(categoria => {
    if (categoria.toLowerCase().includes(query)) {
      // Si coincide con una categoría, mostrar todos los productos de esa categoría
      productos[categoria].forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');
        productoDiv.innerHTML = `
          <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
          <h3>${producto.nombre}</h3>
          <p>Precio: $${producto.precio}</p>
          <button onclick="window.añadirAlCarrito(${producto.id}, '${categoria}')">Añadir al carrito</button>
        `;
        contenedor.appendChild(productoDiv);
      });
      productosEncontrados = true;
    } else {
      // Si no coincide con una categoría, buscar por nombre de producto
      productos[categoria].forEach(producto => {
        if (producto.nombre.toLowerCase().includes(query)) {
          const productoDiv = document.createElement('div');
          productoDiv.classList.add('producto');
          productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button onclick="window.añadirAlCarrito(${producto.id}, '${categoria}')">Añadir al carrito</button>
          `;
          contenedor.appendChild(productoDiv);
          productosEncontrados = true;
        }
      });
    }
  });

  // Si no se encontraron productos ni categorías
  if (!productosEncontrados) {
    contenedor.innerHTML = '<p>No se encontraron productos</p>';
  }
}

// Hacer accesible la función de búsqueda globalmente
window.buscarProductos = buscarProductos;

function abrirModal() {
  document.getElementById("modal").style.display = "block";
}

function cerrarModal() {
  document.getElementById("modal").style.display = "none";
  // Limpiar el formulario
  document.getElementById("nombre").value = '';
  document.getElementById("precio").value = '';
  document.getElementById("imagen").value = '';
  document.getElementById("categoria").value = '';
}

function agregarProducto(event) {
  event.preventDefault(); // Evitar el envío del formulario

  const nombre = document.getElementById("nombre").value;
  const precio = parseFloat(document.getElementById("precio").value);
  const imagen = document.getElementById("imagen").value;
  const categoria = document.getElementById("categoria").value;

  // Crear un nuevo objeto producto
  const nuevoProducto = {
    id: Date.now(),
    nombre,
    precio,
    imagen
  };

  // Agregar el nuevo producto a la categoría correspondiente
  productos[categoria].push(nuevoProducto);

  // Actualizar el localStorage
  localStorage.setItem('productos', JSON.stringify(productos));

  // Cerrar el modal
  cerrarModal();

  // Mostrar los productos nuevamente para reflejar el cambio
  mostrarProductos(categoria);
}

//Eliminar productos del localstorage

function eliminarProductoPorNombre(categoria, nombreProducto) {
  // Obtener los productos de localStorage
  const productosGuardados = JSON.parse(localStorage.getItem('productos'));

  // Buscar la categoría y filtrar los productos que no coincidan con el nombre
  if (productosGuardados && productosGuardados[categoria]) {
    productosGuardados[categoria] = productosGuardados[categoria].filter(producto => producto.nombre !== nombreProducto);

    // Guardar los productos actualizados en localStorage
    localStorage.setItem('productos', JSON.stringify(productosGuardados));

    // Refrescar los productos en la página
    mostrarProductos(categoria);
  }
}


// Hacer accesibles las funciones globalmente
window.abrirModal = abrirModal;
window.cerrarModal = cerrarModal;
window.agregarProducto = agregarProducto;

window.onload = function() {
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    actualizarCarrito();  // Mostrar los productos guardados en el carrito
  }
};

