import React, { useEffect } from "react";
import TaskCard from "./TaskCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../store/taskSlice.js";
import "./myTask.css";
const MyTasks = () => {
  const { tasks } = useSelector((state) => state.task);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);
  return (
    <div className="taskContainer">
      <div className="taskTitle">
        <h1 className="text-3xl font-bold">My Tasks</h1>
      </div>
      <div className="sort-cont">
        <select name="Sort" id="sort">
          <option default value="">Chose one</option>
          <option value="">Priority (ASC)</option>
          <option value="">Priority (DESC)</option>
        </select>
      </div>
      {tasks &&
        tasks.map((task) => (
          <TaskCard
            key={task._id}
            _id={task._id}
            title={task.title}
            description={task.taskDescription}
            priority={task.priority}
            deadline={task.deadline}
            isCompleted={task.isCompleted}
          />
        ))}
    </div>
  );
};

export default MyTasks;
