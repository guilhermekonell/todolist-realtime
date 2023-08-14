"use client";

import { useState } from "react";
import AuthenticatedPage from "./components/auth/AuthenticatedPage";
import Header from "./components/header/Header";
import { Todo } from "./components/todo";
import { TodoModel } from "./schemas/TodoSchema";

export default function Home() {
  const [todos, setTodos] = useState<TodoModel[]>([]);

  function createTodo(data: TodoModel) {
    setTodos([...todos, data]);
  }

  return (
    <AuthenticatedPage>
      <div className="min-h-screen flex flex-col bg-zinc-700">
        <Header />
        <main className="flex justify-center p-5">
          <div className="w-full max-w-5xl flex flex-col items-center gap-4">
            <h1 className="font-semibold text-lg text-gray-300">To-Do List</h1>
            <Todo.Form handleSubmitForm={createTodo} />

            <ul className="w-full flex flex-col gap-2">
              {todos.map((item, index) => (
                <li key={index}>
                  <div className="w-full flex justify-between p-6 bg-gray-50 border border-gray-300 rounded-lg shadow dark:bg-gray-700 dark:border-gray-600">
                    <Todo.Item item={item} />
                    <Todo.Actions item={item} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </AuthenticatedPage>
  );
}
