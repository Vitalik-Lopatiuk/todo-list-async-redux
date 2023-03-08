import React from "react";
import { useSelector } from "react-redux";
import NewItem from "./NewItem";

const List = () => {
  const todo = useSelector((state) => state.todo.todos);
  return (
    <div>
      <ul>
        {todo.map((data) => (
          <li key={data.id}>
            <NewItem
              id={data.id}
              dataTitle = {data.title}
              completedStatus ={data.status}
              {...todo}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
