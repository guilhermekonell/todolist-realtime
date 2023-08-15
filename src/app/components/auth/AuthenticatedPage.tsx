import { useSession } from "next-auth/react";
import React, { ReactNode } from "react";
import Login from "../login/Login";
import Loading from "../loading/Loading";
import { FirestoreService } from "@/firebase/firestore/FirestoreService";
import { database, db } from "@/firebase/config";
import { collection } from "firebase/firestore";
import { UserModel } from "@/app/models/UserModel";
import { onDisconnect, onValue, ref, set } from "firebase/database";

const firestoreService = new FirestoreService<UserModel>(
  collection(db, "users")
);

export default function AuthenticatedPage({
  children,
}: {
  children: ReactNode;
}) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  if (session) {
    const user: UserModel = { ...session.user } as UserModel;
    firestoreService.createWithCustomId(user.email, user);

    const userStatusDatabaseRef = ref(
      database,
      `connectedUsers/${user.email}`.replace(/[.@]/g, "")
    );

    onValue(ref(database), (snapshot) => {
      if (snapshot.val() == false) {
        return;
      }

      onDisconnect(userStatusDatabaseRef)
        .set({ email: user.email, online: false })
        .then(() => {
          set(userStatusDatabaseRef, { email: user.email, online: true });
        });
    });

    return <>{children}</>;
  }

  return <Login />;
}
