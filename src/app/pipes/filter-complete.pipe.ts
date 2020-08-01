import { Pipe, PipeTransform } from '@angular/core';
import {ListTasks} from "../models/listTasks";

@Pipe({
  name: 'filterComplete',
  pure: false
})
export class FilterCompletePipe implements PipeTransform {

  transform(list: ListTasks[], complete: boolean = true): ListTasks[] {
    return list.filter(list => list.complete === complete);
  }

}
