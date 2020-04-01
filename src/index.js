import './styles.css';
import { Todo, TodoList } from './classes'
import { crearTodoHtml } from './js/componentes';
const todoList = new TodoList();
console.log(todoList.todos);
/*
todoList.todos.forEach(element => {
    crearTodoHtml(element);

});

nota de abajo,
primer elemento del for each llama al metodo
*/
todoList.todos.forEach(crearTodoHtml);
export {
    todoList
}