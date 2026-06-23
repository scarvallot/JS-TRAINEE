/* 3. Arreglos y ciclos (Lección #3)
Objetivo: Introducir el uso de arreglos y estructuras de repetición.
<-> •Tareas a desarrollar:
o Crear un arreglo con una lista de elementos.
o Usar for y while para recorrer arreglos.
o Implementar una función que filtre elementos según una
condición.
*/
// Inventario
const productos = [
    { nombre: 'Mantequilla', precio: 2490 },
    { nombre: 'Leche', precio: 1090 },
    { nombre: 'Salsa de Tomate', precio: 2950 },
    { nombre: 'Azúcar', precio: 1190 },
    { nombre: 'Arroz', precio: 1190 },
    { nombre: 'Atún', precio: 1350 }
];

// Mostrar inventario usando do...while
let i = 0;
do {
    console.log(`${i+1}. ${productos[i].nombre} - $${productos[i].precio}`);
    i++;
} while (i < productos.length);

// Filtrar productos con precio mayor a 1190 y asignar a variable.
let productos_1000 = productos.filter(p => p.precio > 1190);
// Mostrar el arreglo filtrado en consola (formato texto).
console.log(productos_1000);
// Mostrar el arreglo filtrado en forma de tabla (más visual).
console.table(productos_1000);

// Recorrer el arreglo filtrado y mostrar solo el nombre de cada producto (forEach no retorna nada).
let nombreProductos = productos_1000.forEach((productos) => console.log(productos.nombre));