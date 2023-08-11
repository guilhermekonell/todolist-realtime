"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const createTodoSchema = z.object({
  title: z.string().min(6, "É necessário de no mínimo 6 caracteres"),
});

type CreateTodoType = z.infer<typeof createTodoSchema>;

export default function Home() {
  const [todos, setTodos] = useState<CreateTodoType[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTodoType>({
    resolver: zodResolver(createTodoSchema),
  });

  function createTodo(data: CreateTodoType) {
    setTodos([...todos, data]);
    reset();
  }

  return (
    <main className="w-full min-h-full flex justify-center bg-zinc-700 p-5">
      <div className="w-full flex flex-col items-center gap-4 max-w-5xl">
        <h1 className="font-semibold text-lg text-gray-300">Todo List</h1>
        <form className="w-full" onSubmit={handleSubmit(createTodo)}>
          <div className="relative">
            <input
              type="text"
              placeholder="Título"
              {...register("title")}
              className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Adicionar
            </button>
          </div>
          {errors.title && <span>{errors.title.message}</span>}
        </form>

        <ul className="w-full flex flex-col gap-2">
          {todos.map((item, index) => (
            <li key={index}>
              <div className="w-full flex justify-between p-6 bg-gray-50 border border-gray-300 rounded-lg shadow dark:bg-gray-700 dark:border-gray-600">
                <div className="flex flex-1 flex-col justify-center">
                  <strong className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                    {item.title}
                  </strong>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    Responsável: Guilherme Konell
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="flex gap-2">
                    <button className="text-white right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Assumir
                    </button>
                    <button className="text-white right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Bloquear
                    </button>
                  </div>
                  <select className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="Backlog">Backlog</option>
                    <option value="InProgress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
