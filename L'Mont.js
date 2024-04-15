/* Script L'Mont.js */

let carrito = [];

function agregarAlCarrito(nombre, precio) {
  let encontrado = false;
  carrito.forEach(producto => {
    if (producto.nombre === nombre) {
      producto.cantidad++;
      encontrado = true;
    }
  });

  if (!encontrado) {
    carrito.push({ nombre, precio, cantidad: 1 });
  }

  mostrarCarrito();

  const boton = document.querySelector('.boton-verde');
  boton.classList.add('animacion-agregar');
  setTimeout(() => {
    boton.classList.remove('animacion-agregar');
  }, 500);
}

function mostrarCarrito() {
  const listaCarrito = document.getElementById('lista-carrito');
  listaCarrito.innerHTML = '';
  let total = 0;
  let mensajeWhatsApp = "Hola, quiero ordenar los siguientes productos: ";

  carrito.forEach((producto, index) => {
    const li = document.createElement('li');
    li.textContent = `${producto.nombre} - Precio: $${producto.precio} (${producto.cantidad})`;
    listaCarrito.appendChild(li);

    const botonQuitar = document.createElement('button');
    botonQuitar.textContent = 'Quitar';
    botonQuitar.className = 'boton-quitar'; // Añadir clase para estilos CSS
    botonQuitar.addEventListener('click', () => quitarDelCarrito(index));
    li.appendChild(botonQuitar);

    total += producto.precio * producto.cantidad;

    // Agregar al mensaje de WhatsApp
    mensajeWhatsApp += `${producto.nombre} (${producto.cantidad}), `;
  });

  const totalElement = document.getElementById('total');
  totalElement.textContent = `Total: $${total}`;

  const carritoElement = document.getElementById('carrito');
  if (carrito.length > 0) {
    carritoElement.classList.add('carrito-lleno');
  } else {
    carritoElement.classList.remove('carrito-lleno');
  }

  // Agregar enlace de WhatsApp con mensaje dinámico
  const enlaceWhatsApp = document.querySelector('.boton-verde');
  enlaceWhatsApp.href = `https://api.whatsapp.com/send?phone=TU_NUMERO&text=${encodeURIComponent(mensajeWhatsApp)}`;
}

function quitarDelCarrito(index) {
    if (carrito[index].cantidad === 1) {
      carrito.splice(index, 1); // Si hay solo una unidad, elimina el producto del carrito
    } else {
      carrito[index].cantidad--; // Si hay más de una unidad, decrementa la cantidad
    }
    mostrarCarrito();
  }

function vaciarCarrito() {
  carrito = [];
  mostrarCarrito();
}

function mostrarContacto() {
  document.getElementById("contactoDropdown").classList.toggle("show");
}

// Cerrar el menú desplegable si el usuario hace clic fuera de él
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
