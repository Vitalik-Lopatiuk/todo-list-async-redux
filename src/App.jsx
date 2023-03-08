import { useEffect, useRef, useState } from "react";
import List from "./components/List";
import { useDispatch, useSelector } from "react-redux";
import { pushArray } from "./store/todoSlice";
function App() {
  const [handleInput, setHandleInput] = useState("");

  const dispatch = useDispatch();

  const focusInput = useRef(null);
  useEffect(() => {
    focusInput.current.focus();
  }, []);

  const pushTask = () => dispatch(pushArray({ handleInput }));

  const KeyDown = (e) => {
    if (e.key === "Enter") {
      pushTask();
    }
  };

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
      <List />
    </div>
  );
}

export default App;
