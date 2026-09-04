import TaskCard from "./TaskCard"

function KanbanColumn({ title, tasks, onDelete, onEdit, onMove }) {
  return (
    <div className="kanban-column">
      <h2>{title}</h2>

      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={onDelete}
            onEdit={onEdit}
            onMove={onMove}
          />
        ))}
      </div>
    </div>
  )
}

export default KanbanColumn