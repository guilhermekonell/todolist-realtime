import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="flex items-center justify-end h-12 p-2 bg-zinc-800 gap-4">
      <span className="text-gray-300">{session?.user?.name}</span>
      <Image
        src={session?.user?.image as string}
        alt={session?.user?.name as string}
        width={40}
        height={40}
        className="rounded-full"
      />

      <button
        onClick={() => signOut()}
        className="bg-blue-600 hover:bg-blue-700 rounded text-white px-8 py-1.5"
      >
        Sair
      </button>
    </header>
  );
}
