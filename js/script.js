
//base de datos simulada 
//esta variable simula una respuesta de tipo json desde el servidor
let tasks = [];

//funcion para renderizar(accion de crear elementos en mi navegador) tareas existententes  en mi respuesta de api 
const renderTasks = () =>{
    const containerTasks = document.querySelector('#tasks');
    containerTasks.innerHTML = "";
    tasks.forEach((el) => {
        const div = document.createElement('div'); 
        div.className = 'task' + (el.done?" tarea-done":"");
        div.innerHTML = `
        <span>${el.Text}</span>
        <div>
            <button onclick="toggleDone(${el.id})">${el.done ? '❌' : '✅'}</button>
            <button onclick="editTask(${el.id})">✏️</button>
            <button onclick="deleteTask(${el.id})">🗑️</button>
        </div>
        `;
        containerTasks.appendChild(div);
    });
}

// creando funcion para agregar una tarea
const addTask = (text) => {
    const input = document.querySelector('#taskInput');
    // validacion para evitar espacio en blanco
    const cleanText = input.value.trim();
    // validacion para agregar tarea vacia
    if (!cleanText) {
        Swal.fire({
            title: "INGRESE UNA TAREA VALIDA",
            text: "no se permite campos vacios",
            icon: "question"
        });
        return;
    }
    // crear nuestro objeto
    const newTask = {
        id: Date.now(), //simular ID de base de datos
        Text: cleanText,
        done: false,
        title: cleanText,
    };
    //agregar la nueva tarea a la lista de tareas
    //tasks.push(newTask); // usando metodos 
    tasks = [...tasks, newTask]; // con es6 destructuring
    //limpiar input
    input.value = '';
    //renderizar las tareas
    Swal.fire({
    position: "top-end",
    icon: "success",
    title: "TAREA AGREGADA",
    showConfirmButton: false,
    timer: 800
});
    renderTasks();
   
}

// marcar tarea como completada
const toggleDone = (id) => {
    tasks = tasks.map(el =>
        el.id === id ? {...el, done: !el.done} : el
    );
    let timerInterval;
Swal.fire({
  title: "TAREA COMPLETADA",
  html: "I will close in <b></b> milliseconds.",
  timer: 2000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading();
    const timer = Swal.getPopup().querySelector("b");
    timerInterval = setInterval(() => {
      timer.textContent = `${Swal.getTimerLeft()}`;
    }, 100);
  },
  willClose: () => {
    clearInterval(timerInterval);
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log("I was closed by the timer");
  }
});
    renderTasks();
}

//editar una tarea
const editTask = (id) => {
    const task = tasks.find(el => el.id === id);
    const newText = prompt("EDITA LA TAREA", task.Text);
    // validacion
    if (newText === null && newText.trim() === "") return
    // recorre las tareas una vez encontardo la tarea con el id indicado setear el nuevo texto 
    tasks = tasks.map(el =>
        el.id === id ? {...el, Text: newText} : el
    );
    Swal.fire({
        title: "TAREA EDITADA",
        icon: "success",
        draggable: true
    });
    renderTasks();

}

//eliminar una tarea
const deleteTask = (id) => {
    Swal.fire({
  title: "QUIERES ELIMAR ESTA TAREA?",
  text: "Los elementos eliminados no se pueden recuperar",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire({
      title: "Deleted!",
      text: "elemento eliminado correctamente",
      icon: "success"
    });
  }
});
    tasks = tasks.filter(el => el.id !== id);
    renderTasks();
}
// ...existing code...
document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('#taskInput');
    if (!input) return;
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            addTask(); // addTask() ya usa el valor del input internamente
        }
    });
});
// ...existing code...