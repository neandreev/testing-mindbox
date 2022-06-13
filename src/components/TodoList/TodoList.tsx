import { FC } from "react";
import { List } from "antd";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { removeTodo, toggleTodoCompletion } from "../../store/slices/todo";

import styles from "./TodoList.module.css";
import { CloseOutlined } from "@ant-design/icons";

const TodoList: FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((store) => store.todo.todos);

  const handleTodoCompletionToggle = (id: string) => {
    dispatch(toggleTodoCompletion(id));
  };

  const handleRemoveTodo = (id: string) => {
    dispatch(removeTodo(id));
  };

  return (
    <List
      data-testid='todo-list'
      dataSource={todos}
      renderItem={(item) => {
        const className = item.isCompleted ? styles["todo-item"] : "";

        return (
          <List.Item
            data-testid='todo'
            className={className}
            onClick={() => handleTodoCompletionToggle(item.id)}
          >
            <span>{item.text}</span>
            <CloseOutlined
              data-testid='remove-todo'
              onClick={() => handleRemoveTodo(item.id)}
            />
          </List.Item>
        );
      }}
    />
  );
};

export { TodoList };
