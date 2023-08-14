import React from "react";

import { TodoModel } from "@/app/schemas/TodoSchema";

type TodoActions = {
  item: TodoModel;
};

export default function TodoActions({ item }: TodoActions) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex gap-2">
        <button className="text-white font-medium rounded text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700">
          Assumir
        </button>
        <button className="text-white font-medium rounded text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700">
          Bloquear
        </button>
      </div>
      <select className="w-full p-2.5 border text-sm rounded-lg block bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-300">
        <option value="Backlog">Backlog</option>
        <option value="InProgress">In Progress</option>
        <option value="Done">Done</option>
      </select>
    </div>
  );
}
