import { TodoModel, TodoSchema } from "@/app/schemas/TodoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

type FormProps = {
  handleSubmitForm: (data: TodoModel) => void;
};

export default function TodoForm({ handleSubmitForm }: FormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoModel>({
    resolver: zodResolver(TodoSchema),
  });

  function submitForm(data: TodoModel) {
    handleSubmitForm(data);
    reset();
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(submitForm)}>
      <div className="relative">
        <input
          type="text"
          placeholder="Título"
          {...register("title")}
          className="outline-none w-full p-4 text-sm border rounded bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-300"
        />
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 font-medium rounded  text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700"
        >
          Adicionar
        </button>
      </div>
      {errors.title && (
        <span className="text-red-600 text-xs px-2">
          {errors.title.message}
        </span>
      )}
    </form>
  );
}
