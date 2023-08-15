"use client";

import { useEffect, useState } from "react";
import AuthenticatedPage from "./components/auth/AuthenticatedPage";
import Header from "./components/header/Header";
import { Todo } from "./components/todo";
import { collection, orderBy } from "firebase/firestore";
import { database, db } from "@/firebase/config";
import { TodoModel } from "./models/TodoModel";
import { FirestoreService } from "@/firebase/firestore/FirestoreService";
import { UserModel } from "./models/UserModel";
import Image from "next/image";
import { onChildChanged, onValue, ref } from "firebase/database";
import { OnlineUserModel } from "./models/OnlineUserModel";

const firestoreServiceTodos = new FirestoreService<TodoModel>(
  collection(db, "todos")
);

const firestoreServiceUsers = new FirestoreService<UserModel>(
  collection(db, "users")
);

const userStatusDatabaseRef = ref(database, "connectedUsers");

export default function Home() {
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [users, setUsers] = useState<UserModel[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    const orderOptions = orderBy("updateAt", "desc");

    firestoreServiceTodos.onChange(setTodos, { orderOptions });
    firestoreServiceUsers.onChange(setUsers);

    onValue(userStatusDatabaseRef, (snapshot) => {
      if (!snapshot.val()) return;

      const usersOnline = Object.keys(snapshot.val()).map((v) => {
        if (snapshot.val()[v].online) {
          return snapshot.val()[v].email;
        }
      });
      setOnlineUsers(usersOnline);
    });

    onChildChanged(userStatusDatabaseRef, (snapshot) => {
      if (snapshot.val().online) {
        setOnlineUsers((users) => [...users, snapshot.val().email]);
      }

      if (!snapshot.val().online) {
        setOnlineUsers((users) =>
          users.filter((user) => user !== snapshot.val().email)
        );
      }
    });
  }, []);

  function userIsOnline(email: string): boolean {
    const index = onlineUsers.findIndex((user) => user === email);
    return index > -1;
  }

  return (
    <AuthenticatedPage>
      <div className="min-h-screen flex flex-col bg-zinc-700">
        <Header />
        <main className="flex justify-center p-5">
          <div className="w-full max-w-5xl flex flex-col items-center gap-4">
            <h1 className="font-semibold text-lg text-gray-300">To-Do List</h1>
            <Todo.Form />

            <div className="w-full flex justify-end gap-2">
              {users.map((user) => (
                <div
                  key={user.email}
                  className="flex flex-col items-center gap-1"
                >
                  <Image
                    src={user?.image}
                    alt={user?.name}
                    width={25}
                    height={25}
                    className={`rounded-full ${
                      userIsOnline(user.email) ? "ring ring-emerald-500" : ""
                    }`}
                  />
                </div>
              ))}
            </div>

            <ul className="w-full flex flex-col gap-2">
              {todos.map((item) => (
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
