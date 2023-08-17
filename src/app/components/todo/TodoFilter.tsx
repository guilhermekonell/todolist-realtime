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
        <div className="flex min-w-[140px]">
          <Controller
            name="status"
            control={control}
            defaultValue={[]}
            render={({ field: { onChange, value } }) => (
              <Select
                isMulti
                value={value}
                onChange={onChange}
                unstyled
                placeholder="Status"
                classNames={{
                  control: () =>
                    "min-w-[140px] px-1 h-full border text-sm rounded block bg-gray-700 border-gray-600 text-gray-300",
                  menu: () =>
                    "border border-gray-600 bg-gray-700 text-gray-300 rounded-lg",
                  option: ({ isFocused }) =>
                    `${isFocused ? "bg-blue-600" : ""}`,
                  valueContainer: () => "flex gap-1",
                  multiValue: () =>
                    "flex gap-2 border border-gray-700 bg-gray-800 rounded p-1.5 hover:bg-gray-900",
                  input: () => "text-gray-300",
                  placeholder: () => "text-gray-400",
                }}
                options={[
                  { value: "backlog", label: "Backlog" },
                  { value: "inprogress", label: "In Progress" },
                  { value: "done", label: "Done" },
                ]}
              />
            )}
          />
        </div>
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
