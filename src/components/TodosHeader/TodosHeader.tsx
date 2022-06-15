import { FC } from "react";

import styles from "./TodosHeader.module.css";

const TodosHeader: FC = () => {
  return <h1 className={styles["todo-header"]}>Todos</h1>;
};

export { TodosHeader };
