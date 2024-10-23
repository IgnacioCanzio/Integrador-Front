// Muestra el modal para agregar un nuevo producto
document.getElementById('addProductBtn').addEventListener('click', function() {
    document.getElementById('addProductModal').style.display = 'block';
  });
  
  // Maneja la lógica para agregar un nuevo producto
  document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional
  
    const nombre = document.getElementById('productName').value;
    const precio = parseFloat(document.getElementById('productPrice').value);
    const imagen = document.getElementById('productImage').value;
    const categoria = document.getElementById('productCategory').value;
  
    // Crea un nuevo producto
    const nuevoProducto = { id: Date.now(), nombre, precio, imagen };
  
    // Agrega el nuevo producto a la categoría correspondiente
    if (!productos[categoria]) {
      productos[categoria] = [];
    }
    productos[categoria].push(nuevoProducto);
  
    // Resetea el formulario y oculta el modal
    this.reset();
    cerrarModal();
  
    // Opcional: Muestra los productos de la categoría seleccionada
    mostrarProductos(categoria);
  });
  
  // Función para cerrar el modal
  function cerrarModal() {
    document.getElementById('addProductModal').style.display = 'none';
  }
  
  // Cerrar el modal si se hace clic fuera de él
  window.onclick = function(event) {
    const modal = document.getElementById('addProductModal');
    if (event.target === modal) {
      cerrarModal();
    }
  };
  