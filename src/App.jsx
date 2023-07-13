import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import {
  addTodo,
  completedTodo,
  deleteTodo,
  editTodo,
  handleChange,
} from "./reducers/todos";
import Modal from "./components/Modal";
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';

function App() {
  const todos = useSelector(({ todos }) => todos.list);
  const title = useSelector(({ todos }) => todos.title);
  const addModal = useSelector(({ todos }) => todos.addModal);
  const delModal = useSelector(({ todos }) => todos.delModal);
  const editModal = useSelector(({ todos }) => todos.editModal);
  const editTitle = useSelector(({ todos }) => todos.editTitle);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="b1">
      <h1>Todo List</h1>
      <button
        onClick={() => {
          dispatch(handleChange({ name: "addModal", value: true }));
        }}
      >
        add
      </button>
      </div>
      <div className="flex flex-col gap-2  ">
        {todos.map((todo) => {
          return (
            <div key={todo.id} className="b">
              <input
                className="border p-2 w-[40%] a"
                type="checkbox"
                checked={todo.completed}
                onChange={(e) => {
                  dispatch(
                    completedTodo({
                      id: todo.id,
                      value: e.target.checked,
                    })
                  );
                }}
              />
              {todo.completed ? (
                <span className="a2">
                  <s >{todo.title}</s>
                </span>
              ) : (
                <span className="a1">{todo.title}</span>
              )}
              
                 <Stack  direction="row" spacing={2}
                className="border p-2 bg-red-500 b2"
                onClick={() => {
                  dispatch(
                    handleChange({ name: "delModal", value: true, id: todo.id })
                  );
                }} >
      <Button variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>
      
    </Stack>
    <Stack direction="row" spacing={2}
     onClick={() => {
      dispatch(
        handleChange({
          name: "editModal",
          value: true,
          id: todo.id,
        })
      );
    }}
    >
      <Button  variant="contained" color="success">
      edit
      </Button>
     
    </Stack>
             
            </div>
          );
        })}
      </div>
      <Modal
        title="Add Todo"
        open={addModal}
        handleClose={() =>
          dispatch(handleChange({ name: "addModal", value: false }))
        }
        onOk={() => {
          if (title.trim().length === 0) {
            return alert("Todo is empty");
          }
          dispatch(addTodo());
        }}
      >
        <TextField
          type="text"
          label="Todo"
          variant="standard"
          value={title}
          onChange={(e) =>
            dispatch(handleChange({ name: "title", value: e.target.value }))
          }
        />
      </Modal>
      <Modal
        title="Edit Todo"
        open={editModal}
        handleClose={() =>
          dispatch(handleChange({ name: "editModal", value: false }))
        }
        onOk={() => {
          if (editTitle.trim().length === 0) {
            return alert("Todo is empty");
          }
          dispatch(editTodo());
        }}
      >
        <TextField
          type="text"
          label="Todo"
          variant="standard"
          value={editTitle}
          onChange={(e) =>
            dispatch(handleChange({ name: "editTitle", value: e.target.value }))
          }
        />
      </Modal>
      <Modal
        title="Delete Todo"
        open={delModal}
        handleClose={() =>
          dispatch(handleChange({ name: "delModal", value: false }))
        }
        onOk={() => {
          dispatch(deleteTodo());
        }}
      >
        Are you sure you want to delete?
      </Modal>
    </div>
  );
}

export default App;
