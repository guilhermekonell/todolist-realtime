import { useSession } from "next-auth/react";
import React, { ReactNode } from "react";
import Login from "../login/Login";
import Loading from "../loading/Loading";

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
    return <>{children}</>;
  }

  return <Login />;
}
