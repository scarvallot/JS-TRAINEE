// PROYECTO MÓDULO 3 - CARRITO DE COMPRAS EN CONSOLA


// INVENTARIO DE PRODUCTOS (arreglo de objetos) 
const inventario = [
    { id: 100, nombre: 'Mantequilla', precio: 2490 },
    { id: 200, nombre: 'Leche', precio: 1090 },
    { id: 300, nombre: 'Salsa de Tomate', precio: 2950 },
    { id: 400, nombre: 'Azúcar', precio: 1190 },
    { id: 500, nombre: 'Arroz', precio: 1190 },
    { id: 600, nombre: 'Atún', precio: 1350 }
];

// CARRITO DE COMPRAS (arreglo de objetos con cantidad) 
let carrito = [];

// FUNCIONES AUXILIARES

// Mostrar inventario disponible
function mostrarInventario() {
    console.log('--- INVENTARIO DISPONIBLE ---');
    inventario.forEach(p => {console.log(`${p.id}. ${p.nombre} - $${p.precio}`);});
}

// Mostrar el contenido actual del carrito
function mostrarCarrito() {
    if (carrito.length === 0) {
        alert('El carrito está vacío.');
        return;
    }
    let mensaje = '--- CARRITO ACTUAL ---\n';
    let total = 0;
    carrito.forEach((item, index) => {
        const subtotal = item.cantidad * item.precio;
        mensaje += `${index + 1}. ${item.nombre} x${item.cantidad} = $${subtotal}\n`;
        total += subtotal;
    });
    mensaje += `\nTOTAL SIN DESCUENTO: $${total}`;
    alert(mensaje);
}

// Buscar producto en el inventario por ID
function buscarProducto(id) {
    return inventario.find(p => p.id === id);
}

// Validar que la cantidad sea un número positivo
function validarCantidad(cantidad) {
    const num = Number(cantidad);
    return Number.isInteger(num) && num > 0;
}

// FUNCIONES PRINCIPALES DEL CARRITO 

// Agregar producto al carrito
function agregarAlCarrito() {
    mostrarInventario();
    const idInput = prompt('Ingresa el ID del producto que deseas agregar:');
    const id = Number(idInput);
    if (isNaN(id) || !Number.isInteger(id)) {
        alert('ID inválido. Debe ser un número entero.');
        return;
    }

    const producto = buscarProducto(id);
    if (!producto) {
        alert('Producto no encontrado.');
        return;
    }

    const cantInput = prompt(`¿Cuántas unidades de "${producto.nombre}" deseas agregar?`);
    if (!validarCantidad(cantInput)) {
        alert('Cantidad inválida. Debe ser un número entero positivo.');
        return;
    }
    const cantidad = Number(cantInput);

    // Verificar si el producto ya está en el carrito
    const existente = carrito.find(item => item.id === id);
    if (existente) {
        existente.cantidad += cantidad;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: cantidad
        });
    }
    alert(`Agregado: ${cantidad} x "${producto.nombre}" al carrito.`);
}

// Quitar producto del carrito (reducir cantidad o eliminar)
function quitarDelCarrito() {
    if (carrito.length === 0) {
        alert('El carrito está vacío. No hay productos para quitar.');
        return;
    }

    mostrarCarrito(); // mostramos el carrito con índices
    const indexInput = prompt('Ingresa el número del producto que deseas quitar (según la lista):');
    const index = Number(indexInput);
    if (isNaN(index) || !Number.isInteger(index) || index < 1 || index > carrito.length) {
        alert('Número inválido.');
        return;
    }

    const item = carrito[index - 1];
    const cantInput = prompt(`¿Cuántas unidades de "${item.nombre}" deseas quitar? (Máx: ${item.cantidad})`);
    if (!validarCantidad(cantInput)) {
        alert('Cantidad inválida.');
        return;
    }
    const cantidad = Number(cantInput);

    if (cantidad > item.cantidad) {
        alert(`No puedes quitar más de ${item.cantidad} unidades.`);
        return;
    }

    if (cantidad === item.cantidad) {
        carrito.splice(index - 1, 1);
        alert(`Eliminado completamente: "${item.nombre}".`);
    } else {
        item.cantidad -= cantidad;
        alert(`Quitado: ${cantidad} x "${item.nombre}". Quedan ${item.cantidad} en el carrito.`);
    }
}

// Calcular total con descuento (función auxiliar)
function calcularTotalConDescuento(porcentaje) {
    if (carrito.length === 0) {
        alert('El carrito está vacío. No hay total que calcular.');
        return null;
    }
    let totalSinDescuento = 0;
    carrito.forEach(item => {
        totalSinDescuento += item.cantidad * item.precio;
    });

    let descuento = (porcentaje / 100) * totalSinDescuento;
    let totalConDescuento = totalSinDescuento - descuento;
    return {
        totalSinDescuento,
        descuento,
        totalConDescuento
    };
}

// Aplicar descuento (función principal)
function aplicarDescuento() {
    if (carrito.length === 0) {
        alert('El carrito está vacío. No se puede aplicar descuento.');
        return;
    }

    const porcentajeInput = prompt('Ingresa el porcentaje de descuento (ej: 10 para 10%):');
    const porcentaje = Number(porcentajeInput);
    if (isNaN(porcentaje) || porcentaje < 0 || porcentaje > 100) {
        alert('Porcentaje inválido. Debe ser un número entre 0 y 100.');
        return;
    }

    const resultado = calcularTotalConDescuento(porcentaje);
    if (!resultado) return;

    alert(
        `RESUMEN DE COMPRA\n` +
        `Total sin descuento: $${resultado.totalSinDescuento}\n` +
        `Descuento (${porcentaje}%): -$${resultado.descuento.toFixed(0)}\n` +
        `Total a pagar: $${resultado.totalConDescuento.toFixed(0)}`
    );
}

// Vaciar todo el carrito
function vaciarCarrito() {
    if (carrito.length === 0) {
        alert('El carrito ya está vacío.');
        return;
    }
    const confirmar = confirm('¿Estás seguro de vaciar todo el carrito?');
    if (confirmar) {
        carrito = [];
        alert('Carrito vaciado correctamente.');
    }
}

// Mostrar el menú principal
function mostrarMenu() {
    let opcion;
    do {
        opcion = prompt(
            `=== CARRITO DE COMPRAS ===\n` +
            `1. Ver inventario\n` +
            `2. Ver carrito\n` +
            `3. Agregar producto\n` +
            `4. Quitar producto\n` +
            `5. Aplicar descuento\n` +
            `6. Vaciar carrito\n` +
            `7. Salir\n` +
            `Elige una opción (1-7):`
        );

        switch (opcion) {
            case '1':
                mostrarInventario();
                break;
            case '2':
                mostrarCarrito();
                break;
            case '3':
                agregarAlCarrito();
                break;
            case '4':
                quitarDelCarrito();
                break;
            case '5':
                aplicarDescuento();
                break;
            case '6':
                vaciarCarrito();
                break;
            case '7':
                alert('¡Hasta luego! Gracias por usar el carrito de compras.');
                break;
            default:
                alert('Opción no válida. Por favor elige un número del 1 al 7.');
        }
    } while (opcion !== '7');
}

//  INICIO DE LA APLICACIÓN ----------
console.log('INICIANDO CARRITO DE COMPRAS');
mostrarMenu();