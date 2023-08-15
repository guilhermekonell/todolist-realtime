import React, { useEffect } from "react";

import { useSession } from "next-auth/react";
import { TodoModel } from "@/app/models/TodoModel";
import { FirestoreService } from "@/firebase/firestore/FirestoreService";
import { Timestamp, collection } from "firebase/firestore";
import { db } from "@/firebase/config";
import { BiSolidLock, BiSolidLockOpen, BiTrash } from "react-icons/bi";
import { toast } from "react-hot-toast";

type TodoActionsProps = {
  item: TodoModel;
};

const firestoreService = new FirestoreService<TodoModel>(
  collection(db, "todos")
);

export default function TodoActions({ item }: TodoActionsProps) {
  const { data: session } = useSession();

  function handleBlockItem() {
    item.blocked = !item.blocked;
    item.updateAt = Timestamp.now();
    firestoreService.update(item.id as string, item);
  }

  function handleChangeStatusItem(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value as "backlog" | "inprogress" | "done";
    item.status = newStatus;
    item.updateAt = Timestamp.now();
    firestoreService.update(item.id as string, item);
  }

  function handleChangeOwnerItem() {
    if (item.owner?.email !== session?.user?.email && item.blocked) {
      toast.error("Você não pode assumir esta atividade!");
      return;
    }

    if (item.owner?.email === session?.user?.email) {
      item.blocked = false;
      item.owner = { email: "", name: "" };
    } else {
      item.owner = {
        email: session?.user?.email as string,
        name: session?.user?.name as string,
      };
    }

    item.updateAt = Timestamp.now();
    firestoreService.update(item.id as string, item);
  }

  function handleDeleteItem() {
    firestoreService.delete(item.id as string);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {/* só pode alterar o status se a task for sua */}
      {item.owner?.email === session?.user?.email ? (
        <select
          onChange={handleChangeStatusItem}
          value={item.status}
          className="w-full p-2.5 border text-sm rounded-lg block bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-300"
        >
          <option value="backlog">Backlog</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>
      ) : (
        <></>
      )}
      <div className="flex gap-2">
        {/* só pode assumir a task se ela não for sua e se não estiver bloqueada
          ou só pode desbloquear se ela for sua
        */}
        {(item.owner?.email !== session?.user?.email && !item.blocked) ||
        item.owner?.email === session?.user?.email ? (
          <button
            onClick={handleChangeOwnerItem}
            className="text-white font-medium rounded text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700"
          >
            {item.owner?.email === session?.user?.email ? "Abdicar" : "Assumir"}
          </button>
        ) : (
          <></>
        )}

        {/* só pode bloquear e desbloquear a atividade se ela for sua */}
        {item.owner?.email === session?.user?.email ? (
          <button
            onClick={handleBlockItem}
            className="text-white font-medium rounded text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700"
          >
            {item.blocked ? <BiSolidLock /> : <BiSolidLockOpen />}
          </button>
        ) : (
          <></>
        )}

        {/* só pode excluir se a atividade for sua e não estiver bloqueada */}
        {item.owner?.email === session?.user?.email && !item.blocked ? (
          <button
            onClick={handleDeleteItem}
            className="text-white font-medium rounded text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700"
          >
            <BiTrash />
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
