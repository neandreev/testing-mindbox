import React, { FC } from "react";
import { Button, Form, Input } from "antd";
import _find from "lodash/find";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addTodo } from "../../store/slices/todo";
import { RuleObject } from "antd/lib/form";

const TodoInput: FC = () => {
  const [form] = Form.useForm();
  const [inputValue, setInputValue] = useState("");

  const dispatch = useAppDispatch();
  const todos = useAppSelector((store) => store.todo.todos);

  const handleAddTodo = () => {
    dispatch(addTodo(inputValue));
    form.resetFields();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  const duplicateTodosValidator = (_: RuleObject, value: string) => {
    if (_find(todos, { text: value })) return Promise.reject(new Error());
    return Promise.resolve();
  };

  const validationRules = [
    {
      required: true,
      message: "Задача не может быть пустой!!",
      validateTrigger: "onSubmit",
    },
    {
      validator: duplicateTodosValidator,
      message: "Такая задача уже существует",
      validateTrigger: "onSubmit",
    },
  ];

  return (
    <Form form={form} onFinish={handleAddTodo} autoComplete='off'>
      <Form.Item name='Todo' rules={validationRules}>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onSubmit={handleAddTodo}
          data-testid='todo-input'
          placeholder='Buy a hammer...'
        />
      </Form.Item>

      <Button type='primary' htmlType='submit'>
        Add todo
      </Button>
    </Form>
  );
};

export { TodoInput };
