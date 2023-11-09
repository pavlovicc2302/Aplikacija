import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore, doc,deleteDoc } from '@angular/fire/firestore';

export interface Task{
  id?:number;
  name:string;
  date:string;
  category:string;
  done:boolean;
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private firestore:Firestore) { }
  getTasks(){
    const tasksRef = collection(this.firestore,'tasks');
    // smesta se referenca do odredjene kolekcije u firebase-u BP

    return collectionData(tasksRef,{idField:'id'});
    // referenca ka kolekciji, jedinstveno polje

  }

  deleteTask(task:Task){
    const taskRef = doc(this.firestore, `tasks/${task.id}`);
    return deleteDoc(taskRef);
  }
}
