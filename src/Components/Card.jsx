export const Card = (props) => {
  const { task, handleRight, handleLeft } = props;
  return (
    <div
      key={task.id}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("taskId", task.id);
      }}
      className="p-3 rounded-lg bg-gray-200 flex justify-between items-center m-2"
    >
      <p className="font-bold text-sm m-2">{task.taskname}</p>
      <button
        className="p-2 rounded-lg bg-white m-2 text-xs"
        onClick={() => handleRight(task.id)}
      >
        Move Right
      </button>
      <button
        className="p-2 rounded-lg bg-white text-xs"
        onClick={() => handleLeft(task.id)}
      >
        Move Left
      </button>
    </div>
  );
};
