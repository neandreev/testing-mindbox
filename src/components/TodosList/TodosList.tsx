import { FC } from "react";
import { List } from "antd";
import _sortBy from "lodash/sortBy";

import TodoItem from "../TodoItem";

import { useAppSelector } from "../../store/hooks";

import styles from "./TodosList.module.css";

const TodosList: FC = () => {
  const todos = useAppSelector((store) => store.todos.todos);
  const sortedTodos = _sortBy(todos, ["isCompleted", "id"]);

  return (
    <List
      bordered
      locale={{ emptyText: "No todos..." }}
      data-testid='todo-list'
      dataSource={sortedTodos}
      className={styles["todo-list"]}
      renderItem={(todo) => <TodoItem todo={todo} />}
    />
  );
};

export { TodosList };
