import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddNewItemPage } from '../add-new-item/add-new-item.page';
import { UpdateItemPage } from '../update-item/update-item.page';

import { DataService } from '../service/data.service';
import { Subscription } from 'rxjs';

// type Task = {
//   name?: string,
//   date?: Date,
//   category?: string
//   // ? oznacava da je opciono
// }

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy{

  today: number = Date.now(); // // definisemo kog je tipa podatka, u number pisemo trenutni datum
  // on ce u number sacuvati neki ruzan broj koji predstavlja brojanje od nekog ihahaj datuma

  tasks: any;
  sub: Subscription = new Subscription;

  constructor(public modalCtrl: ModalController, private dataService:DataService) {} // koriscenje ModalController za otvaranje modala na ovoj stranici

  // izvrsava se pri inicijalizaciji komponente; postavlja se vrednost za "tasks" niz, dodavajuci jedan objekat  u niz
  ngOnInit(): void { 
    this.getData();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  async getData(){
    this.sub = await this.dataService.getTasks().subscribe((res)=>{
      this.tasks = res;
      console.log();
    });
    // subscribe funkcija se pretplacuje na Observable (to je ovo this.dataService.getTasks()) koji ce sadrzati dokumenta na bazi
  }

  async deleteTask(task:any){
    await this.dataService.deleteTask(task);
  }

  async goToAddPage(){ // poziva se onda kada korisnik klikne na dugme za dodavanje novog task-a
    const modal = await this.modalCtrl.create({
      component: AddNewItemPage, // otvara se modal za AddNewItemPage komponentuu
    });
    return await modal.present();
  }

  async goToUpdatePage(task:Task){ // poziva se onda kada korisnik klikne na dugme za dodavanje novog task-a
    const modal = await this.modalCtrl.create({
      component: UpdateItemPage, // otvara se modal za AddNewItemPage komponentu
      componentProps: {task},
    });
    return await modal.present();
  }
}
