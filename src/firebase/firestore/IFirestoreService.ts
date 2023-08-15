import {
  QueryFieldFilterConstraint,
  QueryOrderByConstraint,
} from "firebase/firestore";

export interface IFirestoreService<T> {
  create(data: T): void;
  listAll(
    whereOptions?: QueryFieldFilterConstraint,
    orderOptions?: QueryOrderByConstraint
  ): Promise<T[]>;
  update(id: string, data: T): void;
  delete(id: string): void;
  onChange(
    handleChange: (values: T[]) => void,
    options: {
      whereOptions?: QueryFieldFilterConstraint;
      orderOptions?: QueryOrderByConstraint;
    }
  ): void;
}
