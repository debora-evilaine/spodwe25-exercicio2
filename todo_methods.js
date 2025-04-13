const express = require('express');
const app = express();
const port = 3000;

let todos = [];

app.use(express.json());

app.post('/todos/ptodos', (req, res) => {
    const { text, done } = req.body;
    if (!text) {
        return res.status(400).json({ error: "O texto do item não pode estar vazio." });
    }

    const lastId = todos.length > 0 ? todos[todos.length - 1].id : 0;

    const newTodo = {
        id: lastId + 1,
        text: text,
        done: done || false,
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const { text, done } = req.body;

    const todo = todos.find((item) => item.id === todoId);

    if (!todo) {
        return res.status(404).json({ error: "Este elemento não faz parte da lista." });
    }

    if (text !== undefined) todo.text = text;
    if (done !== undefined) todo.done = done;

    res.json(todo);
});

app.get('/todos', (req, res) => {
    res.json(todos);
});

console.log(`Number of IDs: ${todos.length}`);


app.listen(port, () => {
    console.log(`Rodando na porta: http://localhost:${port}`);
});
