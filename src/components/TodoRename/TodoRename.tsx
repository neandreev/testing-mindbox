import { FC } from "react";
import { EditOutlined } from "@ant-design/icons";

interface TodoRenamePropsI {
  isCompleted: boolean;
  id: string;
  onClick: () => void;
}

const TodoRename: FC<TodoRenamePropsI> = ({ isCompleted, id, onClick }) =>
  !isCompleted ? (
    <EditOutlined data-testid={`rename-todo-${id}`} onClick={onClick} />
  ) : null;

export { TodoRename };
