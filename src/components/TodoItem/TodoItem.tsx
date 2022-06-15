import cn from "classnames";
import _find from "lodash/find";
import { FC, useEffect, useState } from "react";

import { Input, List, Tooltip } from "antd";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { removeTodo, toggleTodo, updateTodo } from "../../store/slices/todos";
import { TodoI } from "../../types";

import TodoDelete from "../TodoDelete";
import TodoRename from "../TodoRename";
import TodoToggle from "../TodoToggle";

import styles from "./TodoItem.module.css";

interface TodoItemPropsI {
  item: TodoI;
}

const TodoItem: FC<TodoItemPropsI> = ({ item }) => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((store) => store.todos.todos);

  const [errorText, setErrorText] = useState("");
  const [showError, setShowError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [todo, setTodo] = useState(item.text);
  const [prevTodo, setPrevTodo] = useState(item.text);

  const listClassName = cn(styles.todo, {
    [styles["todo-completed"]]: item.isCompleted,
  });

  const handleToggleTodo = (id: string) => {
    dispatch(toggleTodo(id));
  };

  const handleRemoveTodo = (id: string) => {
    dispatch(removeTodo(id));
  };

  const handleUpdateTodo = () => {
    if (!isEditing) return setIsEditing(true);
    setIsEditing(!isEditing);

    const todosErrors = [
      {
        condition: !!_find(
          todos,
          ({ text, id }) => text === todo && id !== item.id
        ),
        text: "Todo with this name is already exists",
      },
      {
        condition: todo === "",
        text: "Todo can't be empty",
      },
    ];

    const applicableError = _find(todosErrors, ["condition", true]);

    if (applicableError) {
      setTodo(prevTodo);
      setShowError(true);
      setErrorText(applicableError.text);

      setTimeout(() => {
        setShowError(false);
      }, 2000);
      return;
    }

    setTodo(todo.trim());
    setPrevTodo(todo.trim());
    dispatch(updateTodo({ id: item.id, text: todo.trim() }));
  };

  useEffect(() => {
    setTodo(item.text);
  }, [item]);

  return (
    <List.Item className={listClassName} data-testid={`todo-${item.id}`}>
      <TodoToggle
        id={item.id}
        isCompleted={item.isCompleted}
        onClick={() => handleToggleTodo(item.id)}
      />
      <Tooltip
        placement='bottom'
        color='#ed1a12ee'
        visible={showError}
        title={errorText}
      >
        {isEditing ? (
          <Input
            autoFocus
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            onPressEnter={() => handleUpdateTodo()}
            data-testid={`input-todo-${item.id}`}
            className={cn(styles["todo-input"], styles["todo-text"])}
            onBlur={() => handleUpdateTodo()}
          />
        ) : (
          <span
            className={styles["todo-text"]}
            data-testid={`text-todo-${item.id}`}
          >
            {todo}
          </span>
        )}
      </Tooltip>
      <TodoRename
        onClick={() => handleUpdateTodo()}
        id={item.id}
        isCompleted={item.isCompleted}
      />
      <TodoDelete onClick={() => handleRemoveTodo(item.id)} />
    </List.Item>
  );
};

export { TodoItem };
