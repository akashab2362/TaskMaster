import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../store/taskSlice.js";
import "./myTask.css";
const MyTasks = () => {
  const { tasks } = useSelector((state) => state.task);
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [sortOrder, setSortOrder] = useState("");
  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);
  const sortTasksByPriority = (tasks, order) => {
    return tasks.slice().sort((a, b) => {
      if (order === "asc") {
        return a.priority.localeCompare(b.priority);
      } else if (order === "desc") {
        return b.priority.localeCompare(a.priority);
      } else if (order === "dateasc") {
        return new Date(a.deadline) - new Date(b.deadline);
      } else if (order === "datedesc") {
        return new Date(b.deadline) - new Date(a.deadline);
      } else {
        return 0;
      }
    });
  };
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };
  return (
    <div className="taskContainer">
      <div className="taskTitle">
        <h1 className="text-3xl font-bold">My Tasks</h1>
      </div>
      {tasks.length > 0 && (
        <div className="sort-cont">
          <select
            name="Sort"
            id="sort"
            onChange={handleSortChange}
            value={sortOrder}
          >
            <option default value="">
              Chose one
            </option>
            <option value="asc">Priority (ASC)</option>
            <option value="desc">Priority (DESC)</option>
            <option value="dateasc">By Date (ASC)</option>
            <option value="datedesc">By Date (DESC)</option>
          </select>
        </div>
      )}
      {tasks &&
        sortTasksByPriority(tasks, sortOrder).map((task) => (
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
