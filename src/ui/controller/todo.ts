async function get() {
    return fetch("/api/todos").then(async (response) => {
        const result = await response.json();
        const todos = result.todos;
        return todos;
    });
}

export const todoController = {
    get,
};
