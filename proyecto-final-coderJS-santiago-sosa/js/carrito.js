let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const  contendorTotal= document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");


function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0){

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(productosArray => {
            
            
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `<img class="img-carrito" src="${productosArray.imagen}" alt="${productosArray.titulo}">
            <div class="carrito-producto-titulo">
                <small>título</small>
                <h3>${productosArray.titulo}</h3>
            </div>
            <div class="carrito-producto-cantidad">
                <small>Cantidad</small>
                <p>${productosArray.cantidad}</p>
            </div>
            <div class="carrito-producto-precio">
                <small>Precio</small>
                <p>${productosArray.precio}</p>
            </div>
            <div class="carrito-producto-subtotal">
                <small>Subtotal</small>
                <p>${productosArray.precio * productosArray.cantidad}</p>
            </div>
            <button id="${productosArray.id}" class="carrito-producto-eliminar">
                <i class="bi bi-trash-fill"></i>
            </button>
            `;
    
            contenedorCarritoProductos.append(div);
        })
    
    
    }else{
    
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
    }

    actualizarBotonesEliminar();
    actualizarTotal();

}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", EliminarDelCarrito);
    });
}

function EliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoEliminado = productosEnCarrito.find(producto => producto.id === idBoton);
    const index = productosEnCarrito.findIndex(producto => producto.id ===idBoton);

    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
    



    Swal.fire({
        title: '<strong>¿Estas seguro?</strong>',
        icon: 'question',
        html:
        '<b>Se borraran todos los productos del carrito.</b> ',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
        '<i class="fa fa-thumbs-up">Si</i>',
        cancelButtonText:
        '<i class="fa fa-thumbs-down">No</i>',
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
        Swal.fire('Tus productos fueron borrados correctamente.', '', 'info')
        } else if (result.isDenied) {
        Swal.fire('Puedes seguir comprando.', '', 'info')
        }
    })


    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
}

function actualizarTotal() {
    const totalCalculado =  productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}
    

botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {

    Swal.fire(
        '¡Felicitaciones!',
        'tu compra se ha realizado correctamente, muchas gracias!',
        'success'
    )
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
}