import { useState, ChangeEvent, FC } from "react";
import _find from "lodash/find";

import { Button, Form, Input } from "antd";
import { RuleObject } from "antd/lib/form";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addTodo } from "../../store/slices/todos";

import styles from "./TodosInput.module.css";

const TodosInput: FC = () => {
  const [form] = Form.useForm();
  const [inputValue, setInputValue] = useState("");

  const dispatch = useAppDispatch();
  const todos = useAppSelector((store) => store.todos.todos);

  const handleAddTodo = () => {
    dispatch(addTodo(inputValue.trim()));
    form.resetFields();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  const duplicateTodosValidator = (_: RuleObject, value: string) => {
    if (_find(todos, { text: value })) return Promise.reject(new Error());
    return Promise.resolve();
  };

  const validationRules = [
    {
      required: true,
      message: "Todo can't be empty",
      validateTrigger: "onSubmit",
    },
    {
      validator: duplicateTodosValidator,
      message: "Todo with this name is already exists",
      validateTrigger: "onSubmit",
    },
  ];

  return (
    <Form
      className={styles.form}
      form={form}
      onFinish={handleAddTodo}
      autoComplete='off'
    >
      <Form.Item name='Todo' rules={validationRules}>
        <Input
          size='large'
          value={inputValue}
          onChange={handleInputChange}
          onSubmit={handleAddTodo}
          data-testid='todo-input'
          placeholder='Buy a milk...'
        />
      </Form.Item>

      <Button
        size='large'
        data-testid='add-todo-button'
        type='primary'
        htmlType='submit'
      >
        Add todo
      </Button>
    </Form>
  );
};

export { TodosInput };
