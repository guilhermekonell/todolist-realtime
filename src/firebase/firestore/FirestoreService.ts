import {
  CollectionReference,
  DocumentData,
  QueryFieldFilterConstraint,
  QueryOrderByConstraint,
  WithFieldValue,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { IFirestoreService } from "./IFirestoreService";

export class FirestoreService<T> implements IFirestoreService<T> {
  private collectionRef: CollectionReference;

  constructor(collectionRef: CollectionReference) {
    this.collectionRef = collectionRef;
  }

  create(data: T): void {
    addDoc(this.collectionRef, data as WithFieldValue<DocumentData>);
  }

  listAll(
    whereOptions?: QueryFieldFilterConstraint,
    orderOptions?: QueryOrderByConstraint
  ): Promise<T[]> {
    let q = null;
    whereOptions && orderOptions
      ? (q = query(this.collectionRef, whereOptions, orderOptions))
      : whereOptions
      ? (q = query(this.collectionRef, whereOptions))
      : orderOptions
      ? (q = query(this.collectionRef, orderOptions))
      : (q = query(this.collectionRef));

    return getDocs(q).then((response) => {
      return response.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as T)
      );
    });
  }

  update(id: string, data: T): void {
    const docRef = doc(this.collectionRef, id);
    updateDoc(docRef, data as WithFieldValue<DocumentData>);
  }

  delete(id: string): void {
    const docRef = doc(this.collectionRef, id);
    deleteDoc(docRef);
  }

  onChange(
    handleChange: (values: T[]) => void,
    options: {
      whereOptions?: QueryFieldFilterConstraint;
      orderOptions?: QueryOrderByConstraint;
    }
  ): void {
    const { whereOptions, orderOptions } = options;
    let q = null;
    whereOptions && orderOptions
      ? (q = query(this.collectionRef, whereOptions, orderOptions))
      : whereOptions
      ? (q = query(this.collectionRef, whereOptions))
      : orderOptions
      ? (q = query(this.collectionRef, orderOptions))
      : (q = query(this.collectionRef));

    onSnapshot(q, (response) => {
      const values = response.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      handleChange(values as T[]);
    });
  }
}
