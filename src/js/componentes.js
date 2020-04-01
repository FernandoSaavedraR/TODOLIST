//referencias HTML
import { Todo } from '../classes'
import { todoList } from '../index';
const TODOLIST = document.querySelector('.todo-list');
const NEWTODO = document.querySelector('.new-todo');
const CLEARCOMPLETED = document.querySelector('.clear-completed');
const FILTERS = document.querySelector('.filters');
const FILTERSANCHORS =document.querySelectorAll('.filtro');
const crearTodoHtml = (todo) => {
    const htmlTodo = `
    <li class="${todo.completado ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${todo.completado ? 'checked' : ''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>
    `
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    TODOLIST.append(div.firstElementChild);
    return div.firstElementChild;
}


//eventos

NEWTODO.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && NEWTODO.value.trim().length > 0) {
        const nuevoTodo = new Todo(NEWTODO.value.trim())
        todoList.nuevoTodo(nuevoTodo)
        crearTodoHtml(nuevoTodo);
        NEWTODO.value = "";
    }
});
TODOLIST.addEventListener('click', (event) => {
    const nombreElemento = event.target.localName; //input label button
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = parseInt(todoElemento.getAttribute('data-id'));
    if (nombreElemento.includes('input')) { //click en checkbox
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    } else if (nombreElemento.includes('button')) {
        todoList.eliminarTodo(todoId);
        TODOLIST.removeChild(todoElemento);
    }
    console.log(todoList);
});
CLEARCOMPLETED.addEventListener('click', () => {
    todoList.eliminarCompletados();
    for (let i = TODOLIST.children.length - 1; i >= 0; i--) {
        const elemento = TODOLIST.children[i];
        if (elemento.classList.contains('completed')) {
            TODOLIST.removeChild(elemento);
        }
    }
});

FILTERS.addEventListener('click', (event) => {
    const filtro = event.target.text;
    if (!filtro) { return; }
    FILTERSANCHORS.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');
    for (const elemento of TODOLIST.children) {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        switch (filtro) {
            case 'Pendientes':
                if (completado) elemento.classList.add('hidden');
                break;
            case 'Completados':
                if (!completado) elemento.classList.add('hidden');
                break;

        }
    }
});
export {
    crearTodoHtml,
    NEWTODO
};