import { Timestamp } from "firebase/firestore";

export interface TodoModel {
  id?: string;
  title: string;
  owner?: {
    email: string;
    name: string;
  };
  blocked: boolean;
  status: "backlog" | "inprogress" | "done";
  createAt: Timestamp;
  updateAt: Timestamp;
}
