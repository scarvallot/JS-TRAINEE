/* 4. Funciones en JavaScript (Lección #4)
Objetivo: Modularizar el código utilizando funciones.
•Tareas a desarrollar:
o Crear funciones para cada operación matemática.
o Implementar una función que reciba parámetros y retorne un
resultado.
o Llamar funciones dentro de otras funciones para optimizar el
código.
*/
// FUNCIONES PARA OPERACIONES MATEMÁTICAS 

// 1. Función para sumar: recibe dos números y retorna la suma.
function sumar(a, b) {
    return a + b;
}

// 2. Función para restar: recibe dos números y retorna la resta.
function restar(a, b) {
    return a - b;
}

// 3. Función para multiplicar: recibe dos números y retorna el producto.
function multiplicar(a, b) {
    return a * b;
}

// 4. Función para dividir: recibe dos números y retorna la división (con validación).
function dividir(a, b) {
    if (b === 0) {
        return 'Error: No se puede dividir entre cero.';
    }
    return a / b;
}

// FUNCIÓN AUXILIAR PARA VALIDAR NÚMEROS 
// Esta función se llama dentro de otras funciones para optimizar el código.
function obtenerNumero(numero) {
    let num = parseFloat(prompt(numero));
    while (isNaN(num)) {
        alert('Debes ingresar un número válido.');
        num = parseFloat(prompt(numero));
    }
    return num;
}

//  FUNCIÓN QUE USA OTRAS FUNCIONES PARA REALIZAR CÁLCULOS
function calcular(operacion) {
    // Llama a obtenerNumero para pedir los dos números (reutiliza la función).
    let num1 = obtenerNumero('Ingresa el primer número:');
    let num2 = obtenerNumero('Ingresa el segundo número:');

    let resultado;
    let simbolo;

    // Según la operación, llama a la función correspondiente.
    switch (operacion) {
        case 1:
            resultado = sumar(num1, num2);
            simbolo = '+';
            break;
        case 2:
            resultado = restar(num1, num2);
            simbolo = '-';
            break;
        case 3:
            resultado = multiplicar(num1, num2);
            simbolo = '*';
            break;
        case 4:
            resultado = dividir(num1, num2);
            simbolo = '/';
            break;
        default:
            return 'Operación no válida.';
    }

    // Muestra el resultado en consola y en alert.
    let mensaje = `${num1} ${simbolo} ${num2} = ${resultado}`;
    console.log(mensaje);
    alert(mensaje);
}

// ===== MENÚ PRINCIPAL CON FUNCIONES =====
function menuCalculadora() {
    let opcion;
    do {
        opcion = parseInt(prompt(`Calculadora\n
            1. Sumar\n
            2. Restar\n
            3. Multiplicar\n
            4. Dividir\n
            5. Salir\n
            Opción:`));
        if (opcion >= 1 && opcion <= 4) {
            calcular(opcion);   
        } else if (opcion === 5) {
            alert('¡Hasta luego!');
        } else {
            alert('Opción no válida. Intenta de nuevo.');
        }
    } while (opcion !== 5);
}

console.log('INICIANDO CALCULADORA MODULAR');
menuCalculadora();