function Dashboard({ tasks, categories }) {

  const totalTasks = tasks.length


  const todoTasks = tasks.filter(
    (task) => task.status === "TODO"
  ).length


  const doingTasks = tasks.filter(
    (task) => task.status === "DOING"
  ).length


  const doneTasks = tasks.filter(
    (task) => task.status === "DONE"
  ).length


  const earlyTasks = tasks.filter((task) => {

    return (
      task.status === "DONE" &&
      task.completeDate < task.dueDate
    )

  }).length


  const onTimeTasks = tasks.filter((task) => {

    return (
      task.status === "DONE" &&
      task.completeDate === task.dueDate
    )

  }).length


  const lateTasks = tasks.filter((task) => {

    return (
      task.status === "DONE" &&
      task.completeDate > task.dueDate
    )

  }).length


  const overdueTasks = tasks.filter((task) => {

    const today = new Date().toISOString().split("T")[0]

    return (
      task.status !== "DONE" &&
      task.dueDate < today
    )

  }).length


  const todoPercent =
    totalTasks === 0 ? 0 : (todoTasks / totalTasks) * 100


  const doingPercent =
    totalTasks === 0 ? 0 : (doingTasks / totalTasks) * 100


  const donePercent =
    totalTasks === 0 ? 0 : (doneTasks / totalTasks) * 100


  return (

    <div className="dashboard">

      <h2>Dashboard</h2>

      <p>Task summary and project overview</p>


      <div className="summary-cards">

        <div className="summary-card">
          <h3>Total Tasks</h3>
          <p>{totalTasks}</p>
        </div>


        <div className="summary-card">
          <h3>TO DO</h3>
          <p>{todoTasks}</p>
        </div>


        <div className="summary-card">
          <h3>DOING</h3>
          <p>{doingTasks}</p>
        </div>


        <div className="summary-card">
          <h3>DONE</h3>
          <p>{doneTasks}</p>
        </div>


        <div className="summary-card">
          <h3>Overdue</h3>
          <p>{overdueTasks}</p>
        </div>

      </div>


      <h2>Task Status</h2>


      <div className="doughnut-chart-container">

        <div
          className="doughnut-chart"
          style={{
            background:
              totalTasks === 0
                ? "#e5e7eb"
                : `conic-gradient(
                    #4f46e5 0% ${todoPercent}%,
                    #f59e0b ${todoPercent}% ${todoPercent + doingPercent}%,
                    #22c55e ${todoPercent + doingPercent}% 100%
                  )`
          }}
        >

          <div className="doughnut-center">

            <strong>{totalTasks}</strong>

            <span>Total</span>

          </div>

        </div>


        <div className="chart-legend">

          <p>
            <span className="legend-color todo"></span>
            TO DO: {todoTasks}
          </p>


          <p>
            <span className="legend-color doing"></span>
            DOING: {doingTasks}
          </p>


          <p>
            <span className="legend-color done"></span>
            DONE: {doneTasks}
          </p>

        </div>

      </div>


      <h2>Task Category</h2>


      <div className="chart">

        {categories.map((category) => {

          const categoryTasks = tasks.filter(
            (task) => task.category === category
          ).length


          return (

            <div
              className="chart-item"
              key={category}
            >

              <p>
                {category}: {categoryTasks}
              </p>


              <div className="bar-background">

                <div
                  className="bar"
                  style={{
                    width: `${
                      totalTasks === 0
                        ? 0
                        : (categoryTasks / totalTasks) * 100
                    }%`
                  }}
                ></div>

              </div>

            </div>

          )

        })}

      </div>


      <h2>Completion Performance</h2>


      <div className="chart">


        <div className="chart-item">

          <p>Early: {earlyTasks}</p>

          <div className="bar-background">

            <div
              className="bar"
              style={{
                width: `${
                  doneTasks === 0
                    ? 0
                    : (earlyTasks / doneTasks) * 100
                }%`
              }}
            ></div>

          </div>

        </div>


        <div className="chart-item">

          <p>On Time: {onTimeTasks}</p>

          <div className="bar-background">

            <div
              className="bar"
              style={{
                width: `${
                  doneTasks === 0
                    ? 0
                    : (onTimeTasks / doneTasks) * 100
                }%`
              }}
            ></div>

          </div>

        </div>


        <div className="chart-item">

          <p>Late: {lateTasks}</p>

          <div className="bar-background">

            <div
              className="bar"
              style={{
                width: `${
                  doneTasks === 0
                    ? 0
                    : (lateTasks / doneTasks) * 100
                }%`
              }}
            ></div>

          </div>

        </div>

      </div>

    </div>

  )

}


export default Dashboard