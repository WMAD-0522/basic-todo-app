import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.set("view engine", "ejs");
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
// if you want to get form data from request body

app.get("/health", (req, res) => {
    res.json({
        status: "ok"
    })
})

app.get("/", (req, res) => {
    res.render("index", {
        title: "homepage",
        user: {
            name: "John Doe",
            age: 30
        }
    })
})

const todos = [
    {
        id: 1,
        title: "Todo 1",
        description: "Todo 1 description",
        completed: false
    },
    {
        id: 2,
        title: "Todo 2",
        description: "Todo 2 description",
        completed: true
    },
    {
        id: 3,
        title: "Todo 3",
        description: "Todo 3 description",
        completed: false
    },
]

app.get("/todos", (req, res) => {
    res.render(
        "todos", 
        {
            todos
        }
  )
})

app.post('/todo', (req, res) => {
    const { title, description, completed } = req.body;

    const newTodo = {
        id: todos.length + 1,
        title: title,
        description: description,
        completed: completed
    }

    todos.push(newTodo);
    res.render("todos", { todos })

})

app.post("/todos/:id", (req, res) => {
    const { id } = req.params;

    let index = todos.map(todo => todo.id).indexOf(parseInt(id));
    // index is -1 if not found

    todos.splice(index, 1);
    // splice is used to remove an element from array
    // arguments: index, number of elements to remove
    // 1 means remove 1 element
    res.render("todos", { todos: todos })

})

app.listen(5001, () => {
    console.log("Server started on port 5001");
})
