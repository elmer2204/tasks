import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ListTasks} from "../../models/listTasks";
import {TasksService} from "../../services/tasks.service";
import {Router} from "@angular/router";
import {AlertController, IonList} from "@ionic/angular";

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {
  @ViewChild(IonList) list: IonList;
  @Input() complete: boolean;
  listTasks: ListTasks[] = [];
  constructor(private service: TasksService,
              private router: Router,
              private alertController: AlertController) {
    this.listTasks = service.getListTasks();
  }

  ngOnInit() {}

  addTask(id: string | number){
    id = Number(id);
    if (this.complete === false){
      this.router.navigate(['/tabs/tab1/add', id]);
    }else {
      this.router.navigate(['/tabs/tab2/add', id]);
    }

  }
  delete(list){
    this.service.deleteListTask(list);
    this.listTasks = this.service.getListTasks();
  }
  async editTitle(list: ListTasks){
    const alert = await this.alertController.create({
      header: 'Editar',
      inputs: [
        {
          name: 'title',
          type: 'text',
          value: list.title
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.list.closeSlidingItems();
          }
        },
        {
          text: 'Guardar',
          handler: (data) => {
            if (data.title.length > 0){
              list.title = data.title;
              this.service.saveStorage();
              this.list.closeSlidingItems();
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
