import { FC } from "react";

import { DeleteOutlined } from "@ant-design/icons";

interface TodoDeletePropsI {
  onClick: () => void;
}

const TodoDelete: FC<TodoDeletePropsI> = ({ onClick }) => (
  <DeleteOutlined data-testid='remove-todo' onClick={onClick} />
);

export { TodoDelete };
