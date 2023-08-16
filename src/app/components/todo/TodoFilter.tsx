import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  TodoFilterSchema,
  TodoFilterSchemaType,
} from "@/app/schemas/TodoFilterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import {
  QueryFieldFilterConstraint,
  QueryOrderByConstraint,
  where,
} from "firebase/firestore";
import { MdClose } from "react-icons/md";

export default function TodoFilter({
  onChangeFilter,
}: {
  onChangeFilter: (
    where?: QueryFieldFilterConstraint[],
    order?: QueryOrderByConstraint[]
  ) => void;
}) {
  const { register, handleSubmit, control, reset } =
    useForm<TodoFilterSchemaType>({
      resolver: zodResolver(TodoFilterSchema),
    });

  function handleSubmitFilterTodos(data: TodoFilterSchemaType) {
    let whereConditions = [];
    if (data.status.length > 0) {
      whereConditions.push(
        where(
          "status",
          "in",
          data.status.map((status) => status.value)
        )
      );
    }
    if (data.title) {
      whereConditions.push(where("title", "==", data.title));
    }
    onChangeFilter(whereConditions);
  }

  return (
    <div className="w-full flex px-2">
      <form
        className="w-full flex gap-2 h-10 justify-end"
        onSubmit={handleSubmit(handleSubmitFilterTodos)}
      >
        <Controller
          name="status"
          control={control}
          defaultValue={[]}
          render={({ field: { onChange, value } }) => (
            <Select
              isMulti
              value={value}
              onChange={onChange}
              options={[
                { value: "backlog", label: "Backlog" },
                { value: "inprogress", label: "In Progress" },
                { value: "done", label: "Done" },
              ]}
            />
          )}
        />
        <input
          type="text"
          placeholder="Pesquisar"
          {...register("title")}
          className="outline-none p-4 text-sm border rounded bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-300"
        />
        <button
          onClick={() => reset()}
          className="text-white right-2.5 bottom-2.5 font-medium rounded text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700"
        >
          <MdClose />
        </button>
        <button
          type="submit"
          className="text-white right-2.5 bottom-2.5 font-medium rounded  text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700"
        >
          Pesquisar
        </button>
      </form>
    </div>
  );
}
