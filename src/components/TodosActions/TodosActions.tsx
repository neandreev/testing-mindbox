import { FC } from "react";
import _filter from "lodash/filter";

import { Button, Card } from "antd";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { removeCompletedTodos } from "../../store/slices/todos";

import styles from "./TodosActions.module.css";

const pluralTodos = (amount: number) =>
  amount === 1 ? `1 task` : `${amount} tasks`;

const TodosActions: FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((store) => store.todos.todos);

  const handleClearCompletedTodos = () => {
    dispatch(removeCompletedTodos());
  };

  const amountOfTodos = pluralTodos(todos.length);
  const amountOfCompletedTodos = pluralTodos(
    _filter(todos, "isCompleted").length
  );

  return (
    <Card className={styles["todo-actions"]}>
      <Button shape='round' type='text'>
        Total: {amountOfTodos}
      </Button>

      <Button shape='round' type='text'>
        Completed: {amountOfCompletedTodos}
      </Button>

      <Button onClick={handleClearCompletedTodos} shape='round' type='text'>
        Clear completed
      </Button>
    </Card>
  );
};

export { TodosActions };
