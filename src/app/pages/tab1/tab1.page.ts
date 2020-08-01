import { Component } from '@angular/core';
import {ListTasks} from "../../models/listTasks";
import {AlertController} from "@ionic/angular";
import {TasksService} from "../../services/tasks.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  title = 'Pendientes';
  namePage = 'tab1';
  constructor(private service: TasksService,
              private router: Router,
              private alertController: AlertController) {

  }
  async addList(){
    const alert = await this.alertController.create({
      header: 'Nueva lista',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Crear',
          handler: (data) => {
            if (data.title.length > 0){
              const listTasks = new ListTasks(data.title)
              this.service.addListTasks(listTasks);
              this.router.navigate(['/tabs/tab1/add', listTasks.id]);
            }
          }
        }
      ]
    });

    await alert.present();
  }

}
