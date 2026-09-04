function TaskCard({ task, onDelete, onEdit, onMove }) {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>

      <p>{task.description}</p>
      <p>Category: {task.category}</p>
      <p>Responsible: {task.responsiblePerson}</p>
      <p>Due: {task.dueDate}</p>

      {task.completeDate && (
        <p>Completed: {task.completeDate}</p>
      )}

      <button onClick={() => onEdit(task)}>
        Edit
      </button>

      <button onClick={() => onDelete(task.id)}>
        Delete
      </button>

      {task.status === "TODO" && (
        <button onClick={() => onMove(task.id, "DOING")}>
          Move to DOING
        </button>
      )}

      {task.status === "DOING" && (
        <>
          <button onClick={() => onMove(task.id, "TODO")}>
            Move to TO DO
          </button>

          <button onClick={() => onMove(task.id, "DONE")}>
            Move to DONE
          </button>
        </>
      )}

      {task.status === "DONE" && (
        <button onClick={() => onMove(task.id, "DOING")}>
          Move to DOING
        </button>
      )}
    </div>
  )
}

export default TaskCard