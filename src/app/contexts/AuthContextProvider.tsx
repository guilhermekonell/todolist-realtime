"use client";

import React from "react";

import { Session } from "next-auth";
import { SessionProvider as Provider } from "next-auth/react";

type AuthContextProviderProps = {
  children: React.ReactNode;
  session: Session | null;
};

export default function AuthContextProvider({
  children,
  session,
}: AuthContextProviderProps) {
  return <Provider session={session}>{children}</Provider>;
}
