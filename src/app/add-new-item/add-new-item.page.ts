import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-add-new-item',
  templateUrl: './add-new-item.page.html',
  styleUrls: ['./add-new-item.page.scss'],
})
export class AddNewItemPage implements OnInit {


  taskName!:string;
  taskCategory!:string;
  taskDate!:string;

  constructor(public modalCtrl: ModalController, private dataService:DataService) { }

  ngOnInit() {
  }
  async dismiss(){
    await this.modalCtrl.dismiss();
  }
  
  async addTask(){
    await this.dataService.addTask({
      name: this.taskName,
      category: this.taskCategory,
      date: this.taskDate,
      done: false
    });
    this.dismiss();
  }

}
