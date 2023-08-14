import React from "react";

import { TodoModel } from "@/app/schemas/TodoSchema";

type TodoItemProps = {
  item: TodoModel;
};

export default function TodoItem({ item: { title } }: TodoItemProps) {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <strong className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-300">
        {title}
      </strong>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Responsável: Guilherme Konell
      </p>
    </div>
  );
}
