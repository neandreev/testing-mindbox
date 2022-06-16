import { FC } from "react";

import { DeleteOutlined } from "@ant-design/icons";

import { useAppDispatch } from "../../store/hooks";
import { removeTodo } from "../../store/slices/todos";

interface TodoDeletePropsI {
  id: string;
}

const TodoDelete: FC<TodoDeletePropsI> = ({ id }) => {
  const dispatch = useAppDispatch();

  const handleRemoveTodo = () => {
    dispatch(removeTodo(id));
  };

  return (
    <DeleteOutlined data-testid='remove-todo' onClick={handleRemoveTodo} />
  );
};

export { TodoDelete };
