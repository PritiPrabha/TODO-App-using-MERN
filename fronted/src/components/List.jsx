import { Fragment, useEffect, useState } from "react";
import "../style/list.css";
import { useNavigate, Link } from "react-router-dom";

function List() {
  const [taskData, setTaskData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
    let list = await fetch("http://localhost:3200/tasks");
    list = await list.json();
    if (list.success) {
      setTaskData(list.result);
    }
  };

  const deleteTask = async (id) => {
    let list = await fetch("http://localhost:3200/delete/" + id, {
      method: "DELETE",
    });
    list = await list.json();
    if (list.success) {
      console.log("item deleted");
      getListData();
    }
  };

  return (
    <div>
      <h1>To Do Task</h1>
      <ul className="task-list">
        <li className="list-header">S.No:</li>
        <li className="list-header">Title</li>
        <li className="list-header">Description</li>
        <li className="list-header">Action</li>
        {taskData.map((item, index) => (
          <Fragment key={item._id}>
            <li className="list-item">{index + 1}</li>
            <li className="list-item">{item.title}</li>
            <li className="list-item">{item.description}</li>
            <li className="list-item">
              <button onClick={() => deleteTask(item._id)}>Delete</button>
              <Link to={`/update/${item._id}`} className="update-item">
                Update
              </Link>
            </li>
          </Fragment>
        ))}
      </ul>
    </div>
  );
}

export default List;
