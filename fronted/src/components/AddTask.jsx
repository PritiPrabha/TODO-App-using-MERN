import { useState } from "react";
import "../style/addtask.css";
function AddTask() {
  const [taskData, setTaskData] = useState();
  const handleaddTask = async () => {
    console.log(taskData);
    let result = await fetch("http://localhost:3200/add-task", {
      method: "Post",
      body:JSON.stringify(taskData),
      headers: {
        "Content-Type": "Application/Json",
      },
    });
    result = await result.json();
    if (result) {
      console.log("New task");
    }
  };
  return (
    <div className="container">
      <h1>Add New Task</h1>
      
        <label htmlFor="">Title</label>
        <input
          onChange={(event) =>
            setTaskData({ ...taskData, title: event.target.value })
          }
          type="text"
          name="title"
          placeholder="Enter Task "
        ></input>
        <label htmlFor="">Description</label>
        <textarea
          onChange={(event) =>
            setTaskData({ ...taskData, description: event.target.value })
          }
          name="description"
          placeholder="Enter the description"
          id=""
        ></textarea>
        <button onClick={handleaddTask} className="submit">
          Add New task
        </button>
    
    </div>
  );
}
export default AddTask;
