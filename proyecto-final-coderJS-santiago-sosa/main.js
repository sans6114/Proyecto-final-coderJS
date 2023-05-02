let productosArray = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productosArray = data;
        cargarProductos(productosArray);
    })



    const contenedorProductos = document.querySelector("#contenedor-productos");
    const botonesCategorias = document.querySelectorAll(".boton-categoria");
    const tituloPrincipal = document.querySelector("#titulo-principal");
    let botonesAgregar = document.querySelectorAll(".producto-precio");
    const numerito = document.querySelector("#numerito");
    
    function cargarProductos(productosElegidos) {
    
        contenedorProductos.innerHTML = "";
    
        productosElegidos.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("producto");
            div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                        <div class="producto-detalles">
                            <h3 class="producto-titulo">
                                ${producto.titulo}
                            </h3>
                            <p>$${producto.precio}</p>
                            <button class="producto-precio" id="${producto.id}">
                                Agregar al carrito
                            </button>
                        </div>
        `;
    
            contenedorProductos.append(div);
        })
    
        actualizarBotonesAgregar();
        
    }
    
    cargarProductos(productosArray);
    
    botonesCategorias.forEach(boton => {
        boton.addEventListener("click", (e) => {
    
            botonesCategorias.forEach(boton => boton.classList.remove("active"));
            e.currentTarget.classList.add("active");
            if (e.currentTarget.id != "todos") {
                const productoCategoria = productosArray.find(productosArray => productosArray.categoria.id === e.currentTarget.id);
                tituloPrincipal.innerText = productoCategoria.categoria.nombre;
    
                const productosBoton = productosArray.filter(productosArray => productosArray.categoria.id === e.currentTarget.id);
                cargarProductos(productosBoton);
            } else {
                tituloPrincipal.innerText = "Todos los productos";
                cargarProductos(productosArray);
            }
        });
    });
    
    
    function actualizarBotonesAgregar() {
        botonesAgregar = document.querySelectorAll(".producto-precio");
    
        botonesAgregar.forEach(boton => {
            boton.addEventListener("click", agregarAlCarrito);
        });
    }
    
    let productosEnCarrito;
    
    let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
    
    
    if(productosEnCarritoLS) {
        productosEnCarrito = JSON.parse(productosEnCarritoLS);
        actualizarNumerito();
    } else {
        productosEnCarrito = [];
    }
    
    
    function agregarAlCarrito(e) {
    
        const idBoton = e.currentTarget.id;
        const productoAgregado = productosArray.find(producto => producto.id === idBoton);
    
    
        if(productosEnCarrito.some(productosArray => productosArray.id === idBoton)){
            const index = productosEnCarrito.findIndex(productosArray => productosArray.id === idBoton);
            productosEnCarrito[index].cantidad++;
        }else {
            productoAgregado.cantidad = 1;
            productosEnCarrito.push(productoAgregado);
        }
    
        actualizarNumerito();
    
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    };
    
    function actualizarNumerito(){
        let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
        numerito.innerText = nuevoNumerito;
    }