/**
 * Fragmentos de codigos del proyecto inicial
 * */

let tareas = [];
let totalTareas = 0;

function agregarTarea(tarea) {
    tareas.push(tarea);
    totalTareas++;
}

// function mostrarTareas() {
for (let i = 0; i < tareas.length; i++) {
    console.log(i + 1 + ". " + tareas[i]);
}

function eliminarTarea(indice) {
    tareas.splice(indice, 1);
    totalTareas--;
}

// 01.- Persistencia (Local Storage)

const STORAGE_KEY = 'gestor_tareas';

/* 
Carga el arreglo de tareas desde el localStorage.
*/
function cargarTareas(){
  const datos = localStorage.getItem(STORAGE_KEY);
  return datos ? JSON.parse(datos) : [];
}


/* 
Guardar el arreglo en el localStorage y los devuelve.
*/
function guardarTareas(tareas){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tareas));
    return tareas;
}

// 02.- Logica de negocios

/* 
Valida que la descripcion no este vacia ni sea duplicada.
*/

function validarEntrada(descripcion, tareas){
    const texto = descripcion.trim();
    if(!texto)
        return 'La tarea no puede estar vacia'
}