 // PROYECTO MODULO 3 - CARRITO DE COMPRAS EN CONSOLA

// Arreglo de productos disponibles, cada uno con metodo precioPorKilo
const inventario = [
    { id: 100, nombre: 'Mantequilla', precio: 2490, peso: 0.25, precioPorKilo() { return this.precio / this.peso; } }, // 250 g
    { id: 200, nombre: 'Leche', precio: 1090, peso: 1, precioPorKilo() { return this.precio / this.peso; } }, // 1 litro
    { id: 300, nombre: 'Salsa de Tomate', precio: 2950, peso: 0.75, precioPorKilo() { return this.precio / this.peso; } }, // 750 g
    { id: 400, nombre: 'Azúcar', precio: 1190, peso: 1, precioPorKilo() { return this.precio / this.peso; } }, // 1 kg
    { id: 500, nombre: 'Arroz', precio: 1190, peso: 1, precioPorKilo() { return this.precio / this.peso; } }, // 1 kg
    { id: 600, nombre: 'Atún', precio: 1350, peso: 0.5, precioPorKilo() { return this.precio / this.peso; } } // 500 g
];

let carrito = []; // Arreglo que almacena los productos agregados por el usuario

// Imprime el inventario con precio y precio por kilo
function mostrarInventario() {
    console.log('--- INVENTARIO DISPONIBLE ---');
    for (let i = 0; i < inventario.length; i++) { // Recorre cada producto del inventario
        const p = inventario[i]; // Producto actual
        console.log(`${p.id}. ${p.nombre} - $${p.precio} ($${p.precioPorKilo().toFixed(0)}/kg)`); // Muestra datos y precio por kilo
    }
}

// Imprime el carrito actual con subtotales y total
function mostrarCarrito() {
    // Sale si no hay productos
    if (carrito.length === 0) { 
        alert('El carrito está vacío.'); 
        return; 
    } 
    let mensaje = '--- CARRITO ACTUAL ---\n'; 
    let total = 0; // Acumulador del total
    // Recorre cada item del carrito
    for (let i = 0; i < carrito.length; i++) { 
        const item = carrito[i]; // Item actual
        const subtotal = item.cantidad * item.precio; // Calcula subtotal del item
        mensaje += `${i + 1}. ${item.nombre} x${item.cantidad} = $${subtotal}\n`; // Agrega linea al mensaje
        total += subtotal; // Suma al total general
    }
    mensaje += `\nTOTAL SIN DESCUENTO: $${total}`; 
    alert(mensaje); // Muestra el resumen completo
}

// Busca un producto en el inventario por su id
function buscarProducto(id) {
    return inventario.find(p => p.id === id); // Retorna el producto o undefined
}

// Valida que la cantidad ingresada sea un entero positivo
function validarCantidad(cantidad) {
    const num = Number(cantidad); // Convierte el input a numero
    return Number.isInteger(num) && num > 0; // True solo si es entero mayor a 0
}

// Agrega un producto al carrito segun el id ingresado
function agregarAlCarrito() {
    mostrarInventario(); // Muestra opciones disponibles antes de pedir el id
    const idInput = prompt('Ingresa el ID del producto que deseas agregar:'); 
    // Valida id
    const id = Number(idInput); 
    if (isNaN(id) || !Number.isInteger(id)) { 
        alert('ID inválido. Debe ser un número entero.'); 
        return; 
    } 

    const producto = buscarProducto(id); // Busca el producto en el inventario
    // Sale si no existe
    if (!producto) { 
        alert('Producto no encontrado.'); 
        return; 
    } 

    const cantInput = prompt(`¿Cuántas unidades de "${producto.nombre}" deseas agregar?`);
    // Valida cantidad
    if (!validarCantidad(cantInput)) { 
        alert('Cantidad inválida. Debe ser un número entero positivo.'); 
        return; } 
    const cantidad = Number(cantInput); // Convierte la cantidad a numero
        
    const existente = carrito.find(item => item.id === id); // Busca si el producto ya esta en el carrito
    if (existente) {
        existente.cantidad += cantidad; // Si ya existe, suma la nueva cantidad
    } else {
        carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: cantidad }); // Si no existe, lo agrega nuevo
    }
    alert(`Agregado: ${cantidad} x "${producto.nombre}" al carrito.`); // Confirma la operacion
}

