/* 5. Conceptos básicos de objetos en JavaScript (Lección #5)
Objetivo: Utilizar objetos para organizar datos de manera
estructurada.
•Tareas a desarrollar:
o Crear un objeto con propiedades y valores.
o Implementar métodos dentro de un objeto.
o Usar un arreglo de objetos y recorrerlo con map() o
forEach().
*/

// INVENTARIO DE PRODUCTOS (arreglo de objetos) 
/* 
const inventario = [                                        // Declara un arreglo constante con objetos.
    { id: 100, nombre: 'Mantequilla', precio: 2490 },       // Producto 1: Mantequilla.
    { id: 200, nombre: 'Leche', precio: 1090 },             // Producto 2: Leche.
    { id: 300, nombre: 'Salsa de Tomate', precio: 2950 },   // Producto 3: Salsa de Tomate.
    { id: 400, nombre: 'Azúcar', precio: 1190 },            // Producto 4: Azúcar.
    { id: 500, nombre: 'Arroz', precio: 1190 },             // Producto 5: Arroz.
    { id: 600, nombre: 'Atún', precio: 1350 }               // Producto 6: Atún.
]; 
*/

// ===== INVENTARIO (cada producto con método precioPorKilo) =====
const inventario = [                                         // Declara un arreglo constante con objetos.
    {                                                         // Producto 1: Mantequilla.
        id: 100,
        nombre: 'Mantequilla',
        precio: 2490,
        peso: 0.25,                                          // 250 gramos.
        precioPorKilo() {                                    // Método propio.
            return this.precio / this.peso;                  // Calcula precio por kg.
        }
    },
    {                                                         // Producto 2: Leche.
        id: 200,
        nombre: 'Leche',
        precio: 1090,
        peso: 1,                                             
        precioPorKilo() {
            return this.precio / this.peso;
        }
    },
    {                                                         // Producto 3: Salsa de Tomate.
        id: 300,
        nombre: 'Salsa de Tomate',
        precio: 2950,
        peso: 0.75,                                          
        precioPorKilo() {
            return this.precio / this.peso;
        }
    },
    {                                                         // Producto 4: Azúcar.
        id: 400,
        nombre: 'Azúcar',
        precio: 1190,
        peso: 1,                                             
        precioPorKilo() {
            return this.precio / this.peso;
        }
    },
    {                                                         // Producto 5: Arroz.
        id: 500,
        nombre: 'Arroz',
        precio: 1190,
        peso: 1,                                             
        precioPorKilo() {
            return this.precio / this.peso;
        }
    },
    {                                                         // Producto 6: Atún.
        id: 600,
        nombre: 'Atún',
        precio: 1350,
        peso: 0.5,                                           
        precioPorKilo() {
            return this.precio / this.peso;
        }
    }
];

//  CARRITO (arreglo global) 
let carrito = [];                                            // Arreglo vacío para almacenar productos.

//  MOSTRAR INVENTARIO (con precio por kilo) 
function mostrarInventario() {                               // Define la función para mostrar el inventario.
    console.log('--- INVENTARIO DISPONIBLE ---');            // Imprime encabezado.
    inventario.forEach(p => {                                // Itera cada producto.
        let precioPorKilo = p.precioPorKilo();               // Llama al método del objeto.
        console.log(`${p.id}. ${p.nombre} - $${p.precio} ($${precioPorKilo.toFixed(0)}/kg)`); 
        // Muestra ID, nombre, precio y precio por kilo (sin decimales).
    });
}

//  VER CARRITO (READ) 
function verCarrito() {
    if (!carrito.length) 
        return alert('Carrito vacío.');    

    let msg = '--- CARRITO ---\n';                         
    let total = 0;                                           // Acumulador del total.
    carrito.forEach((item, i) => {                           // Recorre cada producto en el carrito.
        let sub = item.cantidad * item.precio;               
        msg += `${i+1}. ${item.nombre} x${item.cantidad} = $${sub}\n`; 
        total += sub;                                        // Suma al total.
    });
    alert(msg + `\nTOTAL: $${total}`);                      
}

//  AGREGAR PRODUCTO (CREATE) 
function agregar() {
    mostrarInventario();                                     // Muestra el inventario para elegir.
    let id = Number(prompt('ID del producto:'));             // Pide ID.

    // Valida que el ID sea número entero y esté en el rango 100-600.
    if (isNaN(id) || !Number.isInteger(id) || id < 100 || id > 600) 
        return alert('ID inválido (100-600).');

    let prod = inventario.find(p => p.id === id);            // Busca el producto por ID.
    if (!prod) 
        return alert('Producto no existe.');   

    let cant = Number(prompt(`Cantidad de "${prod.nombre}":`)); // Pide cantidad.
    if (!Number.isInteger(cant) || cant <= 0) 
        return alert('Cantidad inválida.'); 
    let existente = carrito.find(item => item.nombre === prod.nombre); // Busca en carrito.
    if (existente) {
        existente.cantidad += cant;                          // Si ya existe, suma cantidad.
    } else {
        carrito.push({ nombre: prod.nombre, precio: prod.precio, cantidad: cant }); 
    }
    alert(`Agregado: ${cant} x "${prod.nombre}"`);          
}

//  ACTUALIZAR CANTIDAD (UPDATE) 
function actualizar() {
    if (!carrito.length) 
        return alert('Carrito vacío.');     
    verCarrito();                                            // Muestra carrito actual.
    let idx = Number(prompt('Número del producto a actualizar:')); 
    if (isNaN(idx) || !Number.isInteger(idx) || idx < 1 || idx > carrito.length) 
        return alert('Número inválido.');                    // Valida índice.

    let item = carrito[idx-1];                               
    let nuevaCant = Number(prompt(`Nueva cantidad para "${item.nombre}" (actual: ${item.cantidad}):`));
    if (!Number.isInteger(nuevaCant) || nuevaCant <= 0)
        return alert('Cantidad inválida.');
    item.cantidad = nuevaCant;                               // Asigna nueva cantidad.
    alert(`Actualizado: "${item.nombre}" ahora tiene ${item.cantidad} unidades.`);
}

//  QUITAR PRODUCTO (DELETE) 
function quitar() {
    if (!carrito.length) 
        return alert('Carrito vacío.');     // Verifica que no esté vacío.
    verCarrito();                                            
    let idx = Number(prompt('Número del producto a quitar:')); // Pide índice.
    if (isNaN(idx) || !Number.isInteger(idx) || idx < 1 || idx > carrito.length) 
        return alert('Número inválido.');
    let item = carrito[idx-1];                               // Obtiene producto.
    let cant = Number(prompt(`Cantidad a quitar (máx ${item.cantidad}):`));
    if (!Number.isInteger(cant) || cant <= 0 || cant > item.cantidad) 
        return alert('Cantidad inválida.');
    if (cant === item.cantidad) {
        carrito.splice(idx-1, 1);                            // Elimina completamente.
    } else {
        item.cantidad -= cant;                               // Reduce cantidad.
    }
    alert(`Quitado: ${cant} x "${item.nombre}"`);
}