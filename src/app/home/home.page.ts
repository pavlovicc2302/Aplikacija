import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddNewItemPage } from '../add-new-item/add-new-item.page';
import { UpdateItemPage } from '../update-item/update-item.page';

type Task = {
  name?: string,
  date?: Date,
  category?: string
  // ? oznacava da je opciono
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  today: number = Date.now(); // deklaracija promenljive kojoj se dodeljuje trenutni Datum i vreme
  tasks: Array<Task> = []; //deklaracije promenljive kao tip niz objekata

  constructor(public modalCtrl: ModalController) {} // koriscenje ModalController za otvaranje modala na ovoj stranici

  // izvrsava se pri inicijalizaciji komponente; postavlja se vrednost za "tasks" niz, dodavajuci jedan objekat  u niz
  ngOnInit(): void { 
    this.tasks=[
      {
        name:'Ime zadatka',
        date: new Date(),
        category: 'Low'
      }
    ];
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
