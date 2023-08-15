import { TodoModel } from "@/app/models/TodoModel";
import React from "react";

import moment from "moment";

type TodoItemProps = {
  item: TodoModel;
};

export default function TodoItem({
  item: { title, owner, updateAt, status },
}: TodoItemProps) {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <strong className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-300">
        {title}
      </strong>
      <div className="font-normal text-gray-400">
        <p>Responsável: {owner?.name}</p>
        <p>
          Última atualização:{" "}
          {moment(updateAt.toDate()).format("DD/MM/YYYY HH:mm")}
        </p>
      </div>
    </div>
  );
}
