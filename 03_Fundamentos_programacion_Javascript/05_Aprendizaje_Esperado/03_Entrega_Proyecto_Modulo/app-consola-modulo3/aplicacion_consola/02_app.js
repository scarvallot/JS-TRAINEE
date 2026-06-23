/* Variables, expresiones y sentencias condicionales (Lección #2)
Objetivo: Aprender a manejar variables, operadores y
estructuras condicionales.

    • Tareas a desarrollar:
        o Definir variables utilizando let y const.
        Pedir al usuario que ingrese dos números y almacenarlos en variables.
        o Implementar operaciones matemáticas (suma, resta,
        multiplicación, división).
        o Usar estructuras condicionales (íf, else, switch) para
        evaluar diferentes situaciones.
*/

let msg = "Hello, World!";
const Pi = 3.141592;
// Solicita numero 01
let num01 = parseInt(prompt("Ingresa el primer numero:"));
// Solicita numero 02
let num02 = parseInt(prompt("Ingresa el segundo numero:"));

// Declara e inicializa las variables num01 y num02 (deben estar definidas previamente).
let suma = num01 + num02;                       // Calcula la suma de num01 y num02.
console.log(`Suma: ${suma}`);                   // Muestra el resultado de la suma en consola.
let resta = num01 - num02;                      // Calcula la resta de num01 y num02.
console.log(`Resta: ${resta}`);                 // Muestra el resultado de la resta en consola.
let multiplicar = num01 * num02;                // Calcula la multiplicación de num01 y num02.
console.log(`Multiplicar: ${multiplicar}`);     // Muestra el resultado de la multiplicación.
let dividir = num01 / num02;                    // Calcula la división de num01 entre num02.
console.log(`Dividir: ${dividir.toFixed(2)}`);  // Muestra la división con dos decimales.

// Calculadora con bucle y validaciones
let opcion;// Variable para almacenar la opción del menú
do {
    // Muestra el menú y captura la opción del usuario
    opcion = parseInt(prompt(`Selecciona una opción:\n
        1: Sumar\n
        2: Restar\n
        3: Multiplicar\n
        4: Dividir\n
        5: Salir`));

    // Si la opción es salir, termina el bucle sin pedir números
    if (opcion === 5) {
        console.log('¡Hasta luego!');
        break;
    }

    // Valida que la opción sea un número del 1 al 4
    if (isNaN(opcion) || opcion < 1 || opcion > 5) {
        alert('Opción no válida. Intenta de nuevo.');
        continue;    // Vuelve al inicio del bucle
    }

    // Verifica que ambos sean números válidos
    if (isNaN(num01) || isNaN(num02)) {
        alert('Debes ingresar números válidos.');
        continue;    // Vuelve a pedir la opción
    }

    let resultado;   // Variable para almacenar el resultado de la operación

    // Evalúa la opción seleccionada
    switch (opcion) {
        case 1:      // Suma
            resultado = num01 + num02;
            console.log(`El total de la suma es: ${resultado}`);
            break;
        case 2:      // Resta
            resultado = num01 - num02;
            console.log(`El total de la resta es: ${resultado}`);
            break;
        case 3:      // Multiplicación
            resultado = num01 * num02;
            console.log(`El total de la multiplicación es: ${resultado}`);
            break;
        case 4:      // División
            if (num02 === 0) {
                alert('Error: No se puede dividir entre 0.');
                console.log('Error: División entre cero.');
            } else {
                resultado = num01 / num02;
                console.log(`El total de la división es: ${resultado.toFixed(2)}`);
            }
            break;
        default:     // Por si acaso (no debería ocurrir)
            alert('Opción no reconocida.');
    }
} while (opcion !== 5);   // Repite mientras no se elija "Salir"