import { useState } from "react";
import { Card } from "./Card";

export const Kanbanboard = () => {
  const [task, setTask] = useState({
    id: "",
    taskname: "",
    status: "todo",
  });
  const [tasks, setTasks] = useState([]);
  const handleTask = () => {
    setTasks([...tasks, task]);
    setTask({
      id: "",
      taskname: "",
      status: "todo",
    });
  };
  const handleRight = (taskid) => {
    const temptasks = tasks.map((item) => {
      if (item.id === taskid) {
        if (item.status === "todo") {
          return { ...item, status: "Inprocess" };
        } else if (item.status === "Inprocess") {
          return { ...item, status: "Completed" };
        }
      }
      return item;
    });
    setTasks(temptasks);
  };
  const handleLeft = (taskid) => {
    const temptasks = tasks.map((item) => {
      if (item.id === taskid) {
        if (item.status === "Inprocess") {
          return { ...item, status: "todo" };
        } else if (item.status === "Completed") {
          return { ...item, status: "Inprocess" };
        }
      }
      return item;
    });
    setTasks(temptasks);
  };

  const handleDrop = (e, newStatus) => {
    const taskId = e.dataTransfer.getData("taskId");

    const updated = tasks.map((item) =>
      item.id === taskId ? { ...item, status: newStatus } : item,
    );
    console.log(updated);
    setTasks(updated);
  };

  return (
    <div>
      <p className="font-bold text-3xl text-center ">Kanban Board</p>
      <div className="flex flex-row justify-center items-center">
        <input
          className="p-2 border rounded-lg m-2"
          value={task.taskname}
          onChange={(e) =>
            setTask({
              ...task,
              id: Date.now().toString(),
              taskname: e.target.value,
            })
          }
        />
        <button
          className="p-2 rounded-lg bg-red-500 text-white"
          onClick={handleTask}
        >
          Add Task
        </button>
      </div>
      <div className="flex flex-row justify-evenly">
        <div
          className="bg-gray-300 rounded-lg p-5 w-100 h-screen"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, "todo")}
        >
          <p className="text-xl font-bold">Todo</p>
          {tasks
            .filter((item) => item.status === "todo")
            .map((item) => (
              <Card
                task={item}
                handleLeft={handleLeft}
                handleRight={handleRight}
              />
            ))}
        </div>
        <div
          className="bg-gray-300 rounded-lg p-5 w-100 h-screen"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, "Inprocess")}
        >
          <p className="text-xl font-bold">In Progress</p>
          {tasks
            .filter((item) => item.status === "Inprocess")
            .map((item) => (
              <Card
                task={item}
                handleLeft={handleLeft}
                handleRight={handleRight}
              />
            ))}
        </div>
        <div
          className="bg-gray-300 rounded-lg p-5 w-100 h-screen"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, "Completed")}
        >
          <p className="text-xl font-bold">Completed</p>
          {tasks
            .filter((item) => item.status === "Completed")
            .map((item) => (
              <Card
                task={item}
                handleLeft={handleLeft}
                handleRight={handleRight}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
