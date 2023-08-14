"use client";

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div className="min-h-screen bg-zinc-700 flex items-center justify-center">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center gap-1">
          <span className="text-lg text-gray-300">Seja bem vindo ao</span>
          <span className="text-xl font-semibold text-gray-300">
            To-Do List Realtime!
          </span>
        </div>
        <div className="flex flex-col items-center text-gray-300 text-sm">
          <p>Para iniciar, faça login:</p>
        </div>
        <button
          onClick={() => signIn("google")}
          className="bg-emerald-700 rounded text-white h-10"
        >
          Login
        </button>
      </div>
    </div>
  );
}
