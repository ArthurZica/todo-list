import fs from 'fs';
import { v4 as uuid } from 'uuid';
const DB_FILE_PATH = "./core/db"
console.log("CRUD");

type UUID = string;
interface Todo {
    id: UUID;
    date: string;
    content: string;
    done: boolean;
}

function create(content: string) : Todo{
    const todo:Todo = {
        id: uuid(),
        date : new Date().toISOString(),
        content: content,
        done: false,
    };

    const todos: Array<Todo> = [
        ...read(),
        todo,
    ]

    fs.writeFileSync(DB_FILE_PATH,JSON.stringify({
        todos,
    }, null, 2));
    return todo;
}

function read() : Array<Todo>{
    const dbString = fs.readFileSync(DB_FILE_PATH,"utf-8");
    const db = JSON.parse(dbString || "{}");
    if(!db.todos) {
        return [];
    }
    return db.todos;
}

function update(id:UUID, partialTodo: Partial<Todo>) : Todo{
    let updatedTodo;
    const todos =  read();
    todos.forEach((currentTodo)=>{
        const isToUpdate = currentTodo.id === id;
        if(isToUpdate){
            updatedTodo = Object.assign(currentTodo,partialTodo);
        }
    });
    fs.writeFileSync(DB_FILE_PATH,JSON.stringify({todos},null,2))

    if(!updatedTodo){
        throw new Error("Todo not found or not updated");
    }
    return updatedTodo
}

function updateContentById(id:UUID,content:string) :Todo {
    return update(id,{
        content: content,
    })
}

function deleteById(id:UUID){
    const todos = read();
    const todosWithoutOne = todos.filter((todo) => {
        if(id === todo.id){
            return false
        }
        return true
    });
    fs.writeFileSync(DB_FILE_PATH,JSON.stringify({todosWithoutOne},null,2));
}

function CLEAR_DB() {
    fs.writeFileSync(DB_FILE_PATH,"");
}

CLEAR_DB();
const firstTodo = create("Primeira TODO");
const secondTodo = create("Segunda TODO");
const thirdTodo = create("Terceira TODO");
update(thirdTodo.id, {
    content: "Novo valor terceira todo",
    done: true,
});
updateContentById(secondTodo.id,"novo valor segunda todo");
deleteById(firstTodo.id);
console.log(read());
