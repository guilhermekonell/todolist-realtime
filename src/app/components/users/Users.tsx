import { UserModel } from "@/app/models/UserModel";
import { database, db } from "@/firebase/config";
import { FirestoreService } from "@/firebase/firestore/FirestoreService";
import { onChildChanged, onValue, ref } from "firebase/database";
import { collection } from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const firestoreServiceUsers = new FirestoreService<UserModel>(
  collection(db, "users")
);
const userStatusDatabaseRef = ref(database, "connectedUsers");

export default function Users() {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
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
    return onlineUsers.includes(email);
  }

  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        {users.map((user) => (
          <div key={user.email} className="flex flex-col items-center">
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
    </div>
  );
}
