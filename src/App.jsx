import { useState, useEffect } from "react"
import KanbanColumn from "./components/KanbanColumn"
import Dashboard from "./components/Dashboard"
import "./App.css"

function App() {

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks")

    if (savedTasks) {
      return JSON.parse(savedTasks)
    }

    return [
      {
        id: 1,
        title: "Design Player Character",
        description: "Create the main character design",
        category: "Art",
        startDate: "2026-09-01",
        dueDate: "2026-09-05",
        completeDate: null,
        responsiblePerson: "Alice",
        status: "TODO"
      }
    ]
  })

  const [categories, setCategories] = useState(() => {

  const savedCategories = localStorage.getItem("categories")

  if (savedCategories) {
    return JSON.parse(savedCategories)
  }

  return [
    "Art",
    "Programming",
    "Design",
    "Testing"
  ]

})

  const [showForm, setShowForm] = useState(false)
  const [newCategory, setNewCategory] = useState("")
  const [editingTask, setEditingTask] = useState(null)
  const [currentPage, setCurrentPage] = useState("kanban")

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "Art",
    startDate: "",
    dueDate: "",
    completeDate: null,
    responsiblePerson: "Alice",
    status: "TODO"
  })
  

  

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
  localStorage.setItem(
    "categories",
    JSON.stringify(categories)
  )
}, [categories])

  const todoTasks = tasks.filter(
    (task) => task.status === "TODO"
  )

  const doingTasks = tasks.filter(
    (task) => task.status === "DOING"
  )

  const doneTasks = tasks.filter(
    (task) => task.status === "DONE"
  )

  function handleDelete(taskId) {
    setTasks(
      tasks.filter((task) => task.id !== taskId)
    )
  }

  function handleMove(taskId, newStatus) {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            status: newStatus,
            completeDate:
              newStatus === "DONE"
                ? new Date().toISOString().split("T")[0]
                : task.completeDate
          }
        }

        return task
      })
    )
  }

  function handleAddCategory() {
    if (
      newCategory.trim() !== "" &&
      !categories.includes(newCategory.trim())
    ) {
      setCategories([
        ...categories,
        newCategory.trim()
      ])
    }

    setNewCategory("")
  }

  function handleEdit(task) {
    setEditingTask(task)
    setNewTask(task)
    setShowForm(true)
  }

  function handleChange(event) {
    const { name, value } = event.target

    setNewTask({
      ...newTask,
      [name]: value
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (editingTask) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id
            ? {
                ...newTask,
                id: editingTask.id
              }
            : task
        )
      )
    } else {
      const task = {
        ...newTask,
        id: Date.now()
      }

      setTasks([...tasks, task])
    }

    setNewTask({
      title: "",
      description: "",
      category: "Art",
      startDate: "",
      dueDate: "",
      completeDate: null,
      responsiblePerson: "Alice",
      status: "TODO"
    })

    setEditingTask(null)
    setShowForm(false)
  }

  return (
  <div className="app">

    <h1>GameDev Kanban</h1>

    <div className="navigation">

      <button
        className={currentPage === "kanban" ? "active" : ""}
        onClick={() => setCurrentPage("kanban")}
      >
        Kanban Board
      </button>

      <button
        className={currentPage === "dashboard" ? "active" : ""}
        onClick={() => setCurrentPage("dashboard")}
      >
        Dashboard
      </button>

    </div>


    {currentPage === "kanban" && (
      <>

        <button onClick={() => setShowForm(true)}>
          + New Task
        </button>


        <div className="category-manager">

          <input
            type="text"
            placeholder="New category"
            value={newCategory}
            onChange={(event) =>
              setNewCategory(event.target.value)
            }
          />

          <button
            type="button"
            onClick={handleAddCategory}
          >
            Add Category
          </button>

        </div>


        {showForm && (

          <form
            onSubmit={handleSubmit}
            className="task-form"
          >

            <h2>
              {editingTask
                ? "Edit Task"
                : "Create New Task"}
            </h2>

            <input
              type="text"
              name="title"
              placeholder="Task title"
              value={newTask.title}
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Task description"
              value={newTask.description}
              onChange={handleChange}
              required
            />

            <label>

              Start Date

              <input
                type="date"
                name="startDate"
                value={newTask.startDate}
                onChange={handleChange}
                required
              />

            </label>


            <select
              name="category"
              value={newTask.category}
              onChange={handleChange}
            >

              {categories.map((category) => (

                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>

              ))}

            </select>


            <label>

              Due Date

              <input
                type="date"
                name="dueDate"
                value={newTask.dueDate}
                onChange={handleChange}
                required
              />

            </label>


            <select
              name="responsiblePerson"
              value={newTask.responsiblePerson}
              onChange={handleChange}
            >

              <option value="Alice">
                Alice
              </option>

              <option value="Bob">
                Bob
              </option>

              <option value="Charlie">
                Charlie
              </option>

            </select>


            <div>

              <button type="submit">

                {editingTask
                  ? "Save Changes"
                  : "Create Task"}

              </button>

              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingTask(null)
                }}
              >
                Cancel
              </button>

            </div>

          </form>

        )}


        <div className="kanban-board">

          <KanbanColumn
            title="TO DO"
            tasks={todoTasks}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onMove={handleMove}
          />

          <KanbanColumn
            title="DOING"
            tasks={doingTasks}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onMove={handleMove}
          />

          <KanbanColumn
            title="DONE"
            tasks={doneTasks}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onMove={handleMove}
          />

        </div>

      </>
    )}


    {currentPage === "dashboard" && (

      <Dashboard
        tasks={tasks}
        categories={categories}
      />

    )}

  </div>
)
}
export default App