// Quita o reduce la cantidad de un producto del carrito
function quitarDelCarrito() {
    // Sale si esta vacio
    if (carrito.length === 0) { 
        alert('El carrito está vacío. No hay productos para quitar.'); 
        return; 
    } 

    mostrarCarrito(); // Muestra el carrito con indices numerados
    const indexInput = prompt('Ingresa el número del producto que deseas quitar (según la lista):'); 
    const index = Number(indexInput);
    // Valida el indice
    if (isNaN(index) || !Number.isInteger(index) || index < 1 || index > carrito.length) { 
        alert('Número inválido.'); 
        return; } 

    const item = carrito[index - 1]; // Obtiene el item seleccionado
    const cantInput = prompt(`¿Cuántas unidades de "${item.nombre}" deseas quitar? (Máx: ${item.cantidad})`); 
    // Valida cantidad
    if (!validarCantidad(cantInput)) { 
        alert('Cantidad inválida.'); 
        return; 
    } 
    const cantidad = Number(cantInput); // Convierte la cantidad a numero
    // Valida que no exceda lo disponible
    if (cantidad > item.cantidad) { 
        alert(`No puedes quitar más de ${item.cantidad} unidades.`); 
        return; 
    } 

    if (cantidad === item.cantidad) {
        carrito.splice(index - 1, 1); // Elimina el producto completo del carrito
        alert(`Eliminado completamente: "${item.nombre}".`); // Confirma eliminacion total
    } else {
        item.cantidad -= cantidad; // Resta la cantidad indicada
        alert(`Quitado: ${cantidad} x "${item.nombre}". Quedan ${item.cantidad} en el carrito.`); // Confirma reduccion parcial
    }
}

// Calcula el total del carrito aplicando un porcentaje de descuento
function calcularTotalConDescuento(porcentaje) {
    if (carrito.length === 0) { alert('El carrito está vacío. No hay total que calcular.'); return null; } // Sale si esta vacio
    let totalSinDescuento = 0; // Acumulador del total bruto
    for (let i = 0; i < carrito.length; i++) { // Recorre cada item del carrito
        totalSinDescuento += carrito[i].cantidad * carrito[i].precio; // Suma el subtotal de cada item
    }
    const descuento = (porcentaje / 100) * totalSinDescuento; // Calcula el monto del descuento
    const totalConDescuento = totalSinDescuento - descuento; // Resta el descuento al total bruto
    return { totalSinDescuento, descuento, totalConDescuento }; // Retorna los tres valores
}

// Pide el porcentaje de descuento y muestra el resumen final
function aplicarDescuento() {
    if (carrito.length === 0) { alert('El carrito está vacío. No se puede aplicar descuento.'); return; } // Sale si esta vacio

    const porcentajeInput = prompt('Ingresa el porcentaje de descuento (ej: 10 para 10%):'); // Pide el porcentaje
    const porcentaje = Number(porcentajeInput); // Convierte a numero
    // Valida rango
    if (isNaN(porcentaje) || porcentaje < 0 || porcentaje > 100) { 
        alert('Porcentaje inválido. Debe ser un número entre 0 y 100.'); 
        return; 
    } 

    const resultado = calcularTotalConDescuento(porcentaje); // Calcula los totales con descuento
    // Sale si no hubo resultado
    if (!resultado) 
        return; 

    alert(`RESUMEN DE COMPRA\nTotal sin descuento: $${resultado.totalSinDescuento}\nDescuento (${porcentaje}%): -$${resultado.descuento.toFixed(0)}\nTotal a pagar: $${resultado.totalConDescuento.toFixed(0)}`); // Muestra el resumen
}

// Vacia completamente el carrito tras confirmacion del usuario
function vaciarCarrito() {
    // Sale si ya esta vacio
    if (carrito.length === 0) { 
        alert('El carrito ya está vacío.'); 
        return; 
    } 
    const confirmar = confirm('¿Estás seguro de vaciar todo el carrito?'); 
    if (confirmar) { carrito = []; alert('Carrito vaciado correctamente.'); } // Vacia el arreglo si confirma
}

// Muestra el menu principal y deriva a cada opcion
function mostrarMenu() {
    let opcion; // Almacena la opcion elegida por el usuario
    do {
        opcion = prompt(`=== CARRITO DE COMPRAS ===\n1. Ver inventario\n2. Ver carrito\n3. Agregar producto\n4. Quitar producto\n5. Aplicar descuento\n6. Vaciar carrito\n7. Salir\nElige una opción (1-7):`); // Muestra el menu y captura la opcion

        switch (opcion) {
          case "1":
            mostrarInventario();
            break; // Llama a mostrar inventario
          case "2":
            mostrarCarrito();
            break; // Llama a mostrar carrito
          case "3":
            agregarAlCarrito();
            break; // Llama a agregar producto
          case "4":
            quitarDelCarrito();
            break; // Llama a quitar producto
          case "5":
            aplicarDescuento();
            break; // Llama a aplicar descuento
          case "6":
            vaciarCarrito();
            break; // Llama a vaciar carrito
          case "7":
            alert("¡Hasta luego! Gracias por usar el carrito de compras.");
            break; // Mensaje de salida
          default:
            alert("Opción no válida. Por favor elige un número del 1 al 7."); // Mensaje si la opcion no existe
        }
    } while (opcion !== '7'); // Repite el menu hasta que el usuario elija salir
}

console.log('INICIANDO CARRITO DE COMPRAS'); // Mensaje inicial en consola
mostrarMenu(); // Arranca la aplicacion