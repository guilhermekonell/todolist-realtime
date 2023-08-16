"use client";

import { useEffect, useState } from "react";
import AuthenticatedPage from "./components/auth/AuthenticatedPage";
import Header from "./components/header/Header";
import { Todo } from "./components/todo";
import {
  QueryFieldFilterConstraint,
  QueryOrderByConstraint,
  collection,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { TodoModel } from "./models/TodoModel";
import { FirestoreService } from "@/firebase/firestore/FirestoreService";
import Users from "./components/users/Users";

const firestoreServiceTodos = new FirestoreService<TodoModel>(
  collection(db, "todos")
);

export default function Home() {
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<TodoModel[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData(
    where?: QueryFieldFilterConstraint[],
    order?: QueryOrderByConstraint[]
  ) {
    firestoreServiceTodos.onChange(setTodos, {
      whereOptions: where,
      orderOptions: order,
    });
  }

  function onChangeFilter(
    where?: QueryFieldFilterConstraint[],
    order?: QueryOrderByConstraint[]
  ) {
    firestoreServiceTodos.onChange(setFilteredTodos, {
      whereOptions: where,
      orderOptions: order,
    });
  }

  return (
    <AuthenticatedPage>
      <div className="min-h-screen flex flex-col bg-zinc-700">
        <Header />
        <main className="flex justify-center p-5">
          <div className="w-full max-w-5xl flex flex-col items-center gap-4">
            <h1 className="font-semibold text-lg text-gray-300">To-Do List</h1>
            <Users />
            <div className="border-b border-solid border-zinc-500" />
            <Todo.Form />

            <Todo.Filter onChangeFilter={onChangeFilter} />

            <ul className="w-full flex flex-col gap-2">
              {filteredTodos.length > 0
                ? filteredTodos.map((item) => (
                    <li key={item.id}>
                      <div className="w-full flex justify-between p-6 bg-gray-50 border border-gray-300 rounded-lg shadow dark:bg-gray-700 dark:border-gray-600">
                        <Todo.Item item={item} />
                        <Todo.Actions item={item} />
                      </div>
                    </li>
                  ))
                : todos.map((item) => (
                    <li key={item.id}>
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
