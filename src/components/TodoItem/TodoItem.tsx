import cn from "classnames";
import _find from "lodash/find";
import { FC, useEffect, useState } from "react";

import { Input, List, Tooltip } from "antd";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateTodo } from "../../store/slices/todos";
import { TodoI } from "../../types";

import TodoDelete from "../TodoDelete";
import TodoRename from "../TodoRename";
import TodoToggle from "../TodoToggle";

import styles from "./TodoItem.module.css";

const getPossibleTodoUpdateErrors = (
  todos: TodoI[],
  todo: TodoI,
  value: string
) => [
  {
    condition: !!_find(
      todos,
      ({ text, id }) => text === value && id !== todo.id
    ),
    text: "Todo with this name is already exists",
  },
  {
    condition: value === "",
    text: "Todo can't be empty",
  },
];

interface TodoItemPropsI {
  todo: TodoI;
}

const TodoItem: FC<TodoItemPropsI> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((store) => store.todos.todos);

  const [errorText, setErrorText] = useState("");
  const [showError, setShowError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [todoValue, setTodoValue] = useState(todo.text);
  const [prevTodoValue, setPrevTodoValue] = useState(todo.text);

  const listClassName = cn(styles.todo, {
    [styles["todo-completed"]]: todo.isCompleted,
  });

  const handleUpdateTodo = () => {
    if (!isEditing) return setIsEditing(true);
    setIsEditing(!isEditing);

    const possibleErrors = getPossibleTodoUpdateErrors(todos, todo, todoValue);
    const applicableError = _find(possibleErrors, ["condition", true]);

    if (applicableError) {
      setTodoValue(prevTodoValue);
      setShowError(true);
      setErrorText(applicableError.text);

      setTimeout(() => {
        setShowError(false);
      }, 2000);
      return;
    }

    setTodoValue(todoValue.trim());
    setPrevTodoValue(todoValue.trim());
    dispatch(updateTodo({ id: todo.id, text: todoValue.trim() }));
  };

  useEffect(() => {
    setTodoValue(todo.text);
  }, [todo]);

  return (
    <List.Item className={listClassName} data-testid={`todo-${todo.id}`}>
      <TodoToggle todo={todo} />
      <Tooltip
        placement='bottom'
        color='#ed1a12ee'
        visible={showError}
        title={errorText}
      >
        {isEditing ? (
          <Input
            autoFocus
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
            onPressEnter={handleUpdateTodo}
            data-testid={`input-todo-${todo.id}`}
            className={cn(styles["todo-input"], styles["todo-text"])}
            onBlur={handleUpdateTodo}
          />
        ) : (
          <span
            className={styles["todo-text"]}
            data-testid={`text-todo-${todo.id}`}
          >
            {todoValue}
          </span>
        )}
      </Tooltip>
      <TodoRename onClick={handleUpdateTodo} todo={todo} />
      <TodoDelete id={todo.id} />
    </List.Item>
  );
};

export { TodoItem };
