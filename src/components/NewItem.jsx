import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodoFetch, toggleTodoFetch } from "../store/todoSlice";

const NewItem = ({ dataTitle, id, completedStatus }) => {
  const dispatch = useDispatch();
  return (
    <div style={{ display: "flex" }}>
      {completedStatus ? (
        <p
          style={{
            textDecorationLine: "line-through",
            color: "green",
            marginLeft: 10,
          }}
        >
          {dataTitle}
        </p>
      ) : (
        <p>{dataTitle}</p>
      )}
      <button
        style={{ marginLeft: 10 }}
        onClick={() => dispatch(deleteTodoFetch( id ))}
      >
        X
      </button>
      <input
        style={{ marginLeft: 10 }}
        checked={completedStatus}
        type={"checkbox"}
        onChange={() => dispatch(toggleTodoFetch( id ))}
      />
    </div>
  );
};

export default NewItem;
