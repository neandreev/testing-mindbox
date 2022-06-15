import { BorderOutlined, CheckSquareOutlined } from "@ant-design/icons";
import { FC } from "react";

interface ToogleTaskPropsI {
  id: string;
  isCompleted: boolean;
  onClick: () => void;
}

const TodoToggle: FC<ToogleTaskPropsI> = (props) =>
  !props.isCompleted ? (
    <BorderOutlined
      data-testid={`toggle-todo-${props.id}`}
      onClick={props.onClick}
    />
  ) : (
    <CheckSquareOutlined
      data-testid={`toggle-todo-${props.id}`}
      onClick={props.onClick}
    />
  );

export { TodoToggle };
