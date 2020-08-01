import { Component, OnInit } from '@angular/core';
import {TasksService} from "../../services/tasks.service";
import {ActivatedRoute} from "@angular/router";
import {ListTasks} from "../../models/listTasks";
import {Task} from "../../models/task";

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  listTask: ListTasks;
  nameTask: string;
  constructor(private service: TasksService,
              private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id');
    this.listTask = this.service.findListTask(id);
  }

  ngOnInit() {
  }

  addTask(){
    if (this.nameTask.length > 0){
      const task = new Task(this.nameTask);
      this.listTask.tasks.push(task);
      this.service.saveStorage();
      this.nameTask = '';
    }
  }
  changeTask(task: Task){
    const slopes = this.listTask.tasks.filter(task => !task.complete).length;
    if (slopes === 0){
      this.listTask.completeD = new Date();
      this.listTask.complete = true;
    }else {
      this.listTask.completeD = null;
      this.listTask.complete = false;
    }
    this.service.saveStorage();
  }
  delete(i: number){
    this.listTask.tasks.splice(i, 1)
    this.service.saveStorage();
  }

}
