import { useEffect, useState } from "react";
import "../style/addtask.css";
import { useNavigate, useParams } from "react-router-dom";

function UpdateTask() {
  const [taskData, setTaskData] = useState({ title: "", description: "" });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getTask();
  }, []);

  const getTask = async () => {
    let response = await fetch(`http://localhost:3200/task/${id}`);
    let task = await response.json();
    if (task.result) {
      setTaskData(task.result);
    }
  };

  const updateTask = async () => {
    let response = await fetch("http://localhost:3200/update-task", {
      method: "PUT",
      body: JSON.stringify(taskData),
      headers: {
        "Content-Type": "application/json"
      }
    });
    let task = await response.json();
    if (task) {
      navigate("/");
    }
  };

  return (
    <div className="container">
      <h1>Update Task</h1>

      <label>Title</label>
      <input
        value={taskData.title}
        onChange={(event) =>
          setTaskData({ ...taskData, title: event.target.value })
        }
      />

      <label>Description</label>
      <textarea
        value={taskData.description}
        onChange={(event) =>
          setTaskData({ ...taskData, description: event.target.value })
        }
        name="description"
        placeholder="Enter the description"
      />

      <button onClick={updateTask} className="submit">
        Update task
      </button>
    </div>
  );
}

export default UpdateTask;
