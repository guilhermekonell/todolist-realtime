import React from "react";

import { db } from "@/firebase/config";
import { zodResolver } from "@hookform/resolvers/zod";
import { Timestamp, collection } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { TodoModel } from "@/app/models/TodoModel";
import { TodoSchema, TodoSchemaType } from "@/app/schemas/TodoSchema";
import { FirestoreService } from "@/firebase/firestore/FirestoreService";

const firestoreService = new FirestoreService<TodoModel>(
  collection(db, "todos")
);

export default function TodoForm() {
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoSchemaType>({
    resolver: zodResolver(TodoSchema),
  });

  function createTodo(data: TodoSchemaType) {
    const newTodo = {
      title: data.title,
      blocked: false,
      owner: {
        email: session?.user?.email,
        name: session?.user?.name,
      },
      status: "backlog",
      createAt: Timestamp.now(),
      updateAt: Timestamp.now(),
    } as TodoModel;
    firestoreService.create(newTodo);
    reset();
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(createTodo)}>
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
