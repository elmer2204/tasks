import { Injectable } from '@angular/core';
import { ListTasks } from "../models/listTasks";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  listTasks: ListTasks[] = [];
  constructor() {
    this.loadStorage();
  }
  getListTasks(){
    return this.listTasks;
  }
  addListTasks(list: ListTasks){
    this.listTasks.push(list);
    this.saveStorage();
  }
  saveStorage(){
    localStorage.setItem('data', JSON.stringify(this.listTasks));
  }
  loadStorage(){
    if (localStorage.getItem('data')){
      this.listTasks = JSON.parse(localStorage.getItem('data'));
    }
  }
  findListTask(id: string | number){
    id = Number(id);
    return this.listTasks.find( listTask => listTask.id === id);
  }

  deleteListTask(list: ListTasks){
    this.listTasks = this.listTasks.filter(listData => listData.id !== list.id);
    this.saveStorage();
  }
}
