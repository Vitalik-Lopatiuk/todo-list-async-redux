import { useEffect, useRef, useState } from "react";
import List from "./components/List";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch, useSelector } from "react-redux";
import { pushTodoFetch, fetchTodo } from "./store/todoSlice";

function App() {
  const [handleInput, setHandleInput] = useState("");
  const { status, error } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const focusInput = useRef(null);
  useEffect(() => {
    focusInput.current.focus();
  }, []);

  const pushTask = () => dispatch(pushTodoFetch( handleInput ));

  const KeyDown = (e) => {
    if (e.key === "Enter") {
      pushTask();
    }
  };

  useEffect(() => {
    dispatch(fetchTodo());
  }, []);

  return (
    <div className="App">
      <div style={{ marginBottom: 20 }}>
        <input
          style={{ width: 230 }}
          ref={focusInput}
          onKeyDown={KeyDown}
          value={handleInput}
          onChange={(e) => setHandleInput(e.target.value)}
          type="text"
        />
        <button style={{ marginLeft: 20 }} onClick={pushTask}>
          Push
        </button>
      </div>
      <div>
        {status === "loading" && (
          <ClipLoader
            color="#ffffff"
            loading="true"
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
      </div>
      {error && <p>{error}</p>}
      <List />
    </div>
  );
}

export default App;
