import React, { useEffect, useState } from "react";
import { getDatabase, ref, set, push, onValue } from "firebase/database";

const App = () => {
  let [task, setTask] = useState("");
  let [todos, setallTodos] = useState([]);

  let handlesubmit = () => {
    const db = getDatabase();
    set(
      push(ref(db, "todos/")),

      {
        name: task,
      }
    ).then(() => {
      setTask("");
      alert("Task Added");
    });
  };

  let handleTask = (e) => {
    setTask(e.target.value);
  };

  useEffect(() => {
    const db = getDatabase();
    const getTodos = ref(db, "todos/");
    let array = [];
    onValue(getTodos, (snapshot) => {
      snapshot.forEach((item) => {
        array.push(item.val());
      });
      setallTodos(array);
    });
  }, []);
  console.log(todos);

  return (
    <>
      <div className="w-[227px] mx-auto border-4 text-center p-4 mt-10">
        <h2>TODO LIST</h2>
        <input
          className="border-2"
          type="text"
          placeholder="ENTER YOUR TASK"
          onChange={handleTask}
          value={task}
        />
        <button
          onClick={handlesubmit}
          className=" border-2 border-black p-2 mt-4 rounded-[30%]"
        >
          Submit
        </button>
        <ul>
          {todos.map((item) => {
            return <li>{item.name}</li>;
          })}
        </ul>
      </div>
    </>
  );
};
export default App;
