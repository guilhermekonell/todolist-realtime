import { useSession } from "next-auth/react";
import React, { ReactNode } from "react";
import Login from "../login/Login";

export default function AuthenticatedPage({
  children,
}: {
  children: ReactNode;
}) {
  const { data: session } = useSession();

  if (session) {
    return <>{children}</>;
  }

  return <Login />;
}
