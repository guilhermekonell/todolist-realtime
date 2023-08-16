import {
  CollectionReference,
  DocumentData,
  QueryFieldFilterConstraint,
  QueryOrderByConstraint,
  WithFieldValue,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
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

  createWithCustomId(id: string, data: T): void {
    const docRef = doc(this.collectionRef, id);
    setDoc(docRef, data as WithFieldValue<DocumentData>);
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
    options?: {
      whereOptions?: QueryFieldFilterConstraint[];
      orderOptions?: QueryOrderByConstraint[];
    }
  ): void {
    let q = null;
    options?.whereOptions && options?.orderOptions
      ? (q = query(
          this.collectionRef,
          ...options?.whereOptions,
          ...options?.orderOptions
        ))
      : options?.whereOptions
      ? (q = query(this.collectionRef, ...options?.whereOptions))
      : options?.orderOptions
      ? (q = query(this.collectionRef, ...options?.orderOptions))
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